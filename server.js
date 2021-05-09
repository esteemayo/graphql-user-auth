import mongoose from "mongoose";
import dotenv from "dotenv";

import app from "./app";

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION 🔥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });

const db = process.env.DATABASE_LOCAL;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log(`MongoDB Connected → ${db}`));

app.set("port", process.env.PORT || 3030);

const server = app.listen(app.get("port"), () =>
  console.log(`App listening on port → ${server.address().port}`)
);

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION 🔥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
