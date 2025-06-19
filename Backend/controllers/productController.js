import { v2 as cloudinary } from 'cloudinary';
import productModel from '../models/productModel.js';


//function for add product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        // Debug: Log all received data
        console.log("Full req.body:", req.body);
        console.log("Full req.files:", req.files);
        console.log("req.files type:", typeof req.files);
        console.log("req.files keys:", req.files ? Object.keys(req.files) : 'no files');
        console.log("Extracted data:", { name, description, price, category, subCategory, sizes, bestseller });

        // Validate required fields
        if (!name || !description || !price || !category || !subCategory || !sizes) {
            return res.json({
                success: false,
                message: "Missing required fields. Please provide: name, description, price, category, subCategory, sizes"
            });
        }

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        console.log("Image variables:", { image1: !!image1, image2: !!image2, image3: !!image3, image4: !!image4 });

        // Check if at least one image is uploaded
        if (!image1 && !image2 && !image3 && !image4) {
            return res.json({
                success: false,
                message: "At least one image is required. Please upload at least one product image."
            });
        }

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        let imagesUrl = [];
        if (images.length > 0) {
            imagesUrl = await Promise.all(
                images.map(async (item) => {
                    // Convert buffer to base64 for Cloudinary upload
                    const b64 = Buffer.from(item.buffer).toString("base64");
                    let dataURI = "data:" + item.mimetype + ";base64," + b64;
                    console.log("Uploading image:", dataURI);
                    let result = await cloudinary.uploader.upload(dataURI, { resource_type: 'image' });
                    return result.secure_url
                })
            )
        } else {
            // If no images uploaded, use a default placeholder or empty array
            console.log("No images uploaded, proceeding without images");
        }

        // Parse sizes safely
        let parsedSizes;
        try {
            parsedSizes = JSON.parse(sizes);
        } catch (error) {
            // If JSON.parse fails, treat it as a single size or split by comma
            parsedSizes = Array.isArray(sizes) ? sizes : sizes.split(',').map(s => s.trim());
        }

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            sizes: parsedSizes,
            image: imagesUrl,
            date: Date.now()
        }

        console.log("Product data to save:", productData);

        const product = new productModel(productData)
        console.log("Product model created, attempting to save...");

        const savedProduct = await product.save()
        console.log("Product saved successfully:", savedProduct._id);

        res.json({ success: true, message: "Product added successfully", productId: savedProduct._id })

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})

    }
}

//function for list product
const listProducts = async (req, res) => {
    try{
        const products = await productModel.find({})
        res.json({success:true,products})
    } catch (error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//function for remove product
const removeProduct = async (req, res) => {
    try{
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Product removed successfully"})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//function for single product info
const singleProduct = async (req, res) => {
    try{
        const { productId } =  req.body
        const product = await productModel.findById(productId)
        res.json({success:true,product})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}



export { listProducts, addProduct, removeProduct, singleProduct }

