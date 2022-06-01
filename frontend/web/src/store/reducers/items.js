import { GET_ITEMS,SEARCH_ITEMS ,GET_SPECIAL_ITEMS} from "../actions/types";

const initialState = {
  items: [],
};

export default function itemsReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_ITEMS:
      return {
        ...state,
        items: action.payload,
      };

    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
      };

    default:
      return state;
  }
}
