import React, { useState, useEffect } from 'react';
import './NewCollections.css';
import Item from '../items/item';

export const NewCollections = () => {

  const [new_collection,setNew_collection] = useState([]);

  useEffect(()=>{
    fetch('https://server-6o7b.onrender.com/newcollections')
    .then((response)=>response.json())
    .then((data)=>setNew_collection(data));
  },[])

  return (
    <div className='NewCollections'>
        <h1>NEW COLLECTIONS</h1>
        <hr/>
        <div className="collections">
            {new_collection.map((item,i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} newPrice={item.new_price} oldPrice={item.old_price} />
            })}
        </div>
    </div>
  );
};

export default NewCollections;
