// Powers the form in web/routes/sign-up.jsx
import { applyParams, save, ActionOptions, SignUpUserActionContext } from "gadget-server";

/**
 * @param { SignUpUserActionContext } context
 */
export async function run({ params, record, logger, api, session }) {
  applyParams(params, record);
  record.lastSignedIn = new Date();
  await save(record);
  // associates the current user record with the active session <-- why is this here
  if (record.emailVerified) {
    session?.set("user", { _link: record.id });
  }
  return {
    result: "ok" //// Overrides default user record return with "ok" string
  }
};

/**
 * @param { SignUpUserActionContext } context
 */
export async function onSuccess({ params, record, logger, api }) {
  // sends the user a verification email by: api/models/user/actions/sendVerifyEmail.js
  if (!record.emailVerified) {
    await api.user.sendVerifyEmail({ email: record.email });
  }
};

/** @type { ActionOptions } */
export const options = {
  actionType: "create",
  returnType: true,
  triggers: {
    googleOAuthSignUp: true,
    emailSignUp: true
  }
};