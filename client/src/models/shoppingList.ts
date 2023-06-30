export interface ShoppingList {
  _id: string; // mongodb naming convention
  title: string;
  list: string;
  createdAt: string; // mongodb stores strings for timestamps
  updatedAt: string; // ditto
}
