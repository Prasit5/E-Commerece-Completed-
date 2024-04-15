import React from 'react'
import './RelatedProducts.css'
import data_product from '../Assets/popular'
import Item from '../items/item'

export const RelatedProducts = () => {
  return (
    <div className='relatedProduct'>
        <h1>Related Products</h1>
        <hr/>
        <div className='relatedproducts-item'>
            {data_product.map((item, i)=> {
                return <Item key={i} id={item.id} name={item.name} image={item.image} newPrice={item.newPrice} oldPrice={item.oldPrice}/>
            })}
        </div>

    </div>
  )
}

export default RelatedProducts
