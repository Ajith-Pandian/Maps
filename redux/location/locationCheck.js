import Location from 'react-native-location';
import locationDidUpdate$ from './locationDidUpdate';

// init native location 
Location.request();
Location.startUpdatingLocation();

// subscribe to changes
const subscription = locationDidUpdate$(2000/* delay ms */)
    .subscribe(
        (location) => {
            // do anything with the location
            console.log('location updated', location)
        },
        (e) => console.log('onError: %s', e));

// to unsubscribe just call 
// subscription.dispose();