// In productroute.js
import express from 'express';
// Change 'removeProduct0' to 'removeProduct' here:
import { addProduct, listProduct, removeProduct, singleProduct} from '../controllers/productController.js'
import upload from '../middleware/multer.js';

const productRouter= express.Router();
productRouter.post('/add',upload.fields([{name:'Image1', maxCount:1}, {name:'Image2', maxCount:1},{name:'Image3', maxCount:1},{name:'Image4', maxCount:1}, ]), addProduct);
productRouter.post('/remove',removeProduct);
productRouter.post('/single',singleProduct);
productRouter.post('/list',listProduct);



 


export default productRouter