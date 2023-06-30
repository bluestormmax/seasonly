import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import ShoppingListModel from "./models/shoppingList";

const app = express();

app.get("/", async (req, res, next) => {
  try {
    const shoppingLists = await ShoppingListModel.find().exec();
    res.status(200).json(shoppingLists);
  } catch (error) {
    next(error);
  }
});

// Express error handler.
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  let errorMessage = "An unknown error occurred";
  if (error instanceof Error) errorMessage = error.message;
  res.status(500).json({ error: errorMessage });
});

export default app;
