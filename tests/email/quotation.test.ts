import assert from "node:assert/strict";
import { test } from "node:test";
import { SESv2Client, SendEmailCommand, type SendEmailCommandInput } from "@aws-sdk/client-sesv2";
import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { createQuotationHandler } from "../../lib/email/quotation-handler";
import { createFeedbackEmail, createNotificationEmail } from "../../lib/email/quotation-templates";
import { handler as productionHandler } from "../../netlify/functions/send-email";

const quotation = {
  name: "Kovács Péter",
  email: "client@example.com",
  phoneNumber: "+36201234567",
  location: "Csákvár",
  message: "Új konnektor kellene.\nA konyhában & a nappaliban.",
};

function event(overrides: Partial<HandlerEvent> = {}): HandlerEvent {
  return {
    rawUrl: "https://example.com/.netlify/functions/send-email",
    rawQuery: "",
    path: "/.netlify/functions/send-email",
    httpMethod: "POST",
    headers: { "content-type": "application/json" },
    multiValueHeaders: {},
    queryStringParameters: null,
    multiValueQueryStringParameters: null,
    isBase64Encoded: false,
    body: JSON.stringify(quotation),
    ...overrides,
  };
}

async function invoke(handler: Handler, input = event()) {
  const result = await handler(input, {} as HandlerContext, () => undefined);
  assert.ok(result);
  return result;
}

test("both emails contain the supplied details, correct destinations and reply addresses", async () => {
  const sent: SendEmailCommandInput[] = [];
  const handler = createQuotationHandler(async (input) => { sent.push(input); });

  assert.equal((await invoke(handler)).statusCode, 200);
  assert.equal(sent.length, 2);
  const [notification, feedback] = sent;
  assert.deepEqual(notification.Destination?.ToAddresses, ["info@hollo-vill.hu"]);
  assert.deepEqual(notification.ReplyToAddresses, [quotation.email]);
  assert.deepEqual(feedback.Destination?.ToAddresses, [quotation.email]);
  assert.deepEqual(feedback.ReplyToAddresses, ["info@hollo-vill.hu"]);
  for (const mail of sent) {
    assert.equal(mail.FromEmailAddress, "info@hollo-vill.hu");
    const body = mail.Content?.Simple?.Body;
    assert.ok(body?.Html?.Data);
    assert.ok(body?.Text?.Data);
    assert.match(body.Text.Data, /Csákvár/);
    assert.match(body.Text.Data, /A konyhában & a nappaliban\./);
    assert.equal(body.Html.Charset, "UTF-8");
    assert.equal(body.Text.Charset, "UTF-8");
  }
  assert.match(feedback.Content!.Simple!.Body!.Text!.Data!, /^Kedves Kovács Péter!/);
});

