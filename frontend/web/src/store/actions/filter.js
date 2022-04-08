import axios from "axios";

import { FILTERALL_API } from "../../api";
import {
  APPLYFILTER,
  UI_LOADING_START,
  UI_LOADING_END,
  UNAUTHORIZED_ACCESS,
  SHOW_ALERT_MESSAGE,
} from "../actions/types";

import { tokenConfig } from "../../utils";


export const FilterPrice = (minprice,maxprice) => (dispatch, getState) => {
    const auth = getState().auth;
    const accessToken = auth.access;

  // Start Loading the UI
  dispatch({
    type: UI_LOADING_START,
  });
  axios
    .get(
      FILTERALL_API(minprice,maxprice),tokenConfig(accessToken) )
    .then((res) => {
      //Show the alert
      dispatch({
        type: SHOW_ALERT_MESSAGE,
        payload: {
          text: "Filter Applied",
          type: "success",
        },
      });
      dispatch({
        type: APPLYFILTER,
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