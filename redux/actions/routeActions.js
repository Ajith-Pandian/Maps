import {
  FETCHING_ROUTE,
  FETCHING_ROUTE_SUCCESS,
  FETCHING_ROUTE_FAILURE
} from "../constants";
import { getRouteFromAPI } from "../../app/Utils";

export function fetchRoute(currentLocation) {
  return (dispatch, getState) => {
    const { userLocation } = getState();
    const userCurrentLocation = userLocation.userLocation;
    console.log("Locations");
    console.log(currentLocation);
    console.log(userCurrentLocation);
    dispatch(getRoute());
    getRouteFromAPI(userCurrentLocation, currentLocation)
      .then(routeAndSteps => dispatch(getRouteSuccess(routeAndSteps)))
      .catch(err => dispatch(getRouteFailure(err)));
  };
}

export function getRoute() {
  return {
    type: FETCHING_ROUTE
  };
}

export function getRouteSuccess(routeAndSteps) {
  return {
    type: FETCHING_ROUTE_SUCCESS,
    route: routeAndSteps.route,
    steps: routeAndSteps.steps
  };
}

export function getRouteFailure(error) {
  return {
    type: FETCHING_ROUTE_FAILURE,
    error
  };
}
