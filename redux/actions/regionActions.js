import {REGION, UPDATED_REGION} from '../constants'

export function getRegion() {
    return {
        type: REGION
    }
}

export function getUpdatedRegion() {
    return {
        type: UPDATED_REGION
    }
}