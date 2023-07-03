import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import shoppingListRoutes from "./routes/shoppingLists";
import userRoutes from "./routes/users";

const app = express();

// set up request logging.
app.use(morgan("dev"));

// Set up express to accept JSON
app.use(express.json());

// Put all user endpoints at this URL
app.use("/api/users", userRoutes);

// Put all shoppingList endpoints at this URL
app.use("/api/shoppingLists", shoppingListRoutes);

// Custom error for non-existent endpoints.
app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

// Express error handler.
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  let errorMessage = "An unknown error occurred";
  let statusCode = 500; // 500 fallback.
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

export default app;
