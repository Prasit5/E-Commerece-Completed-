import React from 'react'
import './Footer.css'
import footerLogo from '../Assets/footerLogo.png'
import instagramIcon from '../Assets/instagram.png'
import pinterestIcon from '../Assets/pinterest.png'
import whatsappIcon from '../Assets/whatsapp.png'
export const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-logo">
            <img src={footerLogo} alt=''/>
            <p>SHOPPER</p>
        </div>
        <ul className='footerLinks'>
            <li>Company</li>
            <li>Products</li>
            <li>Offices</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
        <div className="footerSocialsIcon">
            <div className="footersIconsContainer">
                <img src={instagramIcon} alt='' />
            </div>
            <div className="footersIconsContainer">
                <img src={pinterestIcon} alt='' />
            </div>
            <div className="footersIconsContainer">
                <img src={whatsappIcon} alt='' />
            </div>
        </div>
        <div className="footerCopyright">
            <hr/>
            <p>Copyright @ 2023 - All rights reserved</p>
        </div>
    </div>
  )
}
export default Footer;
