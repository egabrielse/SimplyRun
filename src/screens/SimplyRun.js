import React, { Component } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import firebaseConfig from '../config/firebaseConfig'

export default class SimplyRun extends Component {
  render() {
    return (
      <ScrollView >
        <View>
          <Text > Simply Run </Text>
        </View>
      </ScrollView>
    );
  }
}