import React from 'react';
import './Footer.css';
import img1 from '../../Image/footer1.png';
import img2 from '../../Image/footer2.png';
import img3 from '../../Image/footer3.png';
import img4 from '../../Image/bottom_img.png';

const Footer = () => {
    return (
        <div className="footer-container">
            <div className="top-footer">
                <h1>Why You Choose Us</h1>
            </div>
            <div className="mid-footer">

                <div>
                    <img src={img1} alt=""/>
                    <h3>Fast Delivery</h3>
                </div>
                <div>
                    <img src={img2} alt=""/>
                    <h3>Quick Response</h3>
                </div>
                <div>
                    <img src={img3} alt=""/>
                    <h3>Home Delivery</h3>
                </div>
                
            </div>
            <div className="bottom-footer">
                <img src={img4} alt=""/>
            </div>
            
        </div>
    );
};

export default Footer;