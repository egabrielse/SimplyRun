import React, { Component, } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';


class StopSign extends Component {

    state = {
        color: 'tomato'
    }
    render() {
        return (
            <View>

                <View >
                    <View style={{
                        width: 30,
                        height: 75,
                        backgroundColor: this.state.color,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.8,
                        shadowRadius: 5,
                    }} />
                    <View style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        transform: [
                            { rotate: '90deg' }
                        ],
                        width: 30,
                        height: 75,
                        backgroundColor: this.state.color,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.8,
                        shadowRadius: 5,
                    }} />
                    <View style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        transform: [
                            { rotate: '-45deg' }
                        ],
                        width: 30,
                        height: 75,
                        backgroundColor: this.state.color,
                        shadowColor: '#000',


                    }} />
                    <View style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        transform: [
                            { rotate: '45deg' }
                        ],
                        width: 30,
                        height: 75,
                        backgroundColor: this.state.color,
                        shadowColor: '#000',

                    }} />

                </View>

            </View>

        )
    }
}


export default class StopRunButton extends Component {
    render() {
        return (
            <View style={{ paddingVertical: 7 }}>

                <TouchableOpacity delayLongPress={1000} onLongPress={this.props.onLongPress}>
                    <View style={{ alignItems: 'center', paddingLeft:150 }}>
                        <StopSign />
                       <Text> Hold To End Run</Text>
                    </View>
                </TouchableOpacity>

            </View>
        )
    }
}