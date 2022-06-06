import axios from "axios";

import { MY_CART_API } from "../../api";
import {
  GET_CART,
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
  EMPTY_CART,
  UI_LOADING_START,
  UI_LOADING_END,
  UNAUTHORIZED_ACCESS,
  SHOW_ALERT_MESSAGE,
} from "../actions/types";
import { tokenConfig } from "../../utils";

// Get Cart
export const getCart = () => (dispatch, getState) => {
  // GET TOKEN FROM STATE
  const auth = getState().auth;
  const accessToken = auth.access;

  // Start Loading the UI
  dispatch({
    type: UI_LOADING_START,
  });

  axios
    .get(MY_CART_API, tokenConfig(accessToken))
    .then((res) => {
      dispatch({
        type: GET_CART,
        payload: res.data,
      });
      // End Loading the UI
      dispatch({
        type: UI_LOADING_END,
      });
    })
    .catch((err) => {
      if (err.response && err.response.status === 401) {
        dispatch({
          type: UNAUTHORIZED_ACCESS,
        });
      }
      // End Loading the UI
      dispatch({
        type: UI_LOADING_END,
      });
    });
};

// Add ITEM to Cart
export const addItemToCart = (itemId) => (dispatch, getState) => {
  // GET TOKEN FROM STATE
  const auth = getState().auth;
  const accessToken = auth.access;

  const itemIds = getState().cart.cart.items;

  // Start Loading the UI
  dispatch({
    type: UI_LOADING_START,
  });
  axios
    .patch(
      MY_CART_API,
      { items: [...itemIds, itemId] },
      tokenConfig(accessToken)
    )
    .then((res) => {
      dispatch({
        type: ADD_ITEM_TO_CART,
        payload: res.data,
      });
      // End Loading the UI
      dispatch({
        type: UI_LOADING_END,
      });
      //Show the alert
      dispatch({
        type: SHOW_ALERT_MESSAGE,
        payload: {
          text: "Added to menu",
          type: "success",
        },
      });
    })
    .catch((err) => {
      if (err.response && err.response.status === 401) {
        dispatch({
          type: UNAUTHORIZED_ACCESS,
        });
        //Show the alert
        dispatch({
          type: SHOW_ALERT_MESSAGE,
          payload: {
            text: "You are not authorized to perform this action.",
            type: "error",
          },
        });
      }
      // End Loading the UI
      dispatch({
        type: UI_LOADING_END,
      });
    });
};

// Remove ITEM fROM Cart
export const removeItemFromCart = (itemId) => (dispatch, getState) => {
  // GET TOKEN FROM STATE
  const auth = getState().auth;
  const accessToken = auth.access;

  const items = getState().cart.cart.items;
  const itemIds = items.filter((prevItemId) => prevItemId !== itemId);

  // Start Loading the UI
  dispatch({
    type: UI_LOADING_START,
  });
  axios
    .patch(MY_CART_API, { items: itemIds }, tokenConfig(accessToken))
    .then((res) => {
      dispatch({
        type: REMOVE_ITEM_FROM_CART,
        payload: res.data,
      });
      // End Loading the UI
      dispatch({
        type: UI_LOADING_END,
      });
      //Show the alert
      dispatch({
        type: SHOW_ALERT_MESSAGE,
        payload: {
          text: "Removed from menu",
          type: "success",
        },
      });
    })
    .catch((err) => {
      if (err.response && err.response.status === 401) {
        dispatch({
          type: UNAUTHORIZED_ACCESS,
        });
        //Show the alert
        dispatch({
          type: SHOW_ALERT_MESSAGE,
          payload: {
            text: "You are not authorized to perform this action!",
            type: "error",
          },
        });
      }
      // End Loading the UI
      dispatch({
        type: UI_LOADING_END,
      });
    });
};

// Empty Cart
export const emptyCart = () => (dispatch, getState) => {
  // GET TOKEN FROM STATE
  const auth = getState().auth;
  const accessToken = auth.access;

  // Start Loading the UI
  dispatch({
    type: UI_LOADING_START,
  });
  axios
    .patch(MY_CART_API, { items: [] }, tokenConfig(accessToken))
    .then((res) => {
      dispatch({
        type: EMPTY_CART,
      });
      // End Loading the UI
      dispatch({
        type: UI_LOADING_END,
      });
    })
    .catch((err) => {
      if (err.response && err.response.status === 401) {
        dispatch({
          type: UNAUTHORIZED_ACCESS,
        });
      }
      // End Loading the UI
      dispatch({
        type: UI_LOADING_END,
      });
    });
};
