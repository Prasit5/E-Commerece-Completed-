import React from 'react';
import './CSS/shopCategory.css';
import { ShopContext } from '../Components/Context/ShopContext';
import dropDownIcon from '../Components/Assets/dropDown.jpg';
import Item from '../Components/items/item'; // Updated import path for Item component
import dataProduct from '../Components/Assets/data';

export const ShopCategory = (props) => {
  return (
    <div className='shop-Category'>
      <img className='shopCategoryBanner' src={props.banner} alt='' style={{ height: '300px', width: '1000px' }} /> {/* Adjusted size of banner image */}
      <div className='shopCategoryIndexSort'>
        <p>
          <span>Showing 1-12</span>out of 36 products
        </p>
        <div className='shopCategorySort'>
          Sort by <img src={dropDownIcon} alt='' style={{ height: '15px', width: '15px' }} /> {/* Adjusted size of dropDownIcon */}
        </div>
      </div>
      <div className="shopCategoryProducts">
        {dataProduct.map((item, i) => {
          if (props.category === item.category) { // Changed 'Category' to 'category'
            return <Item key={i} id={item.id} name={item.name} image={item.image} newPrice={item.newPrice} oldPrice={item.oldPrice} />;
          } else {
            return null;
          }
        })}
      </div>
      <div className="shopCategoryLoadmore">
        Explore more
      </div>
    </div>
  );
};

export default ShopCategory;
