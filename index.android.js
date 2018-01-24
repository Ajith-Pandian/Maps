/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import {
    AppRegistry,View
} from 'react-native';
import App from './app/App'
import MyApp from './app/MyApp'
import {Provider} from 'react-redux'
import configureStore from './redux/configureStore'
import TextInANest from './app/new'

const store = configureStore();

function Maps(props) {
    return (
     <Provider store={store}>
        <MyApp />
      </Provider>)
}

AppRegistry.registerComponent('Maps', () => Maps);
