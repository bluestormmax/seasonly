import { ListItemModel } from "@models/shoppingList";

export function checkIfInList(
  arr: ListItemModel[],
  item: ListItemModel
): boolean {
  return arr.some((el) => el["name"] === item["name"]);
}
