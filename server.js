const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { json } = require("express");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// ROUTES
const productRouter = require("./routes/product-router");
const authRouter = require("./routes/auth-router");

// MIDDLEWARE
const authMiddleware = require("./middleware/auth-middleware");

app.use(cors());
app.use(json());
//routes
app.use(productRouter);
app.use(authRouter);
//middleware
app.use(authMiddleware);

// LISTENING PORT
app.listen(PORT, () => {
  console.log("server is running on the " + PORT);
});
