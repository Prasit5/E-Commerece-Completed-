
import React from 'react';
import Home from '../Components/Home/Home'
import Popular from '../Components/Popular/popular';
import Offers from '../Components/Offers/Offers';
import NewCollections from '../Components/NewCollections/NewCollections';
import NewsLetter from '../Components/NewsLetter/NewsLetter';

const Shop = () => {
  return (
    <div>
      <Home/>
      <Popular/>
      <Offers/>
      <NewCollections/>
      <NewsLetter/>
    </div>
  );
};

export default Shop;
