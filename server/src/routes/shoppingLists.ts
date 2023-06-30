import express from "express";
import * as ShoppingListController from "../controllers/shoppingLists";

const router = express.Router();

router.get("/", ShoppingListController.getShoppingLists);

router.get("/:shoppingListId", ShoppingListController.getShoppingList);

router.post("/", ShoppingListController.createShoppingList);

export default router;
