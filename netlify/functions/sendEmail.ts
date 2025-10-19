import type { Handler, HandlerEvent } from "@netlify/functions";
import { sendEmail } from "@netlify/emails";
import { Quotation } from "../../app/quotation";
import {
  companyName,
  email,
  phoneNumber,
  phoneNumberLink,
  siteLink,
} from "../../app/constants";
import { FeedbackEmailInput, NotificationEmailInput } from "@/app/email-input";

const numTo2DigitString = (num: number): string => (num < 10 ? "0" : "" + num);

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
    companyName: "Holló Vill",
    ownerName: "Holló János",
    companyPhoneNumber: phoneNumber,
    companyPhoneNumberLink: phoneNumberLink,
  };
  await sendEmail({
    from: email,
    to: quotation.email,
    subject: `Árajánlatkérés visszaigazolása - ${companyName}`,
    template: "quotation_feedback",
    parameters: feedbackEmailInput,
  });

  const dateNow: Date = new Date();
  const notificationEmailInput: NotificationEmailInput = {
    ...quotation,
    requestDate: `${dateNow.getFullYear()}. ${
      dateNow.getMonth() + 1
    }. ${dateNow.getDate()}. ${numTo2DigitString(
      dateNow.getHours()
    )}:${numTo2DigitString(dateNow.getMinutes())}`,
  };
  await sendEmail({
    from: email,
    to: quotation.email,
    subject: "Új árajánlatkérés érkezett a weboldalról",
    template: "quotation_notification",
    parameters: notificationEmailInput,
  });

  return {
    statusCode: 200,
    body: JSON.stringify("Email successfully sent!"),
  };
};

export { handler };
