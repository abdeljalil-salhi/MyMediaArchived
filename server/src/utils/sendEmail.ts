"use strict";
import {
  createTransport,
  createTestAccount,
  getTestMessageUrl,
} from "nodemailer";

import logger from "./logger";
import { SMTP_HOST, SMTP_PORT, SMTP_AUTH, SMTP_SENDER } from "../constants";

// Generate test SMTP service account from ethereal.email
// Only needed if you need a mail account for testing
// @form => {id}@ethereal.email
export async function mailTestAccount() {
  let testAccount = await createTestAccount();
  logger.info(testAccount);
}

export function sendEmail(to: string, html: string) {
  // Uncomment to create a test account
  // mailTestAccount();

  // Create reusable transporter object using the default SMTP transport
  createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT),
    // 'true' for port 465, 'false' for other ports
    secure: parseInt(SMTP_PORT) === 465,
    auth: {
      user: SMTP_AUTH.split(":")[0],
      pass: SMTP_AUTH.split(":")[1],
    },
  }).sendMail(
    {
      // Sender address
      from: SMTP_SENDER,
      // List of receivers
      to,
      // Subject line
      subject: "Reset password",
      // HTML body
      html,
    },
    (err, info) => {
      err && logger.error(err);
      if (info) {
        logger.info("Message ID: %s", info.messageId);
        logger.info("Preview URL: %s", getTestMessageUrl(info));
      }
    }
  );
}
