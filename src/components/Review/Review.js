import React, { useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import foodMenus from '../../FoodMenus';
import ReviewItem from '../../components/ReviewItem/ReviewItem';
import './Review.css';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Review = (props) => {

    const [cart, setCart] = useState([]);
    const [clicked, setClicked] = useState(false);
    
    const handleRemoveItem = (key) => {
        const newCart = cart.filter(item => item.id !== key);
        setCart(newCart);
        removeFromDatabaseCart(key);
        prompt('Selected item will be removed from the cart');
    }

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const menuId = Object.keys(savedCart);
        const cartItems = menuId.map(key => {
            const items = foodMenus.find(item => item.id === key);
            items.quantity = savedCart[key];
            return items;
        })
        setCart(cartItems);
    }, [])

    
    let len = 1;
    let total = 0, units = 0;
    for (let i = 0; i < cart.length; i++) {
        let itemPrice = cart[i].price;
        let itemUnit = cart[i].quantity;
        total += itemPrice;
        units += itemUnit;
    }

   const handleProceed = () => {
       setClicked(true);
   } 

   const removeCart = () => processOrder(cart);

    return (
        
        <div className="review-container">
            <div className="shipping-container">
                <h2>Order Summary</h2>
                
                <input type="text" name="name" placeholder="Name"/>
                <br/>
                <input type="text" name="phone" placeholder="Phone"/>
                <br/>
                <input type="text" name="email" placeholder="Email"/>
                <br/>
                <input type="text" name="Address1" placeholder="Address Line 1"/>
                <br/>
                <input type="text" name="Address2" placeholder="Address Line 2"/>
                <br/>
                <br/>
                <button className="main-button" onClick={handleProceed}>Continue</button>
                
                <br/>
                {clicked && cart.length >=1 && <Link to={`/shipment/${props.displayName}`}>
                    <button className="place-order" onClick={removeCart}>Place Order</button>
                    </Link>}
            </div>
            <div className="items-container">
                <h2>Review Your Cart:</h2>
                {
                    cart.map(item => <ReviewItem key={item.id} item={item} len={len++} handleRemoveItem={handleRemoveItem}></ReviewItem>)
                }
                <h2>Summary:</h2>
                <h4>Total Items: {units}</h4>
                <h4>Total Price: {Number(total.toFixed(2))}</h4>
            </div>
            
        </div>
    );
};

export default Review;