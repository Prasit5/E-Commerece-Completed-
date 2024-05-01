import React, { useState } from 'react'
import './AddProduct.css'
import upload from '../../assets/upload_area.svg'

const AddProduct = () => {

      const [image,setImage] = useState(false);// False means there is no image selected
      const [productDetails, setProductDetails] = useState ({//use state is like checklist completed. UseState is specially designed for managing state in functional componenet which functions cant do.
        name:"",//name is empty string. productDetails is an object which is used to store. When we need to update productDetails we call setProductDetails
        image:"",
        category:"women",
        new_price:"",
        old_price:""

      })
      const imageHandler = (e) =>{//retrrievs the first file selected by the user(So e is parameter thst stores the event that occured)
        setImage(e.target.files[0]);
      }
      const changeHandler = (e) => {//so it collects the data of product details and its value
        setProductDetails({...productDetails,[e.target.name]:e.target.value})
      }
      const Add_Product = async ()=>{//asnyc means wait for user response
        console.log(productDetails);
        let responseData;
        let product = productDetails;

        let formData = new FormData; // Create a new FormData object to store form data
        formData.append('product', image);//Append the selected image to the FormData object with the key 'product'

        //the purpose of this code is how server will respond when user upload image,
        await fetch ('https://server-6o7b.onrender.com/upload', {
          method:'POST',
            headers:{
              Accept:'application/json' //only accept json format
            },
            body:formData,//We typically use formdata to store images
        }).then((resp) => resp.json()).then((data)=>{responseData=data})//1. convert the response from server in json format 2. accept the json  3. assign it to variables
        if(responseData.success)
        {
            product.image = responseData.image_url;
            console.log(product);
            await fetch('https://server-6o7b.onrender.com/addproduct', {
              method:'POST',
              headers:{
                Accept:'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(product),
            }).then((resp)=>resp.json()).then((data)=>{
              data.success?alert("Product Added"):alert("Failed")
            })
        }
      }


      return (
        <div className='addproduct'>
            <div className="addproduct_itemfield">
              <p>Product title</p>
              <input value={productDetails.name} onChange={changeHandler} type='text' name='name' placeholder='Type here' />
            </div>

            <div className="addproduct_price">
              <div className="addproduct_itemfield">
                <p>Price</p>
                <input value={productDetails.old_price} onChange={changeHandler} type='text' name='old_price' placeholder='Type here' />
              </div>
              <div className="addproduct_itemfield">
                <p>Offer Price</p>
                <input value={productDetails.new_price} onChange={changeHandler} type='text' name='new_price' placeholder='Type here' />
              </div>
            </div>

            <div className="addproduct_itemfieldd">
              <p>Product Category</p>
              <select value={productDetails.category} onChange={changeHandler} name='category' className='add_product_selector'>
                <option value="women">Women</option>
                <option value="men">men</option>
                <option value="kids">Kids</option>
              </select>
            </div>

            <div className="addproduct_itemfield">
              <label htmlFor='file_input'>
                <div className='addproduct_thumbnail_container'>
                  <img src={image?URL.createObjectURL(image):upload} className='addproduct_thumbnail_img' alt='' width="90px"/>
                  <input onChange={imageHandler} type='file' name='image' id='file_input' hidden />
                </div>
              </label>
                  <button onClick={()=>{Add_Product()}} className='addproduct_btn'>ADD</button>
            </div>
        </div>
  )
}

export default AddProduct