import {FETCHING_DISTANCES, FETCHING_DISTANCES_SUCCESS, FETCHING_DISTANCES_FAILURE} from '../constants'


export function fetchDistances() {
    // console.log(src);
    // console.log(dest.length);

    return (dispatch, getState) => {
        dispatch(getDistances());
        const {userLocation, places} = getState();
        getAllDistances(userLocation.userLocation,places.places)
            .then((places) => {
                dispatch(getDistancesSuccess(places))
            })
            .catch(err => dispatch(getDistancesFailure(err)))
    }
}
function fetchDistanceFromMatrixApi(src, destString) {
    const API_KEY = 'AIzaSyCQNDEF46WiaP77vT8bIlddheHJAnqIy_8';
    const API_KEY1 = 'AIzaSyAqP-GZF6rfBqL4VUNxGFxZpWGs-0gd5Y0';
    let sLatitude = src.latitude;
    let sLongitude = src.longitude;

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${sLatitude},${sLongitude}&destinations=${destString}&key=${API_KEY1}`;
    return fetch(url)
        .then(response => response.json())
        .then(responseJson => {
            let distances = [];
            let elements = responseJson.rows[0].elements;
            for (let i = 0; i < elements.length; i++) {
                distances[i] = elements[i].distance.value;
            }
            return distances
        })
        .catch(e => {
            console.warn(e)
        });
}
function getAllDistances(src, dest) {
    let source = {
        latitude: src.latitude,
        longitude: src.longitude,
    };
    let destinations = [];

    for (let i = 0; i < dest.length; i++) {
        destinations[i] = {
            latitude: dest[i].latitude,
            longitude: dest[i].longitude,
        }
    }
    let start = 0;
    let end = 20;
    let excess = destinations.length % 20;
    let numOfTimes = (destinations.length / 20);
    let promises = [];
    for (let i = 0; i < numOfTimes; i++) {
        let twentyItems = destinations.slice(start, end);
        start = end;
        end = (i === numOfTimes - 1) ? end + excess : end + 20;
        promises.push(fetchDistanceFromMatrixApi(source, buildDestString(twentyItems)));
    }
    return Promise.all(promises)
        .then((results) => {
            console.log("All done");
            let allDistances = [];
            results.map(result => {
                allDistances = allDistances.concat(result);
            });
            return allDistances;
        })
        .catch((error) => {
            console.log("error", error);
        });
}
function buildDestString(dest) {
    let destString = '';
    for (let i = 0; i < dest.length; i++)
        destString = `${destString}${(destString ? '|' : '')}${dest[i].latitude},${dest[i].longitude}`;
    return destString;
}

export function getDistances() {
    return {
        type: FETCHING_DISTANCES
    }
}

export function getDistancesSuccess(data) {
    return {
        type: FETCHING_DISTANCES_SUCCESS,
        data,
    }
}

export function getDistancesFailure() {
    return {
        type: FETCHING_DISTANCES_FAILURE
    }
}