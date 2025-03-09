// import express from "express";
// import multer from "multer";
// import path from "path";
// import { 
//     createProduct, 
//     getAllProducts, 
//     getProductById, 
//     updateProduct, 
//     deleteProduct,
//     getProductsByCategory
// } from "../controllers/productController.js";

// const router = express.Router();

// // 📂 Multer Storage Configuration
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads/"); 
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname));
//     },
// });

// const upload = multer({ storage });

// router.post("/", upload.array("images", 5), createProduct);
// router.get("/", getAllProducts);
// router.get("/:id", getProductById);
// router.put("/:id", upload.array("images", 5), updateProduct);
// router.delete("/:id", deleteProduct);


// router.get("/category/:category", getProductsByCategory);



// export default router;





import express from "express";
import multer from "multer";
import path from "path";
import { createProduct, getAllProducts, updateProduct, deleteProduct,getProductById } from "../controllers/productController.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

router.post("/", upload.array("images", 5), createProduct);
router.get("/", getAllProducts);
router.put("/:id", upload.array("images", 5), updateProduct);
router.delete("/:id", deleteProduct);
router.get("/:id", getProductById);

export default router;