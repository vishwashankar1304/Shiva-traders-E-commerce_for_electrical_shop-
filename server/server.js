const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/MongoDB");
const productRoutes = require('./src/router/ProductRouter');

const app = express();
const PORT = process.env.PORT || 5006;

connectDB();

// Enable CORS
app.use(cors());

app.use(express.json());
app.use('/api/products', productRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})