import * as productService from "../services/productService.js";

export const createProduct = async (req, res) => {
    try {
        const productData = req.body;

        // Validate required fields
        const requiredFields = ["name", "productCode", "category", "metalType", "goldColor", "weight", "price", "priceBreakup", "availability", "images"];
        for (const field of requiredFields) {
            if (!productData[field]) {
                return res.status(400).json({ success: false, message: `${field} is required!` });
            }
        }

        const savedProduct = await productService.createProduct(productData);
        res.status(201).json({ success: true, data: savedProduct });
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// export const getAllProducts = async (req, res) => {
//     try {
//         const products = await productService.getAllProducts();
//         res.status(200).json({ success: true, data: products });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };


// export const getAllProducts = async (req, res) => {
//     try {
//         const { category } = req.query;  // Get category from query params
//         let query = {};

//         if (category) {
//             query.category = category; // Filter by category
//         }

//         const products = await Product.find(query);
//         res.status(200).json(products);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching products", error });
//     }
// };



export const getAllProducts = async (req, res) => {
    try {
        const { category } = req.query;  // Get category from query params
        let query = {};

        if (category) {
            query.category = category; // Filter by category
        }

        const products = await Product.find(query);
        console.log("✅ Products fetched successfully:", products); // Debug Log
        res.status(200).json(products);
    } catch (error) {
        console.error("❌ Error fetching products:", error);  // Debugging Error Log
        res.status(500).json({ message: "Error fetching products", error: error.message });
    }
};



export const getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        console.log("🔹 Category received:", category);  // ✅ Debugging Log

        let products;
        if (category === "Best Sellers" || category === "New Arrivals") {
            products = await Product.find(); // Fetch all products
        } else {
            products = await Product.find({ category }); // Fetch products by category
        }

        console.log("✅ Products fetched:", products);  // ✅ Debugging Log
        res.status(200).json(products);
    } catch (error) {
        console.error("❌ Error fetching products:", error.message);  // ✅ Print exact error
        res.status(500).json({ message: "Error fetching products", error: error.message });
    }
};




export const getProductById = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await productService.updateProduct(req.params.id, req.body);
        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await productService.deleteProduct(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
