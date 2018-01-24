import createObservableFromDeviceEventEmitter$ from './createObservableFromDeviceEmitter';

/**
 * Creates an Observable to listen to `locationUpdated` event
 * dispatched by Location (react-native-location)
 */
export default locationDidUpdate$ = (delay=1000) => {

    return createObservableFromDeviceEventEmitter$('locationUpdated')
        .throttle(delay) // delay of listening to events
        .map((location) => {
            // map latitude + longitude into simple object
            return {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            }
        });
}