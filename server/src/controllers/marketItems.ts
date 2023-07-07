import { RequestHandler } from "express";
import createHttpError from "http-errors";
import env from "../util/validateEnv";
import MarketItemModel from "../models/marketItems";

const ATLAS_API_BASE_URL = "https://cloud.mongodb.com/api/atlas/v1.0";
const ATLAS_PROJECT_ID = env.MONGODB_ATLAS_PROJECT_ID;
const ATLAS_CLUSTER_NAME = env.MONGODB_ATLAS_CLUSTER;
const ATLAS_CLUSTER_API_URL = `${ATLAS_API_BASE_URL}/groups/${ATLAS_PROJECT_ID}/clusters/${ATLAS_CLUSTER_NAME}`;
const ATLAS_SEARCH_INDEX_API_URL = `${ATLAS_CLUSTER_API_URL}/fts/indexes`;

const ATLAS_API_PUBLIC_KEY = env.MONGODB_ATLAS_PUBLIC_KEY;
const ATLAS_API_PRIVATE_KEY = env.MONGODB_ATLAS_PRIVATE_KEY;
const DIGEST_AUTH = `${ATLAS_API_PUBLIC_KEY}:${ATLAS_API_PRIVATE_KEY}`;

const IN_SEASON_SEARCH_INDEX_NAME = "searchMarketItems";

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

// Get all in-season market items for the selected zone.
export const getSeasonalMarketItems: RequestHandler = async (
  req,
  res,
  next
) => {
  const zone = "6a";
  const month = "July";
  const zoneDigit = zone.replace(/[^0-9]/g, "");
  const zoneToFind = new RegExp(zoneDigit + "$");
  const query = { zone: zoneToFind };

  const db = mongoClient.db("tutorial");
  const collection = db.collection<User>(MONGODB_COLLECTION);

  const pipeline = [];

  pipeline.push({
    $search: {
      index: IN_SEASON_SEARCH_INDEX_NAME,
      compound: {
        must: [
          {
            text: {
              query: zone,
              path: "zones",
              fuzzy: {},
            },
          },
          {
            text: {
              query: month,
              path: "harvest_dates",
            },
          },
        ],
      },
    },
  });

  try {
    const marketItems = await MarketItemModel.find(query).exec();
    if (marketItems.length === 0) {
      throw createHttpError(404, "No in-season items found");
    }
    res.status(200).json(marketItems);
  } catch (error) {
    next(error);
  }
};
