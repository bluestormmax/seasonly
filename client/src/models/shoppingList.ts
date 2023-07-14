export interface ListItemModel {
  itemId?: string;
  name: string;
  displayName: string;
}
export interface ShoppingListModel {
  _id: string; // mongodb naming convention
  title: string;
  list: Array<ListItemModel>;
  createdAt: string; // mongodb stores strings for timestamps
  updatedAt: string; // ditto
}
