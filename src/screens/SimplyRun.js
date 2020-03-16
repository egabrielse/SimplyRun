import React, { Component, } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import firebaseConfig from '../config/firebaseConfig'

class Triangle extends Component {

    render() {
        return (
            <View style={{
                width: 0,
                height: 0,
                backgroundColor: 'transparent',
                borderStyle: 'solid',
                borderLeftWidth: 35,
                borderRightWidth: 35,
                borderBottomWidth: 70,
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
                borderBottomColor: 'steelblue',
                transform: [{ rotate: '90deg' }]

            }} />
        )
    }
}
class StartButton extends Component {
    render() {
        return (
            <TouchableOpacity
                style={{
                    borderWidth: 1,
                    borderColor: 'rgba(0,0,0,0.2)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 150,
                    height: 150,
                    backgroundColor: 'springgreen',
                    borderRadius: 75
                }} delayLongPress={1000} onPress={this.props.onPress} onLongPress={this.props.onLongPress}>
                <Triangle />
            </TouchableOpacity>
        )
    }
}

export default class SimplyRun extends Component {
    state = {
        stats: 'Time: \n Ditance: \n Pace: \n calories:',
        displayStat: false,
        time: 0
    }

    displayStats = () => {
        if (!this.state.displayStat) {
            this.setState({ displayStat: true })
        } else {
            this.setState({ displayStat: false })
        }
    }

    longPress = () => {
        Alert.alert("LONGPRESS")
    }

    render() {
        ``
        return (

            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', padding: 75 }}>
                {
                    this.state.displayStat ? < Text style={{ paddingVertical: 100 }}> {this.state.stats}</Text> : null
                }
                <StartButton onPress={this.displayStats} onLongPress={this.longPress} />
            </View>

        );
    }
}