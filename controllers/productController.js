import mongoose from "mongoose";
import * as productService from "../services/productService.js";
import Product from "../models/productsModel.js";



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
        console.log("🔹 Category received:", category);

        const products = await Product.find({ category });
        
        console.log("✅ Products fetched:", products);
        res.status(200).json(products);
    } catch (error) {
        console.error("❌ Error fetching products:", error.message);
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

// export const updateProduct = async (req, res) => {
//     try {
//         const updatedProduct = await productService.updateProduct(req.params.id, req.body);
//         if (!updatedProduct) {
//             return res.status(404).json({ success: false, message: "Product not found" });
//         }
//         res.status(200).json({ success: true, data: updatedProduct });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };


// export const updateProduct = async (req, res) => {
//     try {
//         const { id } = req.params;

//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(400).json({ success: false, message: "Invalid Product ID" });
//         }

//         // 🔍 Existing product 
//         const existingProduct = await Product.findById(id);
//         if (!existingProduct) {
//             return res.status(404).json({ success: false, message: "Product not found" });
//         }

//         // 🚨 `productCode`
//         req.body.productCode = existingProduct.productCode;

//         // 🛠 Debug Logs (Check request body)
//         console.log("Incoming Data:", req.body);
//         console.log("Existing Product:", existingProduct);

       
//         if (req.files && req.files.length > 0) {
//             req.body.images = req.files.map((file) => file.path); 
//             console.log("New Images:", req.body.images);
//         } else {
//             req.body.images = existingProduct.images; 
//             console.log("Keeping Old Images:", req.body.images);
//         }

//         // 🔄 Product update 
//         const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });

//         console.log("Updated Product:", updatedProduct);
//         res.status(200).json({ success: true, data: updatedProduct });
//     } catch (error) {
//         console.error("Error while updating product:", error);
//         res.status(500).json({ success: false, message: "Server Error", error: error.message });
//     }
// };









export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid Product ID" });
        }

        // 🔍 Existing product search
        const existingProduct = await Product.findById(id);
        if (!existingProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // 🚨 Keep old `productCode`
        req.body.productCode = existingProduct.productCode;

        // 🖼️ Image Update Logic
        if (req.files && req.files.length > 0) {
            // If new images are uploaded, replace old images
            req.body.images = req.files.map((file) => file.path);
            console.log("📸 New Images:", req.body.images);
        } else {
            // If no new images uploaded, keep old images
            req.body.images = existingProduct.images;
            console.log("📎 Keeping Old Images:", req.body.images);
        }

        // 🔄 Update product in database
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { $set: req.body }, // Update only provided fields
            { new: true } // Return updated document
        );

        console.log("✅ Updated Product:", updatedProduct);
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        console.error("❌ Error while updating product:", error);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
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
