import { ShoppingList } from "@models/shoppingList";

async function fetchData(input: RequestInfo, init: RequestInit) {
  const response = await fetch(input, init);
  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json(); // We set up this JSON in our endpoint.
    const errorMsg = errorBody.error;
    throw Error(errorMsg);
  }
}

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
