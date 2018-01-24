import {FETCHING_USER_LOCATION, FETCHING_USER_LOCATION_SUCCESS, FETCHING_USER_LOCATION_FAILURE} from '../constants'
const initialState = {
    userLocation: {
        //latitude:12.938,
       // longitude:77.6101
    },
    isFetching:false,
    error: false
};

export default function userLocation(state = initialState, action) {
    switch (action.type) {
        case FETCHING_USER_LOCATION:
            return {
                ...state,
                isFetching: true
            };
        case FETCHING_USER_LOCATION_SUCCESS:
            return {
                ...state,
                isFetching: false,
                userLocation: action.data
            };
        case FETCHING_USER_LOCATION_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            };
        default:
            return state
    }
}