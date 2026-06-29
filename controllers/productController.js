import Product from "../models/Product.js";

// desc get all the products with pagination/ search, and filter
// @route GET /api/products

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// desc Create a product (admin only)
// @route POST /api/products

export const createProduct = async (req, res) => {
  try {
    const { name, price, description, image, category, stock } = req.body;

    const product = new Product({
      name,
      price,
      description,
      image,
      category,
      stock,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);

    // const existProduct = await Product.findById();

    // if()
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// desc update a product (admin only)
// @route PUT /api/products:/id

export const updateProduct = async (req, res) => {
  try {
    const { name, price, description, image, category, stock } = req.body;

    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = name || product.name;
      product.price = price || product.price;
      product.description = description || product.description;
      product.image = image || product.image;
      product.category = category || product.category;
      product.stock = stock || product.stock;

      const updatedProduct = await product.save();

      res.json({
        success: true,
        product: updatedProduct,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// desc delete a product (admin only)
// @route PUT /api/products:/id

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne();

      res.json({
        success: true,
        product: "Product removed",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
  } catch (error) {
    res.status(500).json({
        message: error.message
    })
  }
};
