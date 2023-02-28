const { read_file, write_file } = require("../fs/fs-api");

const Product = {
  GET: (req, res) => {
    const { id } = req.user;
    const productsArr = read_file("products.json").filter(
      ({ user_id }) => user_id === id
    );
    res.status(200).send(productsArr);
  },

  GET_ONE: (req, res) => {
    const findProduct = read_file("products.json").find(
      (product) => product.id == req.params.id
    );

    if (!findProduct) {
      res.status(404).send({ msg: "Not found!" });
    }

    res.status(200).send(findProduct);
  },

  CREATE: async (req, res) => {
    try {
      const { id } = req.user;

      const newProduct = req.body;
      const products = read_file("products.json");
      products.push({
        id: products[products.length - 1]
          ? products[products.length - 1].id + 1
          : 1,
        user_id: id,
        ...newProduct,
      });

      write_file("products.json", products);
      res.status(201).send({ msg: "Course created" });
    } catch (error) {
      res.send({ error: error.message });
    }
  },

  UPDATE: (req, res) => {
    const { name, price } = req.body;
    let products = read_file("products.json");
    let changed = false;
    products.forEach((product) => {
      if (product.id == req.params.id) {
        product.name = name ? name : product.name;
        product.price = price ? price : product.price;
        changed = true;
      }
    });
    if (!changed) return res.status(404).end("Product not found!");

    write_file("products.json", products);
    res.status(200).send({ msg: "Successfully updated!" });
  },

  DELETE: (req, res) => {
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
  },
};

module.exports = Product;
