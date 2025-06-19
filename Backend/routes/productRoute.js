import express from 'express'
import { listProducts, addProduct, removeProduct, singleProduct } from '../controllers/productController.js'
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const productRouter = express.Router();

// Test endpoint to check if multer is working
productRouter.post('/test-upload', upload.single('image1'), (req, res) => {
    console.log('=== TEST UPLOAD DEBUG ===');
    console.log('req.file:', req.file);
    console.log('req.files:', req.files);
    console.log('req.body:', req.body);
    console.log('Content-Type:', req.headers['content-type']);
    console.log('req.headers:', req.headers);
    console.log('========================');
    res.json({
        success: true,
        message: 'Test upload endpoint',
        hasFile: !!req.file,
        body: req.body,
        contentType: req.headers['content-type']
    });
});

productRouter.post('/add',adminAuth,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]) ,addProduct);
productRouter.post('/remove',adminAuth, removeProduct);
productRouter.post('/single',singleProduct);
productRouter.get('/list',listProducts);

export default productRouter;
