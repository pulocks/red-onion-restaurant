import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Breakfast from './components/Breakfast/Breakfast';
import NotFound from './components/NotFound/NotFound';
import Dinner from './components/Dinner/Dinner';
import MenuDetails from './components/MenuDetails/MenuDetails';
import Review from './components/Review/Review';
import LogIn from './components/LogIn/LogIn';
import Shipment from './components/Shipment/Shipment';
import Footer from './components/Footer/Footer';
import Inventory from './components/Inventory/Inventory';

function App() {
  return (
    <div className="App">

      <Header></Header>
      
      <Router>
        <Switch>
          <Route path="/lunch">
            <Home></Home>
          </Route>
          <Route path="/breakfast">
            <Breakfast></Breakfast>
          </Route>
          <Route path="/dinner">
            <Dinner></Dinner>
          </Route>
          <Route path="/menu/:menuKey">
            <MenuDetails></MenuDetails>
          </Route>
          <Route path="/review">
            <Review></Review>
          </Route>
          <Route path="/login">
            <LogIn></LogIn>
          </Route>
          <Route path="/shipment/:displayName">
            <Shipment></Shipment>
          </Route>
          <Route path="/shipment">
            <Shipment></Shipment>
          </Route>
          <Route path="/inventory">
            <Inventory></Inventory>
          </Route>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>

      <Footer></Footer>

    </div>    
  );
}

export default App;
