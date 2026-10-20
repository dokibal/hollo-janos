import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";
import { createQuotationHandler } from "../../lib/email/quotation-handler";

let client: SESv2Client | undefined;

function getClient(): SESv2Client {
  if (client) return client;

  // AWS_* variables belong to the Netlify Lambda runtime. Pass our own SES
  // credentials explicitly so the SDK never uses Netlify's execution role.
  const region = process.env.SES_REGION;
  const accessKeyId = process.env.SES_ACCESS_KEY_ID;
  const secretAccessKey = process.env.SES_SECRET_ACCESS_KEY;

  if (!region || !accessKeyId || !secretAccessKey) {
    const error = new Error(
      "SES_REGION, SES_ACCESS_KEY_ID and SES_SECRET_ACCESS_KEY are required",
    );
    error.name = "SESConfigurationError";
    throw error;
  }

  client = new SESv2Client({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
      ...(process.env.SES_SESSION_TOKEN
        ? { sessionToken: process.env.SES_SESSION_TOKEN }
        : {}),
    },
    maxAttempts: 2,
    requestHandler: {
      connectionTimeout: 2_000,
      requestTimeout: 4_000,
    },
  });

  return client;
}

export const handler = createQuotationHandler((input) =>
  getClient().send(new SendEmailCommand(input), {
    abortSignal: AbortSignal.timeout(7_000),
  }),
);
