import { RequestHandler } from "express";
import mongoose from "mongoose";
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
    if (!mongoose.isValidObjectId(shoppingListId)) {
      throw createHttpError(400, "Invalid list id");
    }
    const shoppingList = await ShoppingListModel.findById(
      shoppingListId
    ).exec();
    if (!shoppingList) {
      throw createHttpError(404, "List not found");
    }
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

interface UpdateShoppingListParams {
  shoppingListId: string;
}

interface UpdateShoppingListBody {
  title?: string;
  list?: string;
}

export const updateShoppingList: RequestHandler<
  UpdateShoppingListParams,
  unknown,
  UpdateShoppingListBody,
  unknown
> = async (req, res, next) => {
  const shoppingListId = req.params.shoppingListId;
  const newTitle = req.body.title;
  const newList = req.body.list;

  try {
    if (!mongoose.isValidObjectId(shoppingListId)) {
      throw createHttpError(400, "Invalid list id");
    }
    if (!newTitle || !newList) {
      throw createHttpError(
        400,
        "List must have a title and list items to be updated"
      );
    }

    const shoppingList = await ShoppingListModel.findById(
      shoppingListId
    ).exec();
    if (!shoppingList) {
      throw createHttpError(404, "List not found");
    }
    shoppingList.title = newTitle;
    shoppingList.list = newList;

    // Use the updated list immediately in UI.
    const updatedShoppingList = await shoppingList.save();
    // Return updated note to db.
    res.status(200).json(updatedShoppingList);
  } catch (error) {
    next(error);
  }
};

export const deleteShoppingList: RequestHandler = async (req, res, next) => {
  const shoppingListId = req.params.shoppingListId;

  try {
    if (!mongoose.isValidObjectId(shoppingListId)) {
      throw createHttpError(400, "Invalid list id");
    }

    const shoppingList = await ShoppingListModel.findById(
      shoppingListId
    ).exec();

    if (!shoppingList) {
      throw createHttpError(404, "List not found");
    }

    await shoppingList.deleteOne();

    // Send deletion success code.
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
