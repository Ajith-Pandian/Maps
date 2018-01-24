import {INCREASE_AREA, DECREASE_AREA} from '../constants'

export function increaseArea() {
    return {
        type: INCREASE_AREA
    }
}

export function decreaseArea() {
    return {
        type: DECREASE_AREA
    }
}