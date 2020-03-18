import React, { Component } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import firebaseConfig from '../config/firebaseConfig'

export default class RunLog extends Component {
  render() {
    return (
      <ScrollView >
        <View>
          <Text > Run Log </Text>
          <Text > Here is a list of all the beautiful runs you have been on! </Text>
          <Text > Run 1: 4 miles </Text>
          <Text > Run 2: 3.6 miles </Text>

        </View>
      </ScrollView>
    );
  }
}