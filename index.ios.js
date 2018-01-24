/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import {
    AppRegistry,
} from 'react-native';
import App from './app/App'
import { Provider } from 'react-redux'
import configureStore from './redux/configureStore'

const store = configureStore();

const Maps = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

AppRegistry.registerComponent('Maps', () => Maps);
