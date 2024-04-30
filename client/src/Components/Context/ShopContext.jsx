//ShopContext is neither child component or parent. Its context provider. It provides shared data across whole app. 
//props(properties) is an input(values that cannot be changed)

import React, { createContext, useEffect, useState} from "react";


export const ShopContext = createContext(null); //Creates a new context(It stores the data)

const getDefaultCart = ()=>{
    let cart = {};
    for(let index = 0; index < 300+1; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {//Creates a new conmponent which accepts props as an input(It provides the data)

    const [dataProduct, setDataProduct] = useState([]);
    const [cartItems,setCartItems] = useState(getDefaultCart());

    useEffect(() => {
        fetch("http://localhost:4000/allproducts")
          .then((response) => response.json())
          .then((data) => setDataProduct(data));

          if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/getcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body: JSON.stringify(),
            }).then((response)=>response.json())
            .then((data)=>setCartItems(data));
          }
      }, []);
    
    const addToCart = (itemId) => {
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/addtocart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data));
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/removefromcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data));
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                let itemInfo = dataProduct.find((product)=>product.id===Number(item))
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = () =>{
        let totalItem = 0;
        for(const item in cartItems)
        {
            if(cartItems[item] >0)
            {
                totalItem+=cartItems[item];
            }
        }
        return totalItem;
    }

    const contextValue = {getTotalCartItems, getTotalCartAmount, dataProduct, cartItems, addToCart, removeFromCart}
    
    //specify where render the jsx
    return(//Provide distribute the data
        <ShopContext.Provider value = {contextValue}> 
            {props.children}
        </ShopContext.Provider>
    )
}


export default ShopContextProvider;