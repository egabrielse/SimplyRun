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
            email: "",
            height: "",
            weight: "",
            sex: "",
            age: "",
            stats_to_display: [],
            metricSwitch: false,
            update_frequency: 0
        };
    }

    getInfo = () => {
        var ref = firestore.collection('users').doc('JUMxTNt8lET0JYQXWHLJJrjrQ6G2');
        ref.get().then(testData => {
            console.log(testData.data());
            var feet = Math.floor(testData.data().personal.height/12);
            var inches = testData.data().personal.height%12;
            var metric = "Imperial";
            if(testData.data().settings.metric == true) {
                metric = "Metric";
            }
            var stats = [];
            if(testData.data().settings.display_time) {
                stats.push("Time");
            }
            if(testData.data().settings.display_pace) {
                stats.push("Pace");
            }
            if(testData.data().settings.display_distance) {
                stats.push("Distance");
            }
            if(testData.data().settings.display_calories) {
                stats.push("Calories");
            }
            this.setState({
                name: testData.data().name,
                email: testData.data().email,
                height: feet + "'" + inches + '"',
                weight: testData.data().personal.weight,
                sex: testData.data().personal.sex,
                age: Math.floor(((Math.round(new Date().getTime()/1000)) - testData.data().personal.birthday.seconds)/(3600*24*365)),
                stats_to_display: stats,
                metricSwitch: metric,
                update_frequency: testData.data().settings.update_frequency
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
                    <Text> Email: {this.state.email}</Text>
                    <Text> Height: {this.state.height}</Text>
                    <Text> Weight: {this.state.weight} lbs</Text>
                    <Text> Sex: {this.state.sex}</Text>
                    <Text> Age: {this.state.age}</Text>
                    <Button 
                        title="Edit Profile"
                        onPress={() => {
                            this.props.navigation.navigate("EDIT", {refresh: this.getInfo});
                            }
                        } />
                    <Text>Settings</Text>
                    <Text> Unit: {this.state.metricSwitch} </Text>
                    <Text> Stats Displayed: {this.state.stats_to_display.toString()} </Text>
                    <Text> Update Frequency: {this.state.update_frequency} </Text>
                </View>
            </ScrollView>
        );
    }
}