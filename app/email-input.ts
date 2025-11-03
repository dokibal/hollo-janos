import { Quotation } from "./quotation";

export type NotificationEmailInput = { requestDate: string } | Quotation;

export type FeedbackEmailInput = {
  siteLink: string;
  companyName: string;
  ownerName: string;
  companyPhoneNumber: string;
  companyPhoneNumberLink: string;
  facebook: string;
  facebookLink: string;
};
