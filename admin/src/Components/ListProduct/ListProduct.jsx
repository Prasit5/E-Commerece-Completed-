import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cart.png'

const ListProduct = () => {

      const[allproducts, setAllproducts] = useState([]);//The first value is used to store the product, second one is used to tore the updated product

      const fetchInfo = async () =>{//So what this fetchInfo function does is it async and await must be used together to wait for 
        //user to click on the button then the link will be called. Then accept response in json format and 
        //displayy data in setallproduct variubale
        await fetch('https://server-6o7b.onrender.com/allproducts')
        .then((res)=>res.json())
        .then((data)=>{setAllproducts(data)});
      }

      useEffect(()=>{
        fetchInfo();
      },[])

      const remove_product = async (id)=>{
        await fetch('https://server-6o7b.onrender.com/removeproduct', {
          method:'POST',
          headers:{
            Accept:'application/json',
            'Content-type': 'application/json'
          },
          body:JSON.stringify({id:id})
        })
        await fetchInfo();
      }

  return (
    <div className='listproduct'>
        <h1>All Products Lists</h1>
        <div className="listproduct_format_main">
          <p>Products</p>
          <p>Title</p>
          <p>Old Price</p>
          <p>New Price</p>
          <p>Category</p>
          <p>Remove</p>
        </div>

        <div className="listproduct_allproducts">
          <hr/>
          {allproducts.map((product,index)=>{
            return <><div key={index} className="listproduct_format_main listproduct_format">
                <img src={product.image} alt="" className="listproduct_product_icon"/>
                <p>{product.name}</p>
                <p>${product.old_price}</p>
                <p>${product.new_price}</p>
                <p>{product.category}</p>
                <img onClick={()=>{remove_product(product.id)}} src={cross_icon} alt="" className="listproduct_remove_icon" width="50px" height="50px"/>
            </div>
            <hr/></>
        })}
      </div>
    </div>
  )
};



export default ListProduct