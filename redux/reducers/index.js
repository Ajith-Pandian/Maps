import { combineReducers } from 'redux'
import places from './places'
import distances from './distances'
import area from './area'
import regionReducer from './region'
import userLocation from './userLocation'
import route from './route'
const allReducers = Object.assign({}, places, area,distances);

const rootReducer = combineReducers(
    {places,distances,area,userLocation,route}
);

export default rootReducer
