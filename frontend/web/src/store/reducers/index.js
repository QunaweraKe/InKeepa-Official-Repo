import { combineReducers } from "redux";
import authReducer from "./auth";
import cartReducer from "./cart";
import itemsReducer from "./items";
import ordersReducer from "./orders";
import shopsReducer from "./shops";
import uiReducer from "./ui";
import supportReducer from "./support";

export default combineReducers({
  auth: authReducer,
  cart: cartReducer,
  items: itemsReducer,
  orders: ordersReducer,
  shops: shopsReducer,
  ui: uiReducer,
  support:supportReducer
});