test("HTML escapes user input and preserves message line breaks", () => {
  const unsafe = { ...quotation, name: '<img src=x onerror="alert(1)">', message: "<script>alert('x')</script>\r\nMásodik sor & vége" };
  for (const content of [createFeedbackEmail(unsafe), createNotificationEmail(unsafe)]) {
    assert.doesNotMatch(content.html, /<img|<script/);
    assert.match(content.html, /&lt;script&gt;alert\(&#39;x&#39;\)&lt;\/script&gt;<br \/>Második sor &amp; vége/);
    assert.match(content.text, /<script>alert\('x'\)<\/script>/);
  }
});

test("optional phone number is displayed as missing", async () => {
  const withoutPhone = { ...quotation, phoneNumber: "" };
  assert.match(createFeedbackEmail(withoutPhone).text, /Telefonszám:\nNincs megadva/);
  assert.match(createNotificationEmail(withoutPhone).html, /Nincs megadva/);
  const handler = createQuotationHandler(async () => undefined);
  assert.equal((await invoke(handler, event({ body: JSON.stringify(withoutPhone) }))).statusCode, 200);
});

test("notification date uses Budapest time in both winter and summer", () => {
  assert.match(createNotificationEmail(quotation, new Date("2025-11-06T16:03:37Z")).text, /2025\. 11\. 06\. 17:03:37/);
  assert.match(createNotificationEmail(quotation, new Date("2025-07-06T16:03:37Z")).text, /2025\. 07\. 06\. 18:03:37/);
});

test("invalid requests never reach the sender", async () => {
  let attempts = 0;
  const handler = createQuotationHandler(async () => { attempts++; });
  const invalid = [
    null, "{", "null", "[]", "{}",
    JSON.stringify({ ...quotation, name: "   " }),
    JSON.stringify({ ...quotation, name: "Name\r\nBcc: attacker@example.com" }),
    JSON.stringify({ ...quotation, email: "bad@example.com\r\nBcc: x@y.hu" }),
    JSON.stringify({ ...quotation, email: "a\" onclick=\"x@example.com" }),
    JSON.stringify({ ...quotation, email: "not-an-email" }),
    JSON.stringify({ ...quotation, phoneNumber: 123 }),
    JSON.stringify({ ...quotation, message: "x".repeat(1_001) }),
  ];
  for (const body of invalid) {
    assert.equal((await invoke(handler, event({ body }))).statusCode, 400);
  }
  const get = await invoke(handler, event({ httpMethod: "GET" }));
  assert.equal(get.statusCode, 405);
  assert.equal(get.headers?.Allow, "POST");
  assert.equal(attempts, 0);
});

test("base64 encoded Netlify payloads and whitespace are supported", async () => {
  const sent: SendEmailCommandInput[] = [];
  const handler = createQuotationHandler(async (input) => { sent.push(input); });
  const body = Buffer.from(JSON.stringify({ ...quotation, email: " client@example.com ", name: " Kovács Péter " })).toString("base64");
  assert.equal((await invoke(handler, event({ body, isBase64Encoded: true }))).statusCode, 200);
  assert.deepEqual(sent[0].ReplyToAddresses, [quotation.email]);
  assert.equal(sent[0].Content?.Simple?.Subject?.Data, "Árajánlatkérés - Kovács Péter");
});

test("business notification failure returns an error and sends no customer confirmation", async (t) => {
  t.mock.method(console, "error", () => undefined);
  let attempts = 0;
  const handler = createQuotationHandler(async () => {
    attempts++;
    throw new Error("Sensitive SDK error with client@example.com");
  });
  const result = await invoke(handler);
  assert.equal(result.statusCode, 500);
  assert.equal(attempts, 1);
  assert.doesNotMatch(result.body ?? "", /client@example|Sensitive/);
});

test("customer confirmation failure preserves success after the business notification is accepted", async (t) => {
  const logged = t.mock.method(console, "error", () => undefined);
  let attempts = 0;
  const handler = createQuotationHandler(async () => {
    if (++attempts === 2) throw new Error("Sensitive SDK error with client@example.com");
  });
  assert.equal((await invoke(handler)).statusCode, 200);
  assert.equal(attempts, 2);
  assert.equal(logged.mock.callCount(), 1);
  assert.doesNotMatch(JSON.stringify(logged.mock.calls[0].arguments), /client@example|Sensitive/);
});

test("production endpoint uses explicit SES credentials and SDK commands without network access", async (t) => {
  const keys = ["SES_REGION", "SES_ACCESS_KEY_ID", "SES_SECRET_ACCESS_KEY", "SES_SESSION_TOKEN"] as const;
  const previous = keys.map((key) => process.env[key]);
  const captured: SendEmailCommandInput[] = [];
  t.mock.method(console, "error", () => undefined);
  t.mock.method(SESv2Client.prototype, "send", async function (this: SESv2Client, command: SendEmailCommand) {
    assert.ok(command instanceof SendEmailCommand);
    assert.equal(await this.config.region(), "eu-central-1");
    const credentials = await this.config.credentials();
    assert.equal(credentials.accessKeyId, "test-ses-access-key");
    assert.equal(credentials.secretAccessKey, "test-ses-secret");
    assert.equal(credentials.sessionToken, "test-session-token");
    captured.push(command.input);
    return { MessageId: "test-message-id" };
  });
  try {
    for (const key of keys) delete process.env[key];
    assert.equal((await invoke(productionHandler)).statusCode, 500);
    assert.equal(captured.length, 0);

    process.env.SES_REGION = "eu-central-1";
    process.env.SES_ACCESS_KEY_ID = "test-ses-access-key";
    process.env.SES_SECRET_ACCESS_KEY = "test-ses-secret";
    process.env.SES_SESSION_TOKEN = "test-session-token";
    assert.equal((await invoke(productionHandler)).statusCode, 200);
    assert.equal(captured.length, 2);
  } finally {
    keys.forEach((key, index) => {
      if (previous[index] === undefined) delete process.env[key];
      else process.env[key] = previous[index];
    });
  }
});
