import mongoose from "mongoose";
import * as productService from "../services/productService.js";
import Product from "../models/productsModel.js";




export const createProduct = async (req, res) => {
    try {
        const productData = req.body;
        if (!productData.name || !productData.productCode || !productData.category || !productData.metalType) {
            return res.status(400).json({ success: false, message: "Missing required fields!" });
        }
        
        if (req.files && req.files.length > 0) {
            productData.images = req.files.map(file => file.path);
        }
        
        const newProduct = await Product.create(productData);
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};





// export const getAllProducts = async (req, res) => {
//     try {
//         console.log("Fetching products..."); // 👈 Debug log
//         const products = await Product.find();
//         console.log("Products Fetched:", products); // 👈 Data print 

//         res.status(200).json(products);
//     } catch (error) {
//         console.error("Error fetching products:", error);
//         res.status(500).json({ message: "Error fetching products" });
//     }
// };




// export const getProductById = async (req, res) => {
//     try {
//         const { id } = req.params;

//         // 🛑 Validate MongoDB ID
//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(400).json({ success: false, message: "Invalid Product ID" });
//         }

//         const product = await Product.findById(id);

//         if (!product) {
//             return res.status(404).json({ success: false, message: "Product not found in the database." });
//         }

//         res.status(200).json({ success: true, data: product });
//     } catch (error) {
//         console.error("Error fetching product:", error);
//         res.status(500).json({ success: false, message: "Internal Server Error" });
//     }
// };


export const getProductById = async (req, res) => {
    try {
        console.log("Request received for ID:", req.params.id); // Debugging
        const product = await Product.findById(req.params.id);
        if (!product) {
            console.log("Product not found for ID:", req.params.id);
            return res.status(404).json({ message: "Product not found" });
        }
        res.json({ success: true, data: product });
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ message: "Server error" });
    }
};





export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ success: false, message: "Error fetching products" });
    }
};




// export const updateProduct = async (req, res) => {
//     try {
//         const { id } = req.params;
//         let updateData = req.body;

//         // 🔹 Ensure productCode is NOT updated (to avoid duplicate key error)
//         delete updateData.productCode;

//         // ✅ Check if product exists
//         const existingProduct = await Product.findById(id);
//         if (!existingProduct) {
//             return res.status(404).json({ success: false, message: "Product not found" });
//         }

//         // ✅ Update the product safely
//         const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });

//         if (!updatedProduct) {
//             return res.status(400).json({ success: false, message: "Product update failed!" });
//         }

//         res.status(200).json({ success: true, message: "Product updated successfully", data: updatedProduct });
//     } catch (error) {
//         console.error("Update Product Error:", error);
//         res.status(500).json({ success: false, message: "Server Error", error: error.message });
//     }
// };





export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        // ✅ Check if ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid Product ID" });
        }

        let updateData = req.body;
        delete updateData.productCode;

        const existingProduct = await Product.findById(id);
        if (!existingProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });

        res.status(200).json({ success: true, message: "Product updated successfully", data: updatedProduct });
    } catch (error) {
        console.error("Update Product Error:", error);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};








// export const deleteProduct = async (req, res) => {
//     try {
//         const deletedProduct = await Product.findByIdAndDelete(req.params.id);
//         res.status(200).json({ success: true, message: "Product deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Server Error" });
//     }
// };






export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        // ✅ Check if ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid Product ID" });
        }

        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        console.error("Delete Product Error:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

