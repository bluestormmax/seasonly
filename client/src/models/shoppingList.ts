export interface ListItem {
  itemId: string;
  name: string;
  displayName: string;
}
export interface ShoppingList {
  _id: string; // mongodb naming convention
  title: string;
  list: Array<ListItem>;
  createdAt: string; // mongodb stores strings for timestamps
  updatedAt: string; // ditto
}
