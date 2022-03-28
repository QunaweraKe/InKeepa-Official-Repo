import {
  GET_CART,
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
  EMPTY_CART,
} from "../actions/types";

const initialState = {
  cart: {
    items: [], // this is the array to contain the ids of all ITEMS in the cart
    all_items: [], // this is the array to contain the details of all ITEMS in the cart
  },
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return {
        ...state,
        cart: action.payload,
      };
    case ADD_ITEM_TO_CART:
    case REMOVE_ITEM_FROM_CART:
      return {
        ...state,
        cart: { ...state.cart, ...action.payload },
      };
    case EMPTY_CART:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
}
