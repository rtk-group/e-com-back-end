import express from 'express';

import {addproducts, listproducts, removingproducts, singleproduct} from '../controllers/productcontroller.js';
import upload from '../middleware/multer.js';
const productrouter = express.Router();

productrouter.post('/add',upload.fields([{name:'image1', maxCount:1},{name:'image2', maxCount:1},{name:'image3', maxCount:1},{name:'image4', maxCount:1}]), addproducts);
productrouter.post('/remove', removingproducts);
productrouter.post('/single', singleproduct);
productrouter.get('/list', listproducts);

export default productrouter;
