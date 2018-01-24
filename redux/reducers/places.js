import {FETCHING_NEARBY_LOCATIONS, FETCHING_LOCATIONS_SUCCESS, FETCHING_LOCATIONS_FAILURE} from '../constants'
const initialState = {
    places: [],
    isFetching: false,
    error: false
};

export default function placesReducer(state = initialState, action) {
    switch (action.type) {
        case FETCHING_NEARBY_LOCATIONS:
            return {
                ...state,
                places: [],
                isFetching: true
            };
        case FETCHING_LOCATIONS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                places: action.data
            };
        case FETCHING_LOCATIONS_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            };
        default:
            return state
    }
}