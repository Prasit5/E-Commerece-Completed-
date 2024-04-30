import React, { useContext } from 'react'
import './ProductDisplay.css'
import starIcon from '../Assets/starIcon.png'
import starDullIcon from '../Assets/starDullIcon.png'
import { ShopContext } from '../Context/ShopContext'

export const ProductDisplay = (props) => {
    const {product} = props;
    const {addToCart} = useContext(ShopContext);
  return (
    <div className='productDisplay'>
                <div className="productDisplayLeft">
                    <div className="productDisplayImgList">
                    <img src={product.image} alt=''  /> 
                    <img src={product.image} alt=''  />
                    <img src={product.image} alt='' />
                    <img src={product.image} alt=''  />
                    </div>
                    <div className="productDisplayImg">
                    <img className='productDisplayMainImg' src={product.image} alt='' />
                </div>
        </div>
        <div className="productDisplayRight">
            <h1>{product.name}</h1>
            <div className="productDisplayRightStar">

                <img src={starIcon} alt='' style={{ width: '10px', height: '10px' }} />
                <img src={starIcon} alt='' style={{ width: '10px', height: '10px' }} />
                <img src={starIcon} alt='' style={{ width: '10px', height: '10px' }} />
                <img src={starIcon} alt='' style={{ width: '10px', height: '10px' }} />
                <img src={starDullIcon} alt='' style={{ width: '10px', height: '10px' }} />
                <p>(122)</p>
            </div>
            <div className="productDisplayRightPrices">
                <div className="productDisplayRightPriceOld">
                    ${product.old_price}
                </div>
                <div className="productDisplayRightPriceNew">
                    ${product.new_price}
                </div>
            </div>
                <div className="productDisplayRightDescription">
                    a light weight , sufljbv;fjlnvdf;ljnv ; kjf nbv;sdjfnbv f;oindfobvn d;kjjfnbshjvbsv df;kjvbds;fjb  df;ojbvdf;ljbv 
                </div>
                <div className="productDisplayRightSize">
                    <h1>Select Size</h1>
                    <div className="productDisplayRightSizes">
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                        <div>XXL</div>
                    </div>
                </div>
                <button onClick={()=>{addToCart(product.id)}}>ADD TO CART</button>
                <p className='productDisplayRightCategory'><span>Category: </span>Women, T-Shirt, Crop Top</p>
                <p className='productDisplayRightCategory'><span>Tags: </span>Modern, Latest</p>
            </div>
        </div>
  )
}

export default ProductDisplay