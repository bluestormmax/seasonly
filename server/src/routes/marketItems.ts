import express from "express";
import * as MarketItemController from "../controllers/marketItems";

const router = express.Router();

router.get("/", MarketItemController.getMarketItems);

router.get("/:name", MarketItemController.getMarketItem);

router.get("/type/:typeName", MarketItemController.getMarketItemTypes);

export default router;
