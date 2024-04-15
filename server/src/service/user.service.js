import { traced } from "@sliit-foss/functions";
import context from "express-http-context";
import { retrievedUserById, updateUserById } from "../repository/user.repository";
import { errors } from "../utils";

export const getUser = async (id) => {
  const currentUser = context.get("user");
  if (currentUser._id !== id) {
    throw errors.no_permission;
  }

  const user = await traced(retrievedUserById)(id);
  if (user === null) {
    throw errors.user_not_found;
  }
  return user;
};

export const updateUser = async (id, payload) => {
  const currentUser = context.get("user");
  if (currentUser._id !== id) {
    throw errors.no_permission;
  }

  const user = await traced(retrievedUserById)(id);
  if (user === null) {
    throw errors.user_not_found;
  }
  return traced(updateUserById)(id, payload);
};
