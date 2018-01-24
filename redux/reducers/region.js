import {REGION,UPDATED_REGION} from '../constants'
import {Dimensions} from 'react-native';
import {getDeltas} from '../../app/Utils'
const {height, width} = Dimensions.get('window');

const LATITUDE = 12.938;
const LONGITUDE = 77.6101227;
const ASPECT_RATIO = width / height;
let deltas = getDeltas(LATITUDE, 5, ASPECT_RATIO);
const LATITUDE_DELTA = deltas.latitudeDelta;//0.0922;
const LONGITUDE_DELTA = deltas.longitudeDelta;
const initialState = {
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
};

export default function regionReducer(state = {initialState}, action) {
    switch (action.type) {
        case REGION:
            return {
                ...state,
            };
        case UPDATED_REGION:
            return {
                ...state,
                region: action.data
            };
        default:
            return state
    }
}