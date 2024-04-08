// Powers form in web/routes/changePassword.jsx
import { applyParams, save, ActionOptions, ChangePasswordUserActionContext } from "gadget-server";

/**
 * @param { ChangePasswordUserActionContext } context
 */
export async function run({ params, record, logger, api, session }) {
  applyParams(params, record); // <-- need to add how we do the checks
  await save(record);
};

/**
 * @param { ChangePasswordUserActionContext } context
 */
export async function onSuccess({ params, record, logger, api, emails }) {
  // Your logic goes here
};

/** @type { ActionOptions } */
export const options = {
  actionType: "custom",
  triggers: {
    changePassword: true
  }
};