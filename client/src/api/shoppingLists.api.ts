import { ShoppingListModel, ListItemModel } from "@models/shoppingList";
import { fetchData } from "./fetchData.api";

export async function fetchShoppingLists(): Promise<ShoppingListModel[]> {
  const response = await fetchData("/api/shoppingLists", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  return response.json();
}
export interface ShoppingListInputs {
  title: string;
  list: Array<ListItemModel>;
}

export async function createShoppingList(
  shoppingList: ShoppingListInputs
): Promise<ShoppingListModel> {
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
  shoppingList: ShoppingListInputs
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
