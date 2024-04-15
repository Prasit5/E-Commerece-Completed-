import React from 'react';
import './NewCollections.css';
import newCollections from '../Assets/newCollections';
import Item from '../items/item';

export const NewCollections = () => {
  return (
    <div className='NewCollections'>
        <h1>NEW COLLECTIONS</h1>
        <hr/>
        <div className="collections">
            {newCollections.map((item,i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} newPrice={item.newPrice} oldPrice={item.oldPrice} />
            })}
        </div>
    </div>
  );
};

export default NewCollections;
