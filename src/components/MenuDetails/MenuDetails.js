import React from 'react';
import { useParams } from 'react-router-dom';
import foodMenus from '../../FoodMenus';
import './MenuDetails.css';
import { addToDatabaseCart } from '../../utilities/databaseManager';

const MenuDetails = () => {
    const {menuKey} = useParams();
    const menu = foodMenus[menuKey-1];
    const {name, price, img} = menu;

    const handleAddItem = () => {
        const increaseItem = document.getElementById('increase-item');
        increaseItem.addEventListener("click", () => {
            let totalItem = document.getElementById('total-item').value;
            let totalItemNumber = parseInt(totalItem);
            totalItemNumber += 1;
            document.getElementById('total-item').value = totalItemNumber;
            totalValue(totalItemNumber);
        })
    }

    const handleRemoveItem = () => {
        const decreaseItem = document.getElementById('decrease-item');
        decreaseItem.addEventListener('click', () => {
            let totalItem = document.getElementById('total-item').value;
            let totalItemNumber = parseInt(totalItem);
            totalItemNumber -= 1;
            if(totalItemNumber === -1) {
                totalItemNumber = 0;
            }
            document.getElementById('total-item').value = totalItemNumber;
            totalValue(totalItemNumber);
        })
    }


    function totalValue(quantity) {
        const totalPrice = Number (price * quantity).toFixed(2);
        document.getElementById('total-value').innerText = totalPrice;
    }

    const handleAddMenu = () => {
        const quantity = parseInt(document.getElementById('total-item').value);
        addToDatabaseCart(menuKey, quantity);
        prompt(`${quantity} items of the product added to your cart. Go to main menu to show your cart`);
    }

    return (
        <div className="menu-details">
            <div className="menu-information">
                <h2>{name}</h2>
                <br/>
                <p>Beyond Chorizo, pico de gallo, feta, Chipotle Greek yogurt and cilantro 460 cals, 43g protein, 
                   21g net carbs. Beyond Chorizo, pico de gallo, feta, Chipotle Greek yogurt and cilantro 460 cals, 
                   43g protein, 21g net carbs</p>
                <br/>
                <h4 className="price">$<span id="total-value">{price}</span></h4>
                <button id="decrease-item" className="btn btn-default" onClick={handleRemoveItem}><i className="fas fa-minus"></i></button>
                <input type="text" id="total-item" className="text-center" defaultValue="1"></input>
                <button id="increase-item" className="btn btn-default" onClick={handleAddItem}><i className="fas fa-plus"></i></button>
                <br/>
                <br/>
                <button className="main-button" onClick={handleAddMenu}>Add</button>
            </div>
            <div className="menu-image">
                <img src={img} alt=""/>
            </div>
        </div>
    );
};

export default MenuDetails;