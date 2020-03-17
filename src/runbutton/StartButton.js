import React, { Component, } from 'react';
import {View,TouchableOpacity } from 'react-native';
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
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 5,
                transform: [{ rotate: '90deg' }]

            }} />
        )
    }
}

class Rectangle extends Component {
    render() {
        return (
            <View style={{
                width: 25,
                height: 2 * 50,
                backgroundColor: this.props.color,
                borderColor: 'black',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 5,
            }} />
        );
    }
}

export default class StartButton extends Component {

    render() {
        return (
            <TouchableOpacity
                style={{
                    borderWidth: 2,
                    borderColor: 'rgba(0,0,0,0.2)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 150,
                    height: 150,
                    backgroundColor: 'springgreen',
                    borderRadius: 75,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.8,
                    shadowRadius: 5,
                }} delayLongPress={1000} onPress={this.props.onPress} onLongPress={this.props.onLongPress}>
                {this.props.pauseButton ? <View style={{ flexDirection: "row", justifyContent: 'space-between', padding: 10 }}>
                    <Rectangle color='yellow' />
                    <View style={{ paddingHorizontal: 10 }} />
                    <Rectangle color='yellow' />
                </View> : <Triangle />
                }

            </TouchableOpacity>
        )
    }
}
