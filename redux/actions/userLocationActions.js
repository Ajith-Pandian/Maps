import {FETCHING_USER_LOCATION, FETCHING_USER_LOCATION_SUCCESS, FETCHING_USER_LOCATION_FAILURE} from '../constants'
import {Observable} from 'rxjs';

export function fetchUserLocation() {
    return (dispatch) => {
      //  navigator.geolocation.getCurrentPosition(
      //      (position) => dispatch( getUserLocationSuccess(position)));
        navigator.geolocation.watchPosition((position) => {
            dispatch(getUserLocation());
        }//,  error => {
          //    console.error(error);
          //}
        );
        //getCurrentPositionEpic(dispatch(getUserLocation()))
    }
}
const getCurrentPositionObservable = (options) => new Observable(observer => {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            observer.next(position);
            observer.complete();
        },
        error => {
            observer.error(error);
        },
        options
    );

    // is there any way to cancel this? If so, return a teardown function
    // that does so!
});

getCurrentPositionObservable({enableHighAccuracy: true, timeout: 20000, maximumAge: 1000})
    .subscribe(
        position => getUserLocationSuccess(position),
        e => console.error(e)
    );
const currentPosition$ = getCurrentPositionObservable({
    enableHighAccuracy: true,
    timeout: 20000,
    maximumAge: 1000
});

export const getCurrentPositionEpic = action$ =>
    action$.ofType(FETCHING_USER_LOCATION)
        .mergeMap(() =>
            currentPosition$
                .mergeMap(position => Observable.of(
                    //updateRegion(position),
                    getUserLocationSuccess(position)
                ))
                .catch(error => Observable.of(
                    getUserLocationFailure(error)
                ))
        );

export function getUserLocation() {
    return {
        type: FETCHING_USER_LOCATION
    }
}

export function getUserLocationSuccess(data1) {
    return {
        type: FETCHING_USER_LOCATION_SUCCESS,
        data: {
            latitude: data1.coords.latitude,
            longitude: data1.coords.longitude,
        },
    }
}

export function getUserLocationFailure() {
    return {
        type: FETCHING_USER_LOCATION_FAILURE
    }
}
