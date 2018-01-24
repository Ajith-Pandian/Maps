import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text, TextInput,
    View, TouchableHighlight,
    Dimensions, AsyncStorage,Button
} from 'react-native';

export default class NewApp extends Component {
constructor()
{
  super();
  this.state={

  }
}
    render() {
        return (
            <View style={styles.container}>
            <CustomMap ref={(ref)=>{this.customMap=ref}} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: '#F5FCFF',
    },

    tInRegister: {
        fontSize: 16,
        height: 40,
        color: '#800080'
    },
    textStyle: {
        fontSize: 16,
        color: '#800080'
    },
    Signupform: {
        width: 400,
        height: 100,
        justifyContent: 'center',
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10

    },
    get: {
        marginTop: 20,
    },


});
