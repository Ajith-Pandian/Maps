import {FETCHING_DISTANCES, FETCHING_DISTANCES_SUCCESS, FETCHING_DISTANCES_FAILURE} from '../constants'
const initialState = {
    distances: [],
    isFetching: false,
    error: false
};

export default function distancesReducer(state = initialState, action) {
    switch (action.type) {
        case FETCHING_DISTANCES:
            return {
                ...state,
                distances: [],
                isFetching: true
            };
        case FETCHING_DISTANCES_SUCCESS:
            return {
                ...state,
                isFetching: false,
                distances: state.distances.concat(action.data)
            };
        case FETCHING_DISTANCES_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            };
        default:
            return state
    }
}