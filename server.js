const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { json } = require("express");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// ROUTES
const productRouter = require("./routes/product-router");

app.use(cors());
app.use(json());
app.use(productRouter);

// LISTENING PORT
app.listen(PORT, () => {
  console.log("server is running on the " + PORT);
});
