import React, { useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ReviewItem from '../../components/ReviewItem/ReviewItem';
import './Review.css';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from '../CheckoutForm/CheckoutForm';


const Review = (props) => {

    const [cart, setCart] = useState([]);
    const [clicked, setClicked] = useState(false);
    const [shipInfo, setShipInfo] = useState(null);
    const [orderId, setOrderId] = useState(null);
    const { register, handleSubmit, errors } = useForm();

    const stripePromise = loadStripe('pk_test_1HlzxsoxraiOHZPtZQkEN73T00LOrFlHPT');

    const onSubmit = data => {
        setShipInfo(data);
    } 

    const handlePlaceOrder = payment => {
        setClicked(true);
        const savedCart = getDatabaseCart();
        const orderDetails = { 
            cart: savedCart,
            shipment: shipInfo,
            payment: payment
        };
        fetch('https://evening-journey-66665.herokuapp.com/placeOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(orderDetails)
        })
        .then(res => res.json())
        .then(data => {
            setOrderId(data._id);
            processOrder();
        })
    }
    
    const handleRemoveItem = key => {
        const newCart = cart.filter(item => item.id !== key);
        setCart(newCart);
        removeFromDatabaseCart(key);
        alert('Selected item has been removed from the cart');
    }

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const menuId = Object.keys(savedCart);
        
        fetch('https://evening-journey-66665.herokuapp.com/getItemsById', {
            method: 'POST',
            body: JSON.stringify(menuId),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(res => res.json())
        .then(data => {
            const cartItems = menuId.map(key => {
                const items = data.find(item => item.id === key);
                items.quantity = savedCart[key];
                return items;
            })
            setCart(cartItems);
        })
        
    }, []);

    let len = 1;
    let total = 0, units = 0;
    for (let i = 0; i < cart.length; i++) {
        let itemPrice = cart[i].price;
        let itemUnit = cart[i].quantity;
        total += itemPrice;
        units += itemUnit;
    }


    return (
        
        <div className="review-container">
            <div className="shipping-container">
                <div style={{display: shipInfo ? 'none': 'block' }}>
                    <h2>Shipping Information</h2>
                    
                    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
                        
                        <input name="name" ref={register({ required: true })} placeholder="Name"/>
                        {errors.name && <span className="error">Name is required</span>}

                        <input name="email" ref={register({ required: true })} placeholder="Email"/>
                        {errors.email && <span className="error">Email is required</span>}

                        <input name="addressLine1" ref={register({ required: true })} placeholder="Address Line 1"/>
                        {errors.addressLine1 && <span className="error">Address is required</span>}

                        <input name="addressLine2" ref={register} placeholder="Address Line 2"/>

                        <input name="city" ref={register({ required: true })} placeholder="City"/>
                        {errors.city && <span className="error">City is required</span>}

                        <input name="country" ref={register({ required: true })} placeholder="Country"/>
                        {errors.country && <span className="error">Country is required</span>}

                        <input name="zipcode" ref={register({ required: true })} placeholder="Zip Code"/>
                        {errors.zipcode && <span className="error">Zip Code is required</span>}
                        
                        <input type="submit" />
                    </form>
                    
                </div>
                <div className="payment" style={{display: shipInfo ? 'block': 'none'}}>
                    <h2>Payment Information</h2>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm handlePlaceOrder={handlePlaceOrder}></CheckoutForm>
                    </Elements>
                </div>

                {clicked && cart.length >=1 && <div>
                    <h3>Thanks for your shopping with us</h3>
                    <p>Your order id: {orderId}</p>
                    <Link to={`/shipment/${props.displayName}`}><button className="place-order">Place Order</button>
                    </Link>
                </div> 
                }
                
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