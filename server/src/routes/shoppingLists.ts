import express from "express";
import * as ShoppingListController from "../controllers/shoppingLists";

const router = express.Router();

router.get("/", ShoppingListController.getShoppingLists);

router.post("/", ShoppingListController.createShoppingList);

export default router;
