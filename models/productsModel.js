// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     productCode: { type: String, required: true, unique: true },
//     category: { type: String, required: true, enum: [
//         "Best Sellers", "New Arrivals", "Coins & Bars", "Coin Pendants", 
//         "Silver Coins", "Gold Jhumka", "Rings", "Bangles", "Earrings", 
//         "Mangalsutra", "Gold Chains","Bracelets","Necklace","Chain"
//     ] },
//     metalType: { type: String, required: true, enum: ["Gold", "Silver", "Platinum"] },
//     goldColor: { type: String, required: true, enum: ["Yellow", "White", "Rose","Two-Tone","Silver"] },
//     weight: { type: Number, required: true },
//     price: { type: Number, required: true },
//     priceBreakup: {
//         goldPrice: { type: Number, required: true },
//         makingCharge: { type: Number, required: true },
//         tax: { type: Number, required: true },
//     },
//     availability: { type: String, required: true, enum: ["In stock", "Out of stock", "Make To Order"] },
//     images: [{ type: String, required: true }],
//     description: { type: String },
//     createdAt: { type: Date, default: Date.now },
// });

// const Product = mongoose.model("Product", productSchema);
// export default Product;










// productsModel.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    productCode: { type: String, required: true, unique: true },
    category: { type: String, required: true, enum: [
        "Best Sellers", "New Arrivals", "Coins & Bars", "Coin Pendants", 
        "Silver Coins", "Gold Jhumka", "Rings", "Bangles", "Earrings", 
        "Mangalsutra", "Gold Chains","Bracelets","Necklace","Chain"
    ] },
    metalType: { type: String, required: true, enum: ["Gold", "Silver", "Platinum"] },
    goldColor: { type: String, required: true, enum: ["Yellow", "White", "Rose","Two-Tone","Silver"] },
    weight: { type: Number, required: true },
    price: { type: Number, required: true },
    priceBreakup: {
        goldPrice: { type: Number, required: true },
        makingCharge: { type: Number, required: true },
        tax: { type: Number, required: true },
    },
    availability: { type: String, required: true, enum: ["In stock", "Out of stock", "Make To Order"] },
    images: [{ type: String, required: true }],
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
