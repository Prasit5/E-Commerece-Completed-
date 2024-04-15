import React from 'react'
import './Breadcrum.css'
import arrowIcon from '../Assets/breadcum.png'

export const Breadcrum = (props) => {
    const {product} = props;
  return (
    <div>
    <div className='breadcum'>
     HOME <img src={arrowIcon} alt='' style={{ width: '25px', height: '25px' }}/> SHOP <img src={arrowIcon} alt='' style={{ width: '25px', height: '25px' }} /> <img src={arrowIcon} alt='' style={{ width: '25px', height: '25px' }} /> {product.name}
    </div>
    </div>
  )
  
}

export default Breadcrum
