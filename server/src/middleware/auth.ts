import { RequestHandler } from "express";
import createHttpError from "http-errors";

export const requiresAuth: RequestHandler = (req, res, next) => {
  // Check if there is a logged in session
  if (req.session.userId) {
    next(); // Call the next middleware, which would be the endpoint.
  } else {
    // The error to be caught.
    next(createHttpError(401, "User not authenticated."));
  }
};
