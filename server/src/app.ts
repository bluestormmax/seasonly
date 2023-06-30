import "dotenv/config";
import express from "express";
import ShoppingListModel from "./models/shoppingList";

const app = express();

app.get("/", async (req, res) => {
  const shoppingLists = await ShoppingListModel.find().exec();
  res.status(200).json(shoppingLists);
});

export default app;
