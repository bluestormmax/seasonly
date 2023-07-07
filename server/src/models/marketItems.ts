import { InferSchemaType, model, Schema } from "mongoose";

const marketItemSchema = new Schema({
  itemType: { type: String, required: true },
  displayName: { type: String, required: true },
  name: { type: String, required: true },
  zones: [
    {
      zone: { type: String },
      planting_dates: [{ type: String }],
      harvest_dates: [{ type: String }],
    },
  ],
});

type MarketItem = InferSchemaType<typeof marketItemSchema>;

export default model<MarketItem>("MarketItem", marketItemSchema);
