import { combineReducers } from 'redux';
import productsReducer from './productsReducer';
import cartReducer from './cartReducer';
import offersReducer from './offersReducer';

export default combineReducers({
  products: productsReducer,
  cart: cartReducer,
  offers: offersReducer
});