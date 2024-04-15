import React from 'react'
import './popular.css'
import popularProduct from '../Assets/popular'
import Item from '../items/item'
const Popular = () => {
  return (
    <div className='popular'>
        <h1>POPULAR IN WOMEN</h1>
        <hr/>
        <div className="popularItem">
            {popularProduct.map((item,i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} newPrice={item.newPrice} oldPrice={item.oldPrice}/>
            })}
        </div>
    </div>
  )
}

export default Popular;
