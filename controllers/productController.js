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





export const getAllProducts = async (req, res) => {
    try {
        console.log("Fetching products..."); // 👈 Debug log
        const products = await Product.find();
        console.log("Products Fetched:", products); // 👈 Data print 

        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Error fetching products" });
    }
};




// export const getProductsByCategory = async (req, res) => {
//     try {
//         const { category } = req.params;
//         console.log("Fetching products for category:", category); // ✅ Debugging log

//         if (!category) {
//             return res.status(400).json({ success: false, message: "Category is required" });
//         }

//         const products = await Product.find({ category: { $regex: new RegExp(category, "i") } });
//         console.log("Fetched Products:", products); // ✅ Products console.log() करा

//         if (!products.length) {
//             console.log("No products found for category:", category); // ✅ Logs verify करा
//             return res.status(404).json({ success: false, message: "No products found for this category" });
//         }

//         res.status(200).json({ success: true, data: products });
//     } catch (error) {
//         console.error("Error fetching products by category:", error);
//         res.status(500).json({ success: false, message: "Server Error" });
//     }
// };




export const getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.params;

        // Best Sellers आणि New Arrivals साठी सगळे products पाठवायचे
        if (category.toLowerCase() === "best-sellers" || category.toLowerCase() === "new-arrivals") {
            const allProducts = await Product.find({});
            return res.status(200).json({ success: true, data: allProducts });
        }

        // Other categories साठी filtered products पाठवायचे
        const products = await Product.find({ category: category });

        if (!products.length) {
            return res.status(404).json({ success: false, message: "No products found for this category." });
        }

        res.status(200).json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error." });
    }
};


export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid Product ID" });
        }
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        console.error("Get Product By ID Error:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};




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

