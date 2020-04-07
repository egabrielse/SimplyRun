import React, { Component, } from 'react';
import { View, TouchableOpacity , Text} from 'react-native';
class Triangle extends Component {

    render() {
        return (
            <View style={{
          
                width: 0,
                height: 0,
                backgroundColor: 'transparent',
                borderStyle: 'solid',
                borderLeftWidth: 20,
                borderRightWidth: 20,
                borderBottomWidth: 50,
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
                width: 15,
                height: 2 * 15,
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
                    width: 80,
                    height: 80,
                    backgroundColor: '#00ff7f',
                    borderRadius: 75,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.8,
                    shadowRadius: 5,
                }} delayLongPress={1000} onPress={this.props.onPress} onLongPress={this.props.onLongPress}>
                {this.props.pauseButton ? <View style={{ flexDirection: "row", justifyContent: 'space-between'}}>
                    <Rectangle color='gold' />
                    <View style={{ paddingHorizontal: 5 }} />
                    <Rectangle color='gold' />

                </View> : <View  >
                        <Triangle />
                    
                    </View>
                }
             
            </TouchableOpacity>
        )
    }
}
