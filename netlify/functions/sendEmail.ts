import type { Handler } from "@netlify/functions";
import { sendEmail } from "@netlify/emails";

const handler: Handler = async function (event) {
  if (event.body === null) {
    return {
      statusCode: 400,
      body: JSON.stringify("Payload required"),
    };
  }

  const requestBody = JSON.parse(event.body) as {
    subscriberName: string;
    subscriberEmail: string;
    inviteeEmail: string;
  };

  console.log(`body: ${JSON.stringify(requestBody)}`);

  await sendEmail({
    from: "info@hollo-vill.hu",
    to: "doktor.balazs1@gmail.com",
    template: "quotation_feedback",
    subject: "New email",
    parameters: { name: "valami" },
  });

  return {
    statusCode: 200,
    body: JSON.stringify("Subscribe email sent!"),
  };
};

export { handler };
