import {v2 as cloudinary } from "cloudinary";
import productmodel from '../models/productmodel.js'
// function for add products
const addproducts = async (req, res)=>{
    try{
        const {name, description, price, category, subcategory, sizes, bestseller} = req.body;
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1,image2,image3,image4].filter((items)=>items !== undefined)
        
        let imagesurl = await Promise.all(
            images.map(async (item)=>{
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'});
                return result.secure_url;
            })
        );

        const productdata = {
            name,
            description,
            category,
            price: Number(price),
            subcategory,
            bestseller: bestseller === "true"? 'true': 'false',
            sizes: JSON.parse(sizes),
            image: imagesurl,
            date: Date.now()
        }

        console.log(productdata);
        const product = new productmodel(productdata);
        await product.save();

        // console.log(name, description, price, category, subcategory, sizes, bestseller);
        res.json({success: true, message: 'product added'})

    }catch(error){
        console.log(error);
        res.json({success: false, message: error.message})
    }
    
};

// function for lsit products
const listproducts = async (req, res)=>{
    
};

// function for removing products
const removingproducts = async (req, res)=>{
    
};

// function for single product info
const singleproduct = async (req, res)=>{
    
};

export {addproducts, listproducts, removingproducts, singleproduct}