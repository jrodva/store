import { ADD_OFFER, DELETE_OFFER, EDIT_OFFER, GET_OFFER, GET_OFFERS } from '../actions/types';

const initialState = {
  offers: []
}

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_OFFERS:
      return {
        ...state,
        offers: action.payload
      }
    case GET_OFFER:
      return {
        ...state,
        offer: action.payload
      }
    case DELETE_OFFER:
      return {
        ...state,
        offers: state.offers.filter(offers => offers.id !== action.payload )
      }
    case ADD_OFFER:
      return {
        ...state,
        offers: [...state.offers, action.payload]
      }
    case EDIT_OFFER:
      return {
        ...state,
        offers: state.offers.map(
          offer => offer.id === action.payload.id
            ? (offer = action.payload)
            : offer
        )
      }
    default:
      return state;
  }
}