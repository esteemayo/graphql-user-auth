import jwt from "jsonwebtoken";
import { promisify } from "util";

import User from "./../models/User";

export const checkAuth = async (context) => {
  let token;
  const authHeader = context.req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    throw new Error("Ypu are not logged in! Please log in to get access");
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    throw new Error("The user belonging to this token does no longer exist.");
  }

  if (currentUser.changedPasswordAfter(decoded.iat)) {
    throw new Error("User recently changed password! Please log in again.");
  }

  return currentUser;
};
