// Powers the form in web/routes/sign-up.jsx
import { applyParams, save, ActionOptions, SignUpUserActionContext } from "gadget-server";

/**
 * @param { SignUpUserActionContext } context
 */
export async function run({ params, record, logger, api, session }) {
  // Applies 'email' and 'password' to a new user record and saves to db  
  applyParams(params, record);
  record.lastSignedIn = new Date();
  await save(record);
  if (record.emailVerified) {
    // Sets the signed in user with to active session
    session?.set("user", { _link: record.id });
  }
  return {
    result: "ok" 
  }
};

/**
 * @param { SignUpUserActionContext } context
 */
export async function onSuccess({ params, record, logger, api }) {
  if (!record.emailVerified) {
    // Sends verification email by bal calling /actions/sendVerifyEmail.js
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
