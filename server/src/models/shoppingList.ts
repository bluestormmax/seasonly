import { InferSchemaType, model, Schema } from "mongoose";

const shoppingListSchema = new Schema(
  {
    title: { type: String, required: true },
    list: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

type ShoppingList = InferSchemaType<typeof shoppingListSchema>;

export default model<ShoppingList>("ShoppingList", shoppingListSchema);
