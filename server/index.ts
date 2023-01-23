import cors from "cors";
import express from "express";
import authentication from "./endpoints/authentication";
import items from "./endpoints/items";
import logger from "./middleware/logger";

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

// middleware
app.use(cors());
app.use(logger);

// routes
app.use(authentication);
app.use(items);

app.listen(9003, "localhost");

console.log("server is running on port:", 9003);
