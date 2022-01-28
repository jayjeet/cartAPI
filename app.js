const express = require("express");
var cors = require("cors");
const app = express();

const itemRouter = require("./route/productRouter");
const cartRouter = require("./route/cartRouter");

app.use(cors());

app.use(express.json());

app.use("/api/v1/item", itemRouter);
app.use("/api/v1/cart", cartRouter);

module.exports = app;
