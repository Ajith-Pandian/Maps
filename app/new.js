import React, {Component} from 'react';
import {
    Text,
    View,
    Picker,
    Button,
    TextInput,
    ListView, StyleSheet
} from 'react-native';

export default class TextInANest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titleText: "Bird's Nest",
            bodyText: 'This is not really a bird nest.'
        };
    }

    render() {
        return (<View>
                <Text style={styles.titleText}>
                    {this.state.bodyText}
                </Text>
                <Text numberOfLines={5}>
                    {this.state.bodyText}
                </Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    baseText: {
        fontFamily: 'Cochin',
    },
    titleText: {
        backgroundColor:'#7eff1f',
        height:40,
        fontSize:50
    },
});