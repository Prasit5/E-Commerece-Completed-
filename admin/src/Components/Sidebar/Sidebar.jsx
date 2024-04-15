import React from 'react'
import './Sidebar.css'
import {Link} from 'react-router-dom'
import addProduct from '../../assets/addproduct.png'
import listProduct from '../../assets/listproduct.png'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <Link to={'/addproduct'} style={{textDecoration:"none"}}>
            <div className="sidebar-item">
                <img src = {addProduct} alt='' width="71px" height="71px" />
                <p>Add Product</p>
            </div>
        
        </Link>
        <Link to={'/listproduct'} style={{textDecoration:"none"}}>
            <div className="sidebar-item">
                <img src = {listProduct} alt='' width="71px" height="71px"/>
                <p>List Product</p>
            </div>
        
        </Link>
    </div>
  )
}

export default Sidebar