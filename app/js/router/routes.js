import React from 'react';
import APP from '../components/generical/app.js';
import { Route, IndexRoute } from 'react-router';
import ShoppingCart from '../components/shoppingCart';
import CheckOutPay from '../components/checkOutPay';

const Routes = (
    <Route name="APP" path="/" component={APP}>
      <IndexRoute component={ShoppingCart}/>
      <Route path="/payment" component={CheckOutPay}/>
      <Route path="*" component={ShoppingCart}/>
    </Route>
);

module.exports = Routes;
