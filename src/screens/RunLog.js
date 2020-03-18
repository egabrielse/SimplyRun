import React, { Component } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import firebaseConfig from '../config/firebaseConfig'
import firebase from 'firebase';

export default class RunLog extends Component {

	state = {
        user: {
			"name":"Jon Doe",
			"weight": 182
		}
    }

	// GetUserData() {
	// 	var jondoe = firebaseConfig.Firestore().collection('users').doc(user.uid)
	// }

	componentDidMount() {
        var testrun = firestore.collection('users').doc('0yjmOiXjzCS74wmLW8l3EFHJYj83')
        						.collection('runs').doc('Vj8iAkbyUKZgB2f4I4MD');
    }

  render() {
    return (
      <ScrollView >
        <View>
          <Text > Run Log for {this.props.user} </Text>
          <Text > Here is a list of all the beautiful runs you have been on! </Text>
          <Text > Run 1: 4 miles </Text>
          <Text > Run 2: 3.6 miles </Text>

        </View>
      </ScrollView>
    );
  }
}