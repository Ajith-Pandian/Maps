import {
  FETCHING_ROUTE,
  FETCHING_ROUTE_SUCCESS,
  FETCHING_ROUTE_FAILURE
} from "../constants";
const initialState = {
  route: [],
  steps:[],
  isFetching: false,
  error: false
};

export default function routeReducer(state = initialState, action) {
  switch (action.type) {
    case FETCHING_ROUTE:
      return {
        ...state,
        route: [],
        steps: [],
        isFetching: true
      };
    case FETCHING_ROUTE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        route: action.route,
        steps: action.steps
      };
    case FETCHING_ROUTE_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    default:
      return state;
  }
}
