import React, { useState, useEffect } from 'react';
import Menu from '../Menu/Menu';
import { getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Breakfast = () => {
    const [menu, setMenu] = useState([]);

    useEffect(() =>{
        fetch('https://evening-journey-66665.herokuapp.com/items')
        .then(res => res.json())
        .then(data => {
            setMenu(data);
        })
    }, []);

    const breakfastMenu = menu.filter(item => item.category === 'breakfast');

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