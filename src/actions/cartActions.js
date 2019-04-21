import { GET_CART, ADD_TO_CART, DELETE_FROM_CART, DELETE_CART } from '../actions/types';

export const getCart = () => {
  return {
    type: GET_CART
  }
}

export const addToCart = (product) => {
  return {
    type: ADD_TO_CART,
    payload: product
  }
}

export const deleteFromCart = (id) => {
  return {
    type: DELETE_FROM_CART,
    payload: id
  }
}

export const deleteCart = () => {
  return {
    type: DELETE_CART
  }
}

