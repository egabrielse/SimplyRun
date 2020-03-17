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
            age: ""
        };
    }

    getInfo = () => {
        var ref = firestore.collection('users').doc('fullerTest');
        ref.get().then(testData => {
            console.log(testData.data());
            var feet = Math.floor(testData.data().height/12);
            var inches = testData.data().height%12;
            this.setState({
                name: testData.data().name,
                height: feet + "'" + inches + '"',
                weight: testData.data().weight,
                sex: testData.data().sex,
                age: Math.floor(((Math.round(new Date().getTime()/1000)) - testData.data().birthday.seconds)/(3600*24*365))
            })
        })
    }

    componentDidMount() {
        this.getInfo();
    }

    render() {
        return (
            <ScrollView>
                <View>
                    <Text>My Profile</Text>
                    <Text> Name: {this.state.name}</Text>
                    <Text> Height: {this.state.height}</Text>
                    <Text> Weight: {this.state.weight} lbs</Text>
                    <Text> Sex: {this.state.sex}</Text>
                    <Text> Age: {this.state.age}</Text>
                    <Button 
                        title="Edit Profile"
                        onPress={() => {
                            this.props.navigation.navigate("EDIT");
                            }
                        } />
                    <Text>Settings</Text>
                </View>
            </ScrollView>
        );
    }
}