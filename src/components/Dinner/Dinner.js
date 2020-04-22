import React, { useState, useEffect } from 'react';
import Menu from '../Menu/Menu';
import { getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Dinner = () => {
    const [menu, setMenu] = useState([]);

    useEffect(() =>{
        fetch('https://evening-journey-66665.herokuapp.com/items')
        .then(res => res.json())
        .then(data => {
            setMenu(data);
        })
    }, []);

    const dinnerMenu = menu.filter(item => item.category === 'dinner');

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
                    dinnerMenu.map(menu => menu.id >= 7 && menu.id <= 9 ? <Menu key={menu.id} menu={menu}></Menu> : '')
                }
            </div>
            <div className='lastThree'>
                {
                    dinnerMenu.map(menu => menu.id >= 10 && menu.id <= 12 ? <Menu key={menu.id} menu={menu}></Menu> : '')
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

export default Dinner;