const port = 4000;
const express = require("express");/*Initializing Dependency*/
const app = express();/*Creatiing an instance, if we dont create then we wont be able to utilize its function*/
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");//to store images
const path = require("path");/*We can get acccess to backend directory*/
const cors = require("cors");


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
                let last_product_array = products.slice(-1);
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

//Shema creating for users

const Users = mongoose.model('Users', {
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

// Creating endpoint for registering the user

app.post('/signup', async (req,res)=>{
    let check = await Users.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success:false, errors:"User already exist"})
    }
    let cart = {};
    for(let i =0; i<300;i++){
        cart[i]=0;
    }
    const user = new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    }) 

    await user.save();

    const data = {
        user:{
            id:user.id
        }
    }

    const token = jwt.sign(data, 'secret_ecom');
    res.json({success:true,token})
})

//creating endpoint for user login
app.post('/login', async(req,res)=>{
    let user = await Users.findOne({email:req.body.email});
    if(user){
        const passCompare = req.body.password === user.password
        if(passCompare){
            const data = {
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom');
            res.json({success:true,token});
        }
        else{
            res.json({success:false,errors:"Wrong Password"});
        }
    }
    else{
        res.json({success:false, errors:"Wrong email id"})
    }
})
//creating endpoint for new collection data
app.get('/newcollections', async(req, res)=>{
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("New collection fetched");
    res.send(newcollection);

})

//Creating endpoint for popular in women section
app.get('/popularinwomen', async(req, res)=>{
    let products = await Product.find({category:"women"});
    let popular_in_women = products.slice(0,4);
    console.log("Popular in women fetched");
    res.send(popular_in_women);
})

//creating middleware for fetch user
const fetchUser = async (req,res,next)=>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({errors:"Please authenticate using validate token"})
    }
    else{
        try{
            const data = jwt.verify(token,'secret_ecom');
            req.user = data.user;
            next();
        }catch (error){
            res.status(401).send({errors:"Please authenticate using validate token"})
        }
    }
}

//Creating endpoint for adding products in cartdata
// Creating endpoint for adding products in cartdata
app.post('/addtocart',fetchUser, async (req, res) => {
	console.log("Add Cart");
    let userData = await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id:req.user.id}, {cartData:userData.cartData});
    res.send("Added")
})

  //Create an endpoint for saving the product in cart
app.post('/removefromcart',fetchUser, async (req, res) => {
	console.log("Remove Cart");
    let userData = await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]!=0)
    {
      userData.cartData[req.body.itemId] -= 1;
    }
    await Users.findOneAndUpdate({_id:req.user.id}, {cartData:userData.cartData});
    res.send("Removed");
  })

//creating endpoint to get cartData
app.post('/getcart',fetchUser, async (req, res) => {
    console.log("Get Cart");
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
  
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