import type { Handler, HandlerEvent } from "@netlify/functions";
import { sendEmail } from "@netlify/emails";
import { Quotation } from "../../app/quotation";
import {
  companyName,
  email,
  facebook,
  facebookLink,
  phoneNumber,
  phoneNumberLink,
  siteLink,
} from "../../app/constants";
import { FeedbackEmailInput, NotificationEmailInput } from "@/app/email-input";

const handler: Handler = async function (event: HandlerEvent) {
  if (event.body === null) {
    return {
      statusCode: 400,
      body: JSON.stringify("Payload required"),
    };
  }

  const quotation: Quotation = JSON.parse(event.body) as Quotation;

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
  await sendEmail({
    from: email,
    to: quotation.email,
    subject: `Árajánlatkérés visszaigazolása - ${companyName}`,
    template: "quotation_feedback",
    parameters: feedbackEmailInput,
  });

  const dateNow: string = new Date().toLocaleString("hu", {
    timeZone: "Europe/Budapest",
  });
  const notificationEmailInput: NotificationEmailInput = {
    ...quotation,
    requestDate: dateNow,
  };
  await sendEmail({
    from: quotation.email,
    to: email,
    subject: `Árajánlatkérés - ${quotation.name}`,
    template: "quotation_notification",
    parameters: notificationEmailInput,
  });

  return {
    statusCode: 200,
    body: JSON.stringify("E-mail successfully sent!"),
  };
};

export { handler };
