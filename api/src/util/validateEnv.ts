import { cleanEnv } from "envalid";
import { port, str } from "envalid/dist/validators";

export default cleanEnv(process.env, {
  MONGO_CONNECTION_STRING: str(),
  PORT: port(),
  SESSION_SECRET: str(),
  MONGODB_ATLAS_PROJECT_ID: str(),
  MONGODB_ATLAS_CLUSTER: str(),
  MONGODB_ATLAS_PUBLIC_KEY: str(),
  MONGODB_ATLAS_PRIVATE_KEY: str(),
  APP_BASE_URL: str(),
});
