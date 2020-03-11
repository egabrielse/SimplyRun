import React, { Component } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import firebase from '../config/firebase'

export default class RunLog extends Component {
  render() {
    return (
      <ScrollView >
        <View>
          <Text > Run Log </Text>
        </View>
      </ScrollView>
    );
  }
}