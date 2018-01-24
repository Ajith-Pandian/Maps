/**
 * Created by thoughtchimp on 15/06/17.
 */
import React, {Component} from "react";
import PropTypes from 'prop-types';

import
{
    StyleSheet,
    View,
    TouchableOpacity,
    Text
} from 'react-native';
export class ZoomControl extends Component {
    static propTypes = {
        onIncrease:PropTypes.func.isRequired,
        onDecrease:PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            count: props.defaultCount
        }
    }


    render() {

        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.increase}><Text
                    style={[styles.buttonText, styles.button]}>{"+"}</Text></TouchableOpacity>
                <TouchableOpacity onPress={this.decrease}><Text
                    style={[styles.buttonText, styles.button]}>{"-"}</Text></TouchableOpacity>
            </View>
        )
    }

    increase = () => {
        this.setState({count: ++this.state.count});
        this.props.onIncrease(this.state.count);
    };
    decrease = () => {
        let count = this.state.count;
        if (count !== 0)
            this.setState({count: --count});
        this.props.onDecrease(this.state.count);
    }
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: 30,
        padding: 12,
        height: 100,
        width:50,
        alignItems: 'center',
        marginBottom: 20,
        flexDirection: 'column',
    },
    buttonText: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    button: {


    }
});