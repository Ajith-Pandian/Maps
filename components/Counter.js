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
export class Counter extends Component {
    static propTypes = {
        defaultCount: PropTypes.number.isRequired,
        onIncrease:PropTypes.func.isRequired,
        onDecrease:PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            count: props.defaultCount,
        }
    }


    render() {

        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.decrease}><Text
                    style={[styles.buttonText, styles.button, {paddingLeft: 10,}]}>{"-"}</Text></TouchableOpacity>
                <Text style={styles.buttonText}>{this.state.count}</Text>
                <TouchableOpacity onPress={this.increase}><Text
                    style={[styles.buttonText, styles.button, {paddingRight: 10,}]}>{"+"}</Text></TouchableOpacity>
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
            this.setState({count: --count})
        this.props.onDecrease(this.state.count);
    }
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: 30,
        padding: 12,
        width: 160,
        alignItems: 'center',
        marginBottom: 20,
        flexDirection: 'row',
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    button: {


    }
});
