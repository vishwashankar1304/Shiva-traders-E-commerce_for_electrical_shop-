const Product = require("../model/ProductModel")


const createProduct = async (data) => {
    const product = new Product(data);
    return await product.save();
}

const getAllProducts = async (searchQuery = "") => {
  try {
    if (searchQuery.trim()) {
      console.log("Searching for products with query:", searchQuery);
      // Search by name, description, or category (case-insensitive)
      const results = await Product.find({
        $or: [
          { name: { $regex: searchQuery, $options: "i" } },
          { description: { $regex: searchQuery, $options: "i" } },
          { category: { $regex: searchQuery, $options: "i" } }
        ]
      });
      console.log("Found", results.length, "products matching search");
      return results;
    }
    console.log("No search query, returning all products");
    return await Product.find({});
  } catch (error) {
    throw new Error(`Error fetching products: ${error.message}`);
  }
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