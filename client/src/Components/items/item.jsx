import React from 'react'
import './item.css'
import {Link} from 'react-router-dom'
export const Item = (props) => {
  return (
    <div className='item'>
        <Link to={`/product/${props.id}`}><img onClick={window.scroll(0,0)}src={props.image} alt="" /></Link> 
        <p>{props.name}</p>
        <div className="itemPrices">
            <div className="itemPricesNew">
                ${props.newPrice}
            </div>
            <div className="itemPricesOld">
            ${props.oldPrice}
            </div>
        </div>
    </div>
  )
}

export default Item;
