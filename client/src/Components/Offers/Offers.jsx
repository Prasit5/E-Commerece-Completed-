import React from 'react'
import './Offers.css'
import excluive from '../Assets/exclusive.jpeg'
export const Offers = () => {
  return (
    <div className='Offers'>
        <div className="offers-left">
          <h1>Exclusive</h1>
          <h1>Offers For you</h1>
          <p>ONLY ON BEST SELLERS PRODUCTS</p>
          <button>Check now</button>
        </div>
        <div className="offers-right">
          <img src={excluive} alt=''></img>
        </div>
    </div>
  )
}

export default Offers