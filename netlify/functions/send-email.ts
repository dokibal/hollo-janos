import { FeedbackEmailInput, NotificationEmailInput } from "@/app/email-input";
import type { Handler, HandlerEvent } from "@netlify/functions";
import { default as formData } from "form-data";
import Mailgun from "mailgun.js";
import {
  companyName,
  email,
  facebook,
  facebookLink,
  phoneNumber,
  phoneNumberLink,
  siteLink,
} from "../../app/constants";
import { Quotation } from "../../app/quotation";

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY!,
});

const handler: Handler = async function (event: HandlerEvent) {
  if (event.body === null) {
    return {
      statusCode: 400,
      body: JSON.stringify("Payload required"),
    };
  }

  const quotation: Quotation = JSON.parse(event.body) as Quotation;

  try {
    const feedbackEmailInput: FeedbackEmailInput = {
      ...quotation,
      siteLink: siteLink,
      companyName: companyName,
      ownerName: "Holló János",
      companyPhoneNumber: phoneNumber,
      companyPhoneNumberLink: phoneNumberLink,
      facebook: facebook,
      facebookLink: facebookLink,
    };

    await mg.messages.create(process.env.MAILGUN_DOMAIN!, {
      from: email,
      to: quotation.email,
      subject: `Árajánlatkérés visszaigazolása - ${companyName}`,
      template: "quotation feedback",
      "h:X-Mailgun-Variables": JSON.stringify(feedbackEmailInput),
    });

    const dateNow: string = new Date().toLocaleString("hu", {
      timeZone: "Europe/Budapest",
    });
    const notificationEmailInput: NotificationEmailInput = {
      ...quotation,
      requestDate: dateNow,
    };
    await mg.messages.create(process.env.MAILGUN_DOMAIN!, {
      from: email,
      to: email,
      subject: `Árajánlatkérés - ${quotation.name}`,
      template: "quotation notification",
      "h:Reply-To": quotation.email,
      "h:X-Mailgun-Variables": JSON.stringify(notificationEmailInput),
    });
  } catch (error) {
    console.error("Mailgun error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify(`Mailgun error: ${JSON.stringify(error)}`),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify("E-mail successfully sent!"),
  };
};

export { handler };
