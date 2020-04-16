import React from 'react';
import foodMenus from '../../FoodMenus';
import Menu from '../Menu/Menu';
import { getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Breakfast = () => {
    const breakfastMenu = foodMenus.slice(12, 18);

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
                    breakfastMenu.map(menu => menu.id >= 13 && menu.id <= 15 ? <Menu key={menu.id} menu={menu}></Menu> : '')
                }
            </div>
            <div className='lastThree'>
                {
                    breakfastMenu.map(menu => menu.id >= 16 && menu.id <= 18 ? <Menu key={menu.id} menu={menu}></Menu> : '')
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

export default Breakfast;