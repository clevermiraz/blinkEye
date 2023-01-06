/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { createWrapper } from 'next-redux-wrapper';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import {
    orderCreateReducer,
    orderDeliverReducer,
    orderDetailsReducer,
    orderListMyReducer,
    orderPayReducer
} from './reducers/orderReducers';
import { productDetailsReducer, productListReducer } from './reducers/productReducers';
import {
    userDetailsReducer,
    userLoginReducer,
    userRegisterReducer,
    userUpdateProfileReducer
} from './reducers/userReducers';

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    // productDelete: productDeleteReducer,
    // productCreate: productCreateReducer,
    // productUpdate: productUpdateReducer,
    // productCreateReview: productCreateReviewReducer,
    // productTopRated: productTopRatedReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    // userList: userListReducer,
    // userDelete: userDeleteReducer,
    // userUpdate: userUpdateReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    // orderList: orderListReducer,
    orderDeliver: orderDeliverReducer
});

const cartItemsFromStorage =
    typeof window !== 'undefined'
        ? window.localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : []
        : [];

const userInfoFromStorage =
    typeof window !== 'undefined'
        ? localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo'))
            : null
        : null;

const shippingAddressFromStorage =
    typeof window !== 'undefined'
        ? localStorage.getItem('shippingAddress')
            ? JSON.parse(localStorage.getItem('shippingAddress'))
            : {}
        : {};

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage
    },
    userLogin: { userInfo: userInfoFromStorage }
};

const middleware = [thunk];

export const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

// assigning store to next wrapper
const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
