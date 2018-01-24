/**
 * Created by thoughtchimp on 19/06/17.
 */
import React, {DeviceEventEmitter} from 'react-native';
import {Observable} from 'rxjs'

/**
 * Creates an Observable to listen to any event of DeviceEventEmitter
 * @param type {string} Event type
 */
export default createObservableFromDeviceEventEmitter$ = type => {
    let subscription;
    return Observable.fromEventPattern(
        handler => subscription = DeviceEventEmitter.addListener(type, handler),
        handler => subscription.remove()
    )
}
