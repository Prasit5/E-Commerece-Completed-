//ShopContext is neither child component or parent. Its context provider. It provides shared data across whole app. 
//props(properties) is an input(values that cannot be changed)
import React, { createContext, useState} from "react";
import dataProduct from "../Assets/data"

export const ShopContext = createContext(null); //Creates a new context(It stores the data)

const getDefaultCart = ()=>{
    let cart = {};
    for(let index = 0; index < dataProduct.length; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {//Creates a new conmponent which accepts props as an input(It provides the data)
    const [cartItems,setCartItems] = useState(getDefaultCart());
    
    const addToCart = (itemId) => {
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        console.log(cartItems);
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                let itemInfo = dataProduct.find((product)=>product.id===Number(item))
                totalAmount += itemInfo.newPrice * cartItems[item];
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