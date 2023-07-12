import express from "express";
import * as MarketItemController from "../controllers/marketItems";

const router = express.Router();

router.get("/", MarketItemController.getMarketItems);

router.get("/selected", MarketItemController.getSelectedMarketItems);

router.get("/type/:typeName", MarketItemController.getMarketItemTypes);

router.get(
  "/seasonal/:zone/:month",
  MarketItemController.getSeasonalMarketItems
);

router.get("/item/:name", MarketItemController.getMarketItem);

export default router;
