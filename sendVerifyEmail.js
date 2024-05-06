// Powers the sign up flow, this action is called from /user/actions/signUp.js
import { applyParams, save, ActionOptions, SendVerifyEmailUserActionContext, DefaultEmailTemplates, Config } from "gadget-server";

/**
 * @param { SendVerifyEmailUserActionContext } context
 */
export async function run({ params, record, logger, api, session }) {
// Applies hashed code 'emailVerificationToken' to user record and saves to db  
  applyParams(params, record);
  await save(record);
  return {
    result: "ok" 
  }
};

/**
 * @param { SendVerifyEmailUserActionContext } context
 */
export async function onSuccess({ params, record, logger, api, emails }) {
  if (!record.emailVerified && record.emailVerificationToken) {
    // Generates link to reset password
    const url = new URL("/verify-email", Config.appUrl);
    url.searchParams.append("code", record.emailVerificationToken);
    // Sends link to user
    await emails.sendMail({
      to: record.email,
      subject: `Verify your email with ${Config.appName}`,
      html: DefaultEmailTemplates.renderVerifyEmailTemplate({ url: url.toString() })
    })
  }
};

/** @type { ActionOptions } */
export const options = {
  actionType: "custom",
  returnType: true,
  triggers: {
    sendVerificationEmail: true
  }
};
