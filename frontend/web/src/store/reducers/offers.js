import { GET_OFFERS } from "../actions/types";

const initialState = {
  offers: [],
};

export default function offersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_OFFERS:
      return {
        ...state,
        offers: action.payload,
      };
    default:
      return state;
  }
}
