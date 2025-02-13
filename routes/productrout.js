import express from 'express';

import {addproducts, listproducts, removingproducts, singleproduct} from '../controllers/productcontroller';
const productrouter = express.Router();

productrouter.post('/add', addproducts);
productrouter.post('/remove', removingproducts);
productrouter.post('/single', singleproduct);
productrouter.get('/list', listproducts);

