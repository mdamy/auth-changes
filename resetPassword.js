// Powers form in web/routes/reset-password.jsx
import { applyParams, save, ActionOptions, ResetPasswordUserActionContext } from "gadget-server";

/**
 * @param { ResetPasswordUserActionContext } context
 */
export async function run({ params, record, logger, api, session }) {
  // Applies new 'password' to the user record and saves to database
  applyParams(params, record);
  await save(record);
  return {
    result: "ok"
  }
};

/**
 * @param { ResetPasswordUserActionContext } context
 */
export async function onSuccess({ params, record, logger, api, emails }) {
  // Your logic goes here
};

/** @type { ActionOptions } */
export const options = {
  actionType: "custom",
  returnType: true,
  triggers: {
    resetPassword: true
  }
};
