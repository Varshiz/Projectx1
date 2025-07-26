import express from "express";
import { addProduct,updateQuantity,getProducts } from "../controllers/product.js";
const router = express.Router();
import { verifytoken,isAdmin } from "../utils/verifytoken.js";


router.post("/products", verifytoken, isAdmin, addProduct);
router.put("/products/:id/quantity", verifytoken, isAdmin, updateQuantity);
router.get("/get", verifytoken, getProducts);

export default router;
