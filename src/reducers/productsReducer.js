import { GET_PRODUCTS, DELETE_PRODUCT, ADD_PRODUCT, GET_PRODUCT, EDIT_PRODUCT } from '../actions/types';

const initialState = {
  products: []
}

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload
      }
    case GET_PRODUCT:
      return {
        ...state,
        product: action.payload
      }
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload )
      }
    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload]
      }
    case EDIT_PRODUCT:
      return {
        ...state,
        products: state.products.map(
          product => product.id === action.payload.id
            ? (product = action.payload)
            : product
        )
      }
    default:
      return state;
  }
}