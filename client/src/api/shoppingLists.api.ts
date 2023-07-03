import { ShoppingList } from "@models/shoppingList";
import { fetchData } from "./fetchData.api";

export async function fetchShoppingLists(): Promise<ShoppingList[]> {
  const response = await fetchData("/api/shoppingLists", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  return response.json();
}

export interface ShoppingListInput {
  title: string;
  list: string;
}

export async function createShoppingList(
  shoppingList: ShoppingListInput
): Promise<ShoppingList> {
  const response = await fetchData("/api/shoppingLists", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(shoppingList),
  });
  return response.json();
}

export async function updateShoppingList(
  shoppingListId: string,
  shoppingList: ShoppingListInput
): Promise<ShoppingList> {
  const response = await fetchData("/api/shoppingLists/" + shoppingListId, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(shoppingList),
  });
  return response.json();
}

export async function deleteShoppingList(shoppingListId: string) {
  await fetchData("/api/shoppingLists/" + shoppingListId, { method: "DELETE" });
}
