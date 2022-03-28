import {
    SUPPORT_FAIL,
    SUPPORT_SUCCESS
  } from "../actions/types";

  const initialState = {
   support:[]
  };

  export default function supportReducer(state = initialState, action) {
    switch (action.type) {
      
      case SUPPORT_SUCCESS:
        return {
          ...state,
          support: [...state.support, ...action.payload],
        };
      case SUPPORT_FAIL:
      default:
        return state;
    };
  }
  
  