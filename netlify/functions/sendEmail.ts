import type { Handler, HandlerEvent } from "@netlify/functions";
import { sendEmail } from "@netlify/emails";
import { Quotation } from "../../app/quotation";
import { email } from "../../app/constants";

const handler: Handler = async function (event: HandlerEvent) {
  if (event.body === null) {
    return {
      statusCode: 400,
      body: JSON.stringify("Payload required"),
    };
  }

  const quotation: Quotation = JSON.parse(event.body) as Quotation;

  await sendEmail({
    from: email,
    to: quotation.email,
    subject: "Árajánlat",
    template: "quotation_feedback",
    parameters: quotation,
  });

  return {
    statusCode: 200,
    body: JSON.stringify("Email successfully sent!"),
  };
};

export { handler };
