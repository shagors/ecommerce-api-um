import asyncHandler from "express-async-handler";
import Product from "../model/Product.js";

// create product and upload to database
export const createProductCtrl = asyncHandler(async (req, res) => {
  const { name, description, category, sizes, colors, price, totalQty, brand } =
    req.body;
  //Product exists
  const productExists = await Product.findOne({ name });
  if (productExists) {
    throw new Error("Product Already Exists");
  }

  const product = await Product.create({
    name,
    description,
    category,
    sizes,
    colors,
    user: req.userAuthId,
    price,
    totalQty,
    brand,
  });

  res.json({
    status: "success",
    message: "Product created successfully",
    product,
  });
});

//get products from server
export const getProductsCtrl = asyncHandler(async (req, res) => {
  const products = await Product.find();
  if (!products) {
    throw new Error("Prouducts not found");
  }
  res.json({
    status: "success",
    message: "Products fetched successfully",
    products,
  });
});
