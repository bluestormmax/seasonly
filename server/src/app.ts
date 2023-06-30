import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import shoppingListRoutes from "./routes/shoppingLists";

const app = express();

// set up request logging.
app.use(morgan("dev"));

// Set up express to accept JSON
app.use(express.json());

// Put all shoppingList endpoints at this URL
app.use("/api/shoppingLists", shoppingListRoutes);

// Custom error for non-existent endpoints.
app.use((req, res, next) => {
  next(Error("Endpoint not found"));
});

// Express error handler.
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  let errorMessage = "An unknown error occurred";
  if (error instanceof Error) errorMessage = error.message;
  res.status(500).json({ error: errorMessage });
});

export default app;
