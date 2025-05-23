const productService = require('../service/ProductService');
const cloudinary = require('../config/Cloudinary');

// Helper to upload buffer to Cloudinary
const streamUpload = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder: 'products' }, (error, result) => {
      if (result) resolve(result);
      else reject(error);
    });
    stream.end(buffer);
  });
};

const createProduct = async (req, res) => {
  try {
    let imageUrl = req.body.imageUrl || '';
    if (req.file) {
      const result = await streamUpload(req.file.buffer);
      imageUrl = result.secure_url;
    }

    const productData = {
      ...req.body,
      imageUrl,
      stock: parseInt(req.body.stock) || 0,
      price: parseFloat(req.body.price),
      inStock: req.body.inStock === 'true',
      featured: req.body.featured === 'true',
    };

    const newProduct = await productService.createProduct(productData);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Other methods remain the same
const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // If there's a file, upload it to Cloudinary
    if (req.file) {
      const result = await streamUpload(req.file.buffer);
      updateData.imageUrl = result.secure_url;
    }

    // Convert string values to appropriate types
    if (updateData.stock) updateData.stock = parseInt(updateData.stock);
    if (updateData.price) updateData.price = parseFloat(updateData.price);
    if (updateData.inStock) updateData.inStock = updateData.inStock === 'true';
    if (updateData.featured) updateData.featured = updateData.featured === 'true';

    const updatedProduct = await productService.updateProduct(id, updateData);

    if (updatedProduct) {
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await productService.deleteProduct(req.params.id);
    if (deletedProduct) {
      res.json({ message: 'Product deleted' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
