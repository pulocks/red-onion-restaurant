import React from 'react';
import './Header.css';
import logo from '../../logo.png';
import icon from '../../ICON/Path 1.png';

const Header = () => {
    return (
        <div className="header">

            <div className="header-top">

                <div className="logo">
                    <img src={logo} alt=""/>
                </div>
                <div className="link">
                    <nav>
                        <a href="/review"><img src={icon} alt=""/></a>
                        <a href="/login">Login</a>
                    </nav>
                </div>

            </div>
            <div className="header-mid">
                <h1>Best food waiting for your belly</h1>
            </div>
            <div className="header-bottom">
                <nav>
                    <a href="/breakfast">Breakfast</a>
                    <a href="/lunch">Lunch</a>
                    <a href="/dinner">Dinner</a>
                </nav>

            </div>
            
        </div>
    );
};

export default Header;