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

export const createShoppingList: RequestHandler = async (req, res, next) => {
  const title = req.body.title;
  const list = req.body.list;

  try {
    const newShoppingList = await ShoppingListModel.create({
      title: title,
      list: list,
    });
    // Send new resource created code and new list as JSON
    res.status(201).json(newShoppingList);
  } catch (error) {
    next(error);
  }
};
