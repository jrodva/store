import { GET_OFFERS, DELETE_OFFER, ADD_OFFER, GET_OFFER, EDIT_OFFER } from '../actions/types';
import axios from 'axios';

export const getOffers = () => async dispatch => {
  console.log('getOffers', process.env);
  const response = await axios.get(process.env.REACT_OFFERS);
  dispatch({
    type: GET_OFFERS,
    payload: response.data
  })
}

export const getOffer = id => async dispatch => {
  const response = await axios.get(`${process.env.REACT_OFFERS}/${id}`);
  dispatch({
    type: GET_OFFER,
    payload: response.data
  })
}

export const deleteOffer = id => async dispatch => {
  await axios.delete(`${process.env.REACT_OFFERS}/${id}`);
  dispatch({
    type: DELETE_OFFER,
    payload: id
  })
}

export const addOffer = offer => async dispatch => {
  const response = await axios.post(process.env.REACT_OFFERS, offer);
  dispatch({
    type: ADD_OFFER,
    payload: response.data
  })
}

export const editOffer = offer => async dispatch => {
  const response = await axios.put(`${process.env.REACT_OFFERS}/${offer.id}`, offer);
  dispatch({
    type: EDIT_OFFER,
    payload: response.data
  })
}