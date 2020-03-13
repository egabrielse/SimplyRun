import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import firebaseConfig from '../config/firebaseConfig'

export default class Settings extends Component {
    render() {
        return (
            <ScrollView >
                <View>
                    <Text > Settings </Text>
                </View>
            </ScrollView>
        );
    }
}