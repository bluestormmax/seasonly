import { RequestHandler } from "express";
import ShoppingListModel from "../models/shoppingList";

export const getShoppingLists: RequestHandler = async (req, res, next) => {
  try {
    const shoppingLists = await ShoppingListModel.find().exec();
    res.status(200).json(shoppingLists);
  } catch (error) {
    next(error);
  }
};
