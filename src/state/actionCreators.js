import ACTIONS from './actions';
import axios from 'axios';

const BASE_URL = 'http://localhost:4000/v1/vehicles';

// Show Loading screen when a new request is made.
export const makeRequest = () => dispatch => {
    dispatch({ type: ACTIONS.MAKE_REQUEST });
}

// Fetch all vehicle data.
export const getAllVehicleData = () => dispatch => {
    axios.get(BASE_URL).then(res => {
        dispatch({
            type: ACTIONS.GET_ALL_VEHICLES,
            payload: { vehicles: res.data.data }
        });
    }).catch(err => {
        dispatch({
            type: ACTIONS.SHOW_ERROR,
            payload: { error: err }
        });
    });
}

// Filter vehicle data based on user selection.
export const filterVehicleData = (filterParams) => dispatch => {
    axios.get(BASE_URL).then(res => {
        const allVehicles = res.data.data;
        const filteredList = allVehicles.filter(vehicle => {
            for (let key in filterParams) {
                if (key === 'minValue' && vehicle.price >= filterParams.minValue) continue;
                if (key === 'maxValue' && vehicle.price <= filterParams.maxValue) continue;
                if (vehicle[key] === undefined || vehicle[key] !== filterParams[key])
                    return false;
            }
            return true;
        });
        dispatch({
            type: ACTIONS.FILTER_VEHICLES,
            payload: { filteredVehicles: filteredList }
        });
    }).catch(err => {
        dispatch({
            type: ACTIONS.SHOW_ERROR,
            payload: { error: err }
        });
    });
}

// Add vehicle to cart.
export const addToCart = (vehicle) => dispatch => {
    dispatch({ type: ACTIONS.ADD_TO_CART, payload: vehicle });
}

// Remove vehicle from cart.
export const removeFromCart = (id) => dispatch => {
    dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload: id });
}
