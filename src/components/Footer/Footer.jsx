import React from 'react'
import "./Footer.css"
import { assets } from '../../assets/assets'

const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-container">
                <div className="footer-content">
                    <div className="footer-content-left">
                        <img 
                            src={assets.niazi_logo_png} 
                            alt="Niazi Food Logo" 
                            style={{ width: '160px' }} 
                        />
                        <p>
                            Niazi Food is your destination for delicious food and a great dining
                            experience. Explore your favourite dishes, order with ease, and enjoy
                            fresh and tasty meals delivered right to your doorstep.
                        </p>
                        <div className="footer-social-icons">
                            <img src={assets.facebook_icon} alt="Facebook" />
                            <img src={assets.twitter_icon} alt="Twitter" />
                            <img src={assets.linkedin_icon} alt="LinkedIn" />
                        </div>
                    </div>

                    <div className="footer-content-center">
                        <h2>COMPANY</h2>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Delivery</a></li>
                            <li><a href="/privacy">Privacy Policy</a></li>
                        </ul>
                    </div>

                    <div className="footer-content-right">
                        <h2>Get In Touch</h2>
                        <ul>
                            <li>+92 301 2526578</li>
                            <li>sami262578@gmail.com</li>
                        </ul>
                    </div>
                </div>

                <hr />
                <p className="footer-copyright">© 2026 Niazi.com — All Rights Reserved.</p>
            </div>
        </div>
    )
}

export default Footer