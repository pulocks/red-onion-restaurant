import React from 'react';
import './Menu.css';
import { Link } from 'react-router-dom';

const Menu = (props) => {
    const {name, description, price, img, id} = props.menu;
    return (
        <div className="menu">
            <img src={img} alt=""/>
            <h4><Link to={`/menu/${id}`}>{name}</Link></h4>
            <p>{description}</p>
            <h3>${price}</h3>
        </div>
    );
};

export default Menu;