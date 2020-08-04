import ACTIONS from './actions';
import { initialState } from './store';

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case ACTIONS.MAKE_REQUEST:
            return {
                ...state,
                loading: true,
                vehicles: [],
                filteredVehicles: [],
            };
        case ACTIONS.GET_ALL_VEHICLES:
            return {
                ...state,
                loading: false,
                vehicles: action.payload.vehicles,
                filteredVehicles: action.payload.vehicles
            };
        case ACTIONS.FILTER_VEHICLES:
            return {
                ...state,
                filteredVehicles: action.payload.filteredVehicles
            };
        case ACTIONS.ADD_TO_CART:
            // Prevent user from adding more than one of the same vehicle.
            if (state.cartItems 
                && state.cartItems.some(item => item.id === action.payload.id)
            ) return state;

            return {
                ...state,
                cartItems: state.cartItems? [ ...state.cartItems, action.payload ] : [ action.payload ]
            };
        case ACTIONS.REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.id !== action.payload)
            }
        case ACTIONS.SHOW_ERROR:
            return { 
                ...state,
                loading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
}