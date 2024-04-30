import React, { useContext, useRef, useState } from 'react';
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart from '../Assets/carts.png'
import { Link } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import nav_dropDown from '../Assets/dropDown.jpg';
const Navbar = () => {
    const [menu, setMenu] = useState("Shop");
    const {getTotalCartItems}= useContext(ShopContext);
    const menuRef = useRef();

    const dropdown_toggle =(e) =>{
      menuRef.current.classList.toggle('nav-menu-visible');
      e.target.classList.toggle('open');
    }
  return (
    <div className='navbar'>
      <div className='navLogo'>
        <img src={logo} alt='' className='logoImage' />
        <p>SHOP NOW</p>
      </div>

      <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropDown} alt='' width='100px' height='100px'/>
      <ul ref={menuRef} className='navMenu'>
        <li onClick={()=>{setMenu("shop")}}><Link style={{textDecoration: 'none'}} to='/'>Shop</Link>{menu==="shop"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("mens")}}><Link style={{textDecoration: 'none'}} to='/mens'>Men</Link>  {menu==="mens"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("womens")}}><Link style={{textDecoration: 'none'}} to='/womens'>Women</Link>{menu==="womens"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("kids")}}><Link style={{textDecoration: 'none'}} to='/kids'>Kids</Link>{menu==="kids"?<hr/>:<></>}</li>
      </ul>
      <div className='navLogin'>
        {localStorage.getItem('auth-token')
        ?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>
        :<Link to='/login'><button>Login</button></Link>}
        
        <Link to='/cart'><img src={cart} alt='' className='logoCart' /></Link>
        <div className='navCartCount'>{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
