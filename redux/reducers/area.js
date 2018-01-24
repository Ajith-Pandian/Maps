import {INCREASE_AREA, DECREASE_AREA} from '../constants'
const initialState = {
    area: 5,
};

export default function areaReducer(state = initialState, action) {
    switch (action.type) {
        case INCREASE_AREA:
            return {
                ...state,
                area: state.area + 1
            };
        case DECREASE_AREA:
            let area = state.area;
            let newArea = area !== 0 ? area - 1 : area;
            return {
                ...state,
                area: newArea
            };
        default:
            return state
    }
}