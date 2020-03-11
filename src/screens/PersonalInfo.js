import React, { Component } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import firebase from '../config/firebase'

export default class PersonalInfo extends Component {
    render() {
        return (
            <ScrollView >
                <View>
                    <Text > Personal Info </Text>
                </View>
            </ScrollView>
        );
    }
}