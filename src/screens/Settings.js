import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import firebase from 'firebase';
import firebaseConfig from '../config/firebaseConfig'

//References to the root of the firestore database
const firestore = firebase.firestore();
//Firebase initialzation 
firebaseConfig

export default class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            height: "",
            weight: "",
            sex: "",
            birthday: ""
        };
    }

    componentDidMount() {
        var ref = firestore.collection('users').doc('fullerTest');
        ref.get().then(testData => {
            console.log(testData.data())
            this.setState({
                name: testData.data().name,
                height: testData.data().height,
                weight: testData.data().weight,
                sex: testData.data().sex,
                birthday: testData.data().birthday
            })
        })
    }
    
    render() {
        return (
            <ScrollView >
                <View>
                    <Text > Settings </Text>
                    <Text> {this.state.name}</Text>
                </View>
            </ScrollView>
        );
    }
}