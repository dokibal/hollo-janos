import type { SendEmailCommandInput } from "@aws-sdk/client-sesv2";
import type { Handler, HandlerResponse } from "@netlify/functions";
import type { Quotation } from "../../app/quotation";
import {
  createFeedbackEmail,
  createNotificationEmail,
  quotationSender,
  type EmailContent,
} from "./quotation-templates";

type SendEmail = (input: SendEmailCommandInput) => Promise<unknown>;

function response(statusCode: number, message: string): HandlerResponse {
  return {
    statusCode,
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(message),
  };
}

function parseQuotation(value: unknown): Quotation | undefined {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return;
  const input = value as Record<string, unknown>;

  function field(key: string, maxLength: number): string | undefined {
    const candidate = input[key];
    if (typeof candidate !== "string") return;
    const trimmed = candidate.trim();
    if (!trimmed || trimmed.length > maxLength || trimmed.includes("\0")) return;
    return trimmed;
  }

  const name = field("name", 200);
  const address = field("email", 254);
  const location = field("location", 200);
  const message = field("message", 1_000);
  if (!name || !address || !location || !message) return;
  if (
    /[\r\n]/.test(name + location) ||
    !/^[^\s@<>"']+@[^\s@<>"']+\.[^\s@<>"']+$/.test(address)
  ) return;

  if (input.phoneNumber !== undefined && typeof input.phoneNumber !== "string") return;
  const phoneNumber = typeof input.phoneNumber === "string"
    ? input.phoneNumber.trim()
    : "";
  if (phoneNumber.length > 50 || /[\r\n\0]/.test(phoneNumber)) return;

  return {
    name,
    email: address,
    location,
    message,
    ...(phoneNumber ? { phoneNumber } : {}),
  };
}

function emailInput(
  content: EmailContent,
  to: string,
  replyTo: string,
): SendEmailCommandInput {
  return {
    FromEmailAddress: quotationSender,
    Destination: { ToAddresses: [to] },
    ReplyToAddresses: [replyTo],
    Content: {
      Simple: {
        Subject: { Data: content.subject, Charset: "UTF-8" },
        Body: {
          Html: { Data: content.html, Charset: "UTF-8" },
          Text: { Data: content.text, Charset: "UTF-8" },
        },
      },
    },
  };
}

function logFailure(stage: string, error: unknown): void {
  // SDK error messages can contain recipient addresses. Log only metadata.
  console.error(`SES ${stage} failed`, {
    code: error instanceof Error ? error.name : "UnknownError",
  });
}

export function createQuotationHandler(send: SendEmail): Handler {
  return async (event) => {
    if (event.httpMethod !== "POST") {
      return {
        ...response(405, "Method not allowed"),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Allow: "POST",
        },
      };
    }

    let quotation: Quotation | undefined;
    try {
      const body = event.isBase64Encoded
        ? Buffer.from(event.body ?? "", "base64").toString("utf8")
        : event.body;
      quotation = parseQuotation(JSON.parse(body ?? ""));
    } catch {
      return response(400, "Invalid quotation payload");
    }
    if (!quotation) return response(400, "Invalid quotation payload");

    // The request is accepted once SES accepts the business notification.
    // Do not confirm a request that has not reached the business send queue.
    try {
      await send(emailInput(
        createNotificationEmail(quotation),
        quotationSender,
        quotation.email,
      ));
    } catch (error) {
      logFailure("notification", error);
      return response(500, "Quotation request could not be sent");
    }

    try {
      await send(emailInput(
        createFeedbackEmail(quotation),
        quotation.email,
        quotationSender,
      ));
    } catch (error) {
      // Retrying the form would duplicate an already accepted business request.
      logFailure("feedback", error);
    }

    return response(200, "Quotation request accepted");
  };
}
