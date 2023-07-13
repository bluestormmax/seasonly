import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import session from "express-session";
import MongoStore from "connect-mongo";
import cors from "cors";
import shoppingListRoutes from "./routes/shoppingLists";
import userRoutes from "./routes/users";
import marketItemRoutes from "./routes/marketItems";
import { requiresAuth } from "./middleware/auth";

const app = express();

// Use cors headers.
app.use(cors());

// set up request logging.
app.use(morgan("dev"));

// Set up express to accept JSON
app.use(express.json());

// Read the session data after json but before routes.
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 3, // 3 days
    },
    rolling: true, // refresh cookie automatically within 1hr if user active
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_CONNECTION_STRING,
    }),
  })
);

// Put all user endpoints at this URL
app.use("/api/users", userRoutes);

// Put all shoppingList endpoints at this URL and auth.
app.use("/api/shoppingLists", requiresAuth, shoppingListRoutes);

// Put all market items at this URL
app.use("/api/marketItems", marketItemRoutes);

// Custom error for non-existent endpoints.
app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

// Express error handler.
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  let errorMessage = "An unknown error occurred";
  let statusCode = 500; // 500 fallback.
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

export default app;
