const Express = require("express");
const app = Express();
const joi = require("joi");
const mongoose = require("mongoose");

app.use(Express.json());

const Gets = require("./Routes/Get");
app.use("/", Gets);

const products = [
  {
    id: 1,
    image: "http://placeimg.com/640/480/abstract",
    title: "Merritt",
    description: "good merritt",
    price: "143.29",
  },
  {
    id: 2,
    image: "http://placeimg.com/640/480/abstract",
    title: "shoes",
    description: "good shoes",
    price: "143.29",
  },
  {
    id: 3,
    image: "http://placeimg.com/640/480/abstract",
    title: "shoes",
    description: "good shoes",
    price: "143.29",
  },
  {
    id: 4,
    image: "http://placeimg.com/640/480/abstract",
    title: "shoes",
    description: "good shoes",
    price: "143.29",
  },
  {
    id: 5,
    image: "http://placeimg.com/640/480/abstract",
    title: "shoes",
    description: "good shoes",
    price: "143.29",
  },
];

mongoose.connect(
  "mongodb+srv://ShopUnionAdmin:YflOVRNKfgcjN4XF@cluster0.9yswveu.mongodb.net/?retryWrites=true&w=majority",
  () => console.log("Connected To Database!")
);

app.get("/api/products", (req, res) => {
  res.send(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((e) => e.id === parseInt(req.params.id));
  if (product === undefined) {
    res.status(404).send("Product Not Found!");
    return;
  } else {
    res.send(product);
  }
});

app.post("/api/products", (req, res) => {
  const schema = joi.object({
    image: joi.string().min(5).max(20).required(),
    title: joi.string().min(1).max(20).required(),
    description: joi.string().min(10).max(150).required(),
    price: joi.string().min(1).max(10).required(),
  });

  const result = joi.attempt(req.body, schema);
  const product = {
    id: products.length + 1,
    image: req.body.image,
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
  };
  products.push(product);
  const response = {
    message: "Product Added Successfully!",
    product,
  };
  res.send(response);
});

app.put("/api/products/:id", (req, res) => {
  const product = products.find((e) => e.id === parseInt(req.params.id));
  if (product === undefined) {
    res.status(404).send("Product Not Found!");
    return;
  } else {
    const schema = joi.object({
      image: joi.string().min(5).max(20).required(),
      title: joi.string().min(1).max(20).required(),
      description: joi.string().min(10).max(150).required(),
      price: joi.string().min(1).max(10).required(),
    });

    const result = joi.attempt(req.body, schema);

    product.image = req.body.image;
    product.title = req.body.tile;
    product.description = req.body.description;
    product.price = req.body.price;

    const response = {
      message: "Product Updated Successfully!",
      product,
    };
    res.send(response);
  }
});

app.delete("/api/products/:id", (req, res) => {
  const product = products.find((e) => e.id === parseInt(req.params.id));
  if (product === undefined) {
    res.status(404).send("Product Not Found!");
    return;
  } else {
    const index = products.indexOf(product);
    products.splice(index, 1);

    const response = {
      message: "Product Deleted Successfully!",
      product,
    };
    res.send(response);
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Listening On Port ${port}`);
});
