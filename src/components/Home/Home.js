import React from 'react';
import './Home.css';
import foodMenus from '../../FoodMenus';
import Menu from '../Menu/Menu';
import { getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Home = () => {

    const lunchMenu = foodMenus.slice(0, 6);

    const savedCart = getDatabaseCart();
    const empty = isEmpty(savedCart);

    function isEmpty(obj) {
        for(let prop in obj) {
            if(obj.hasOwnProperty(prop))
                return false;
        }
    
        return true;
    }

    return (
        <div className="menu-container">
            <div className="firstThree">
                {
                    lunchMenu.map(menu => menu.id >= 1 && menu.id <= 3 ? <Menu key={menu.id} menu={menu}></Menu> : '')
                }
            </div>
            <div className='lastThree'>
                {
                    lunchMenu.map(menu => menu.id >= 4 && menu.id <= 6 ? <Menu key={menu.id} menu={menu}></Menu> : '')
                }
            </div>
            {
                !empty && <Link to="/login">
                    <button className="checkout-button">Checkout Food</button>
                </Link>  
            }
             
            
        </div>
    );
};

export default Home;