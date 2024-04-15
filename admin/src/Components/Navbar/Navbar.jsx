import React from 'react'
import './Navbar.css'
import navLogo from '../../assets/logo.png'
import navProfile from '../../assets/admin.jpg'

const Navbar = () => {
  return (
    <div className='navbar'>
            <img src={navLogo} alt='' className='nav-logo' width="100px" height="100px"/>
                <div className='nav-text'>
                    <span className='header'>Shopper</span> <br/> 
                    <span className='sub-header'>Admin Panel</span>
                </div>
            <img src={navProfile} alt='' className='nav-profile' width="100px" height="100px"/>
    </div>
  )
}

export default Navbar