import React from 'react';
import map from '../../map.png';
import './Shipment.css';
import { useParams } from 'react-router-dom';


const Shipment = () => {

    const {displayName} = useParams();
    let today = new Date();
    let time = today.getHours() + ':' + today.getMinutes();

    return (
        <div className="shipment">
            <div className="map-container">
                <img src={map} alt=""/>
            </div>
            <div className="summary-container">
                <div className="top">
                    <h4>* Your Location</h4>
                    <br/>
                    <h4>* Shop Address</h4>
                </div>
                <div className="bottom">
                    <h2>{time}</h2>
                    <h5>{displayName}</h5>
                    <button className="contact-button">Contact</button>
                </div>
                
                
            </div>
        </div>
    );
};

export default Shipment;