const express = require("express");
const productRouter = express.Router();
const productController = require('../controller/ProductController');
const upload = require('../middleware/Upload');

productRouter.post('/', upload.single('imageUrl'), productController.createProduct);
productRouter.get('/', productController.getAllProducts);
productRouter.get('/:id', productController.getProductById);
productRouter.put('/:id', upload.single('imageUrl'), productController.updateProduct);
productRouter.delete('/:id', productController.deleteProduct);

module.exports = productRouter;
