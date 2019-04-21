import { GET_CART, ADD_TO_CART, DELETE_FROM_CART, DELETE_CART } from '../actions/types';

const initialState = {
  cart: []
}

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_CART:
      return {
        ...state
      }
    case ADD_TO_CART: {
      return {
        ...state,
        cart: [...state.cart, action.payload]
      }
    }
    case DELETE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(product => product.id !== action.payload )
      }
    case DELETE_CART:
      return {
        ...state,
        cart: []
      }
    default:
      return state;
  }
}