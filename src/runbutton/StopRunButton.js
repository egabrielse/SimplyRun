import React, { Component, } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';


class StopSign extends Component {

    render() {
        return (
            <View>
            
            <View >
                <View style={{
                    width: 42,
                    height: 100,
                        backgroundColor: 'red',
                      shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                        shadowRadius: 5,
                    }}/>
                <View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    transform: [
                        { rotate: '90deg' }
                    ],
                    width: 42,
                    height: 100,
                        backgroundColor: 'red',
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.8,
                        shadowRadius: 5,
                    }}/>
                <View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    transform: [
                        { rotate: '-45deg' }
                    ],  
                width: 42,
                height: 100,
                        backgroundColor: 'red',
                    shadowColor: '#000',
                
           
                        }} /> 
                <View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    transform: [
                        { rotate: '45deg' }
                    ],
                    width: 42,
                    height: 100,
                        backgroundColor: 'red',
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
            <View style={{ paddingVertical: 45,}}>
                
                <TouchableOpacity delayLongPress={1000} onLongPress={this.props.onLongPress}>
                    <View style={{ alignItems: 'center' }}>
                        <StopSign />
                        <Text> Hold to end Run </Text>
                    </View>
                </TouchableOpacity>
         
            </View>
        )
    }
}