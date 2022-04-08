import {
   APPLYFILTER,RESETFILTER
  } from "../actions/types";
  
  const initialState = {
    filter: [], // this is the array to contain the ids of all ITEMS in the cart
  };
  
  export default function filterReducer(state = initialState, action) {
    switch (action.type) {
      case APPLYFILTER:
        return {
          ...state,
          filter: action.payload,
        };
        case RESETFILTER:
    
             return {
                  ...state,
                  ...initialState,
                };
              default:
                return state;
            }
      }
      