import express from "express";
import * as ShoppingListController from "../controllers/shoppingLists";

const router = express.Router();

router.get("/", ShoppingListController.getShoppingLists);

router.get("/:shoppingListId", ShoppingListController.getShoppingList);

router.post("/", ShoppingListController.createShoppingList);

router.patch("/:shoppingListId", ShoppingListController.updateShoppingList);

router.delete("/:shoppingListId", ShoppingListController.deleteShoppingList);

export default router;
