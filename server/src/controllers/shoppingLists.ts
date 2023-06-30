import { RequestHandler } from "express";
import ShoppingListModel from "../models/shoppingList";
import createHttpError from "http-errors";

// Get all shopping lists
export const getShoppingLists: RequestHandler = async (req, res, next) => {
  try {
    const shoppingLists = await ShoppingListModel.find().exec();
    res.status(200).json(shoppingLists);
  } catch (error) {
    next(error);
  }
};

// Get single shopping list
export const getShoppingList: RequestHandler = async (req, res, next) => {
  const shoppingListId = req.params.shoppingListId;

  try {
    const shoppingList = await ShoppingListModel.findById(
      shoppingListId
    ).exec();
    res.status(200).json(shoppingList);
  } catch (error) {
    next(error);
  }
};

interface CreateShoppingListBody {
  // Make both of these optional in case the request is missing one or the other
  title?: string;
  list?: string;
}

// Create new shopping list
export const createShoppingList: RequestHandler<
  unknown,
  unknown,
  CreateShoppingListBody,
  unknown
> = async (req, res, next) => {
  const title = req.body.title;
  const list = req.body.list;

  try {
    if (!title || !list) {
      throw createHttpError(400, "List must have a title and list items");
    }
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