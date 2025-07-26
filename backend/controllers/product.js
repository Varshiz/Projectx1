import { Product } from "../models/product.js";
import cloudinary from "../utils/cloudinary.js";



const uploadToCloudinary=async(filePath)=>{
    try {
        const result=await cloudinary.uploader.upload(filePath,{
            resource_type:"auto"
        })
        
        return result.secure_url;
    } catch (error) {
        
        throw new Error("Error uploading to cloudinary");
    }
}

export const addProduct = async (req, res) => {
  try {
    const {
      name,
      type,
      sku,
      description,
      quantity,
      price
    } = req.body;

    
    if (!name || !type || !sku || !description || !quantity || !price || !req.files?.image) {
      return res.status(400).json({ error: "All fields are required including image." });
    }

    
    const imageFile = req.files.image;
    const imageUrl = await uploadToCloudinary(imageFile.tempFilePath);

    
    const product = await Product.create({
      name,
      type,
      sku,
      description,
      quantity,
      price,
      image_url: imageUrl
    });

    return res.status(201).json({ product_id: product._id });
  } catch (e) {
    console.error("Add Product Error:", e.message);
    res.status(500).json({ error: "Failed to add product." });
  }
};


export const updateQuantity = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { quantity: req.body.quantity },
      { new: true }
    );
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

export const getProducts = async (req, res) => {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;
  const skip = (page - 1) * limit;

  try {
    const products = await Product.find().skip(skip).limit(limit);
    res.json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
