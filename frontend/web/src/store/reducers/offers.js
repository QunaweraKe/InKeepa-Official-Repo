import { GET_OFFERS } from "../actions/types";

const initialState = {
  items: [],
};

export default function offersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_OFFERS:
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  }
}
