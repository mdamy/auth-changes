import { ActionOptions, SignOutUserActionContext } from "gadget-server";

/**
 * @param { SignOutUserActionContext } context
 */
export async function run({ params, record, logger, api, session }) {
  // Removes the user from the active session
  session?.set("user", null);
};

/**
 * @param { SignOutUserActionContext } context
 */
export async function onSuccess({ params, record, logger, api }) {
  // Your logic goes here
};

/** @type { ActionOptions } */
export const options = {
  actionType: "custom",
  triggers: {
    signOut: true
  }
};
