import { Quotation } from "./quotation";

export type NotificationEmailInput = { requestDate: Date } | Quotation;

export type FeedbackEmailInput = {
  siteLink: string;
  companyName: string;
  ownerName: string;
  companyPhoneNumber: string;
  companyPhoneNumberLink: string;
};
