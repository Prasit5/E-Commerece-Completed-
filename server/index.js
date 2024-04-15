const port = 4000;
const express = require("express");/*Initializing Dependency*/
const app = express();/*Creatiing an instance, if we dont create then we wont be able to utilize its function*/
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");/*We can get acccess to backend directory*/
const cors = require("cors");
const { error } = require("console");
const { request } = require("http");
const { type } = require("os");

app.use(express.json());/*All the request will pass through json, make sure all request comes throughj JSON format*/
app.use(cors());/*Its like secured bridge between frontend and backend*/


// Databae Connection with MongoDB 
mongoose.connect("mongodb+srv://pdol1:sQmhlPMDIO6F15u4@cluster0.tshks1t.mongodb.net/e-commerce")

//API Creation
app.get("/",(req,res)=>{//SO when we call app.get. it will call app express instance which is app. 
                        //And it will send a GET request(in req box) and it will send the web browser to client as requested.
                        //THe information will come in res, for client in HTTP. 
    res.send("Express App is running")
});

//Schema for creating product

const Product = mongoose.model("Product", {
    id:{
        type: Number,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    image:{
        type:String,
        required: true,
    },
    category:{
        type:String,
        required:true,
    },
    new_price:{
        type: Number,
        required: true,
    },
    old_price:{
        type: Number,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now,
    },
    available:{
        type:Boolean,
        default:true,
    },
})

app.post('/addProduct', async (req,res)=>{
    let products = await Product.find({});//find all the prodict and stores it in products array
    let id;
            if(products.length>0){
                let last_product_array = products.slice(+1);
                let last_product = last_product_array[0];
                id = last_product.id+1;//Increment +1 with the last product saved
            }
            else{
                id=1;
            }
    const product = new Product({
        id: id,//Requesting from body because all the data saved is in body
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    })
    console.log(product)
    await product.save();
    console.log("Saved");
    res.json({
        success:true,
        name:req.body.name,
    })
})

//Creating API for deleting product

app.post('/removeproduct', async (req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success:true,
        name:req.body.name
    })
})

//Creating API for using all products
app.get('/allproducts', async (req,res)=>{
    let products = await Product.find({})//Get all the products and store
    console.log("All products fetched");
    res.send(products);
})

app.listen(port,(error)=>{ //callback function. Once the port is running it will execute after port
    if(!error){
        console.log("Server Running on port" + port)
    }
    else{
        console.log("Error: " + port)
    }
});

//Image storage engine(Just like refrigerator)

const storage = multer.diskStorage({//configration: set of instructioms. Each time new request made we need to follow this
    destination: './upload/images',
    filename:(req,file,cb)=>{//include this everytime using diskstorage as it expects it everytime.
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);//file format
    }
})

const upload = multer({storage:storage})//iniializing to tellmulter to use this=ese instruction each time

//creating upload endpoint for images
app.use('/images', express.static('upload/images'))//creates pathway. When user request for images in server, express will know where it can find
app.post("/upload", upload.single('product'), (req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })//so the diefffrence is app.post the user need to make request and app.use doesnt need

})