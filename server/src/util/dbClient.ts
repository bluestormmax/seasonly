import * as mongodb from "mongodb";
import env from "../util/validateEnv";

export const MONGODB_DATABASE = "seasonly_app";
export const MONGODB_COLLECTION = "marketitems";

const MONGO_CONNECTION_STRING = env.MONGO_CONNECTION_STRING!;

export const mongoClient = new mongodb.MongoClient(MONGO_CONNECTION_STRING, {
  serverApi: {
    version: mongodb.ServerApiVersion.v1,
    deprecationErrors: true,
  },
});
