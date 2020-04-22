import React from 'react';
import foodMenus from '../../FoodMenus';

const Inventory = () => {

    const handleAddInventory = () => {
        const product = foodMenus;
        fetch('https://evening-journey-66665.herokuapp.com/addItem', {
            method: 'POST',
            body: JSON.stringify(product),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
    }

    return (
        <div>
            <h2>More items coming soon...</h2>
            <button className="main-button" onClick={handleAddInventory}>Add Inventory</button>
        </div>
    );
};

export default Inventory;