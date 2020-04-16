import React from 'react';
import './ReviewItem.css';

const ReviewItem = (props) => {
    
    const {name, price, quantity, id} = props.item;

    return (
        <div className="review-item">
            <h5>({props.len})</h5>
            <h4>Item: {name}</h4>
            <p>Price: {price}</p>
            <p><small>Quantity: {quantity}</small></p>
            <button className="main-button" onClick={() => props.handleRemoveItem(id)}>Remove</button>
        </div>
    );
}

export default ReviewItem;