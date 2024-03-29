import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';

const api = async (descriptor, nextUrl = null) => {
  const desc = descriptor;
  if (nextUrl) {
    desc.url = nextUrl;
  }
  const { data } = await axios(desc);
  return data;
};

export default api;

export const descriptor = {
getSearch: (searchString) => ({
  method: 'get',
  url: `${process.env.REACT_APP_BACKEND_API}/search=${searchString}/`,
}),
};

export const SIGNIN_API = `${process.env.REACT_APP_BACKEND_API}/signin/`;
export const SIGNUP_API = `${process.env.REACT_APP_BACKEND_API}/signup/`;


export const SIGNOUT_API = `${process.env.REACT_APP_BACKEND_API}/signout/`;
export const SALES_API = `${process.env.REACT_APP_BACKEND_API}/salesapi/`;
export const HELP_API = `${process.env.REACT_APP_BACKEND_API}/helpapi/`;
export const USER_DETAIL_API = `${process.env.REACT_APP_BACKEND_API}/me/`;
export const USER_DEACTIVATE_API = `${process.env.REACT_APP_BACKEND_API}/me/deactivate/`;

export const TOKEN_REFRESH_API = `${process.env.REACT_APP_BACKEND_API}/token/refresh/`;

export const MY_CART_API = `${process.env.REACT_APP_BACKEND_API}/me/cart/`;

export const NURSERY_ORDERS_LIST_API = `${process.env.REACT_APP_BACKEND_API}/nursery/orders/`;

export const MY_ORDERS_LIST_API = `${process.env.REACT_APP_BACKEND_API}/me/orders/`;
export const ORDER_CREATE_API = `${process.env.REACT_APP_BACKEND_API}/me/order/create/`;
export const ORDER_API = `${process.env.REACT_APP_BACKEND_API}/me/order/`;

export const SHOPS_LIST_API = `${process.env.REACT_APP_BACKEND_API}/shops/`;
export const MY_SHOP_API = `${process.env.REACT_APP_BACKEND_API}/shop/`;

export const ITEMS_LIST_API = `${process.env.REACT_APP_BACKEND_API}/items/`;
export const CATEGORY_LIST_API = `${process.env.REACT_APP_BACKEND_API}/category/`;

export const FILTERALL_API =(minprice,maxprice) => {
    let url;
if (minprice && maxprice){
      url='price/filterall/${minprice}/${maxprice}/'
    }
 else if (minprice && maxprice === ""){
    url='price/minprice/${minprice}/'
    }
else{
    url='price/maxprice/${maxprice}/'
      

  }
  return( `${process.env.REACT_APP_BACKEND_API}/${url}/`);

}
