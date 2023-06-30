import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import shoppingListRoutes from "./routes/shoppingLists";

const app = express();

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
