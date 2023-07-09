import { InferSchemaType, model, Schema } from "mongoose";

const ZonesSchema = new Schema({
  zone: { type: String },
  plant: [{ type: String }],
  harvest: [{ type: String }],
});

const marketItemSchema = new Schema({
  itemType: { type: String, required: true },
  displayName: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  imageUrl: { type: String },
  zones: [
    {
      ZonesSchema,
    },
  ],
});

type MarketItem = InferSchemaType<typeof marketItemSchema>;

export default model<MarketItem>("MarketItem", marketItemSchema);
