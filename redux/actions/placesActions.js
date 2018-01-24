import {FETCHING_NEARBY_LOCATIONS, FETCHING_LOCATIONS_SUCCESS, FETCHING_LOCATIONS_FAILURE} from '../constants'
import Api from '../Api'
import  {fetchDistances} from './distanceActions'


export function fetchPlacesFromAPI(isEmulator) {
    return (dispatch, getState) => {
        const {userLocation} = getState();
        dispatch(getPlaces());
        Api.get(isEmulator, 'places')
            .then((places) => {
                dispatch(getPlacesSuccess(places));
                dispatch(fetchDistances(userLocation.userLocation,places));
            })
            .catch(err => dispatch(getPlacesFailure(err)))
    }
}


export function getPlaces() {
    return {
        type: FETCHING_NEARBY_LOCATIONS
    }
}

export function getPlacesSuccess(data) {
    return {
        type: FETCHING_LOCATIONS_SUCCESS,
        data,
    }
}

export function getPlacesFailure() {
    return {
        type: FETCHING_LOCATIONS_FAILURE
    }
}