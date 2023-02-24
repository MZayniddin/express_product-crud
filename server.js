const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { read_file, write_file } = require("./fs/fs-api");
const { json } = require("express");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(json());

// GET ALL PRODUCT LIST
app.get("/product/list", (req, res) => {
  res.status(200).send(read_file("products.json"));
});

// GET ONE PRODUCT
app.get("/product/retrieve/:id", (req, res) => {
  const findProduct = read_file("products.json").find(
    (product) => product.id == req.params.id
  );

  if (!findProduct) {
    res.status(404).send({ msg: "Not found!" });
  }

  res.status(200).send(findProduct);
});

// CREATE NEW PRODUCT
app.post("/product/create", (req, res) => {
  try {
    const newProduct = req.body;
    const products = read_file("products.json");
    products.push({
      id: products[products.length - 1]
        ? products[products.length - 1].id + 1
        : 1,
      ...newProduct,
    });

    write_file("products.json", products);
    res.status(201).send({ msg: "Course created" });
  } catch (error) {
    res.end(error.message);
  }
});

// UPDATE PRODUCT
app.put("/product/update/:id", (req, res) => {
  const { name, price } = req.body;
  let products = read_file("products.json");
  let changed = false;
  products.forEach((product) => {
    if (product.id == req.params.id) {
      console.log("kirdi");
      product.name = name ? name : product.name;
      product.price = price ? price : product.price;
      changed = true;
    }
  });
  if (!changed) return res.status(404).end("Product not found!");

  write_file("products.json", products);
  res.status(200).send({ msg: "Successfully updated!" });
});

// DELETE PRODUCT
app.delete("/product/destroy/:id", (req, res) => {
  const products = read_file("products.json");
  let deleted = false;
  products.forEach((product, index) => {
    if (product.id == req.params.id) {
      products.splice(index, 1);
      deleted = true;
    }
  });

  if (!deleted) res.status(404).send({ msg: "Product not found!" });

  write_file("products.json", products);
  res.status(200).send({ msg: "Product Deleted!" });
});

app.listen(PORT, () => {
  console.log("server is running on the " + PORT);
});
