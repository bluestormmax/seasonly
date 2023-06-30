import express from "express";
import * as ShoppingListController from "../controllers/shoppingLists";

const router = express.Router();

router.get("/", ShoppingListController.getShoppingLists);

export default router;
