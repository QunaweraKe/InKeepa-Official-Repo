import {
   
    UI_LOADING_START,
    UI_LOADING_END,
    SHOW_ALERT_MESSAGE,
    SUPPORT_SUCCESS,
    SUPPORT_FAIL
  } from "../actions/types";
import axios from "axios";
import { tokenConfig } from "../../utils";

  import {
    HELP_API ,
    SALES_API
  } from "../../api";


export const Help = (credentials) => (dispatch,getState) => {
  const auth = getState().auth;
  const accessToken = auth.access;
    // Start Loading the UI
    dispatch({
      type: UI_LOADING_START,
    });
    axios
    .post(
      HELP_API,
      JSON.stringify(credentials),
      tokenConfig(accessToken)
    )
      .then((res) => {
        dispatch({
          type: SHOW_ALERT_MESSAGE,
          payload: {
            text: "Success,wait for an email notification ",
            type: "success",
          },
        });
        dispatch({
          type: SUPPORT_SUCCESS,
          payload: res.data,
        });
        // End Loading the UI
        dispatch({
          type: UI_LOADING_END,
        });
      })
      .catch((err) => {
        if (err.response) {
          dispatch({
            type: SUPPORT_FAIL,
            payload: err.response.data,
          });
          //Show the alert
          dispatch({
            type: SHOW_ALERT_MESSAGE,
            payload: {
              text:
                (err.response.data && err.response.data.detail) ||
                "Oops!an error occured ",
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
  


  export const Sales= (credentials) => (dispatch) => {
    
    dispatch({
      type: UI_LOADING_START,
    });
    axios
      .post(SALES_API, JSON.stringify(credentials), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 201) {
          dispatch({
            type: SUPPORT_SUCCESS,
            payload: res.data,
          });
          //Show the alert
          dispatch({
            type: SHOW_ALERT_MESSAGE,
            payload: {
              text: "Thank you for contacting our sales team we will get back shortly via email.",
              type: "success",
            },
          });
        }
        // End Loading the UI
        dispatch({
          type: UI_LOADING_END,
        });
      })
      .catch((err) => {
        if (err.response) {
          dispatch({
            type: SUPPORT_FAIL,
            payload: err.response.data,
          });
          //Show the alert
          dispatch({
            type: SHOW_ALERT_MESSAGE,
            payload: {
              text:
                (err.response.data && err.response.data.detail) ||
                "Oops!an error occured ",
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
  