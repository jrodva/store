import { GET_PRODUCTS, DELETE_PRODUCT, ADD_PRODUCT, GET_PRODUCT, EDIT_PRODUCT } from '../actions/types';
import axios from 'axios';

export const getProducts = () => async dispatch => {
  const response = await axios.get(process.env.REACT_APP_PRODUCTS);
  dispatch({
    type: GET_PRODUCTS,
    payload: response.data
  })
}
export const getProduct = id => async dispatch => {
  const response = await axios.get(`${process.env.REACT_APP_PRODUCTS}/${id}`);
  dispatch({
    type: GET_PRODUCT,
    payload: response.data
  })
}

export const deleteProduct = id => async dispatch => {
  await axios.delete(`${process.env.REACT_APP_PRODUCTS}/${id}`);

  dispatch({
    type: DELETE_PRODUCT,
    payload: id
  })
}

export const addProduct = product => async dispatch => {
  const response = await axios.post(process.env.REACT_APP_PRODUCTS, product);
  dispatch({
    type: ADD_PRODUCT,
    payload: response.data
  })
}
export const editProduct = product => async dispatch => {
  const response = await axios.put(`${process.env.REACT_APP_PRODUCTS}/${product.id}`, product);
  dispatch({
    type: EDIT_PRODUCT,
    payload: response.data
  })
}