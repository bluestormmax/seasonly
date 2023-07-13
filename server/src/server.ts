import app from "./app";
import env from "./util/validateEnv";
import mongoose from "mongoose";

const port = env.PORT;

// mongoose
//   .connect(env.MONGO_CONNECTION_STRING)
//   .then(() => {
//     console.log("Mongoose connected");
//     app.listen(port, () => {
//       console.log("Server running on port: " + port);
//     });
//   })
//   .catch(console.error);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGO_CONNECTION_STRING);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// Routes
app.all("*", (req, res) => {
  res.json({ "every thing": "is awesome" });
});

// Connect to the database before listening
connectDB().then(() => {
  app.listen(env.PORT, () => {
    console.log("listening for requests");
  });
});
