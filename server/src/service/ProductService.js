const Product = require("../model/ProductModel")


const createProduct = async (data) => {
    const product = new Product(data);
    return await product.save();
}

const getAllProducts = async () => {
  return await Product.find({});
};

const getProductById = async (id) => {
  return await Product.findById(id);
};

const updateProduct = async (id, data) => {
  try {
    return await Product.findByIdAndUpdate(id, data, { new: true });
  } catch (error) {
    throw new Error('Error updating product');
  }
};

const deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};