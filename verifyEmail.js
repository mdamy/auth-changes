// Powers the sign up flow, this action is called from the confirmation email
import { applyParams, save, ActionOptions, VerifyEmailUserActionContext } from "gadget-server";

/**
 * @param { VerifyEmailUserActionContext } context
 */
export async function run({ params, record, logger, api, session }) {
  applyParams(params, record);// <-- need to add how we do the checks
  await save(record); 
  return {
    result: "ok"  // Overrides default user record return with "ok" string
  }
};

/**
 * @param { VerifyEmailUserActionContext } context
 */
export async function onSuccess({ params, record, logger, api, emails }) {
  // Your logic goes here
};

/** @type { ActionOptions } */
export const options = {
  actionType: "custom",
  returnType: true,
  triggers: {
    verifiedEmail: true
  }
};