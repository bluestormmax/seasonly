import { RequestHandler } from "express";
import createHttpError from "http-errors";
import MarketItemModel from "../models/marketItems";

// Get all market items.
export const getMarketItems: RequestHandler = async (req, res, next) => {
  try {
    const marketItems = await MarketItemModel.find().exec();
    res.status(200).json(marketItems);
  } catch (error) {
    next(error);
  }
};

// Get single market item
export const getMarketItem: RequestHandler = async (req, res, next) => {
  const marketItemName = req.params.name;

  try {
    const marketItem = await MarketItemModel.findOne({
      name: marketItemName,
    }).exec();
    if (!marketItem) {
      throw createHttpError(404, "Item not found");
    }
    res.status(200).json(marketItem);
  } catch (error) {
    next(error);
  }
};

// Get all market items of type
export const getMarketItemTypes: RequestHandler = async (req, res, next) => {
  const itemTypeName = req.params.typeName;

  try {
    const marketItems = await MarketItemModel.find({
      itemType: itemTypeName,
    }).exec();
    if (!marketItems) {
      throw createHttpError(404, "Item type not found");
    }
    res.status(200).json(marketItems);
  } catch (error) {
    next(error);
  }
};
