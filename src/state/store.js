import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Reducer from './reducer';

const middleWare = [thunk];
export const initialState = {
    vehicles: [], 
    filteredVehicles: [], 
    cartItems: [], 
    loading: true, 
    error: null 
};

const store = createStore(
    Reducer,
    initialState,
    applyMiddleware(...middleWare)
);

export default store;
