import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import firebase from 'firebase';
import firebaseConfig from '../config/firebaseConfig';
import { connect } from 'react-redux';
import {updateAllPersonalInfoAction} from '../actions/PersonalInfoAction';
import {updateAllSettingsAction} from '../actions/SettingsAction';
import {convertInchesToCentimeters, convertPoundsToKilograms} from '../constants/ConversionFunctions';

//References to the root of the firestore database
const firestore = firebase.firestore();
//Firebase initialzation 
firebaseConfig

class Settings extends Component {
    render() {
        return (
            <ScrollView>
                <View>
                    <Text style = {styles.title}>My Profile</Text>
                    <Text style = {styles.text}> Name: {this.props.name}</Text>
                    <Text style = {styles.text}> Email: {this.props.email}</Text>
                    <Text style = {styles.text}> Height: {(this.props.metric ? 
                        (Math.floor(this.props.height / 100) + "m " + Math.round(this.props.height % 100) 
                        + "cm") : (Math.floor(this.props.height / 12) + "' ") + Math.round(this.props.height % 12) 
                        + '"')}</Text>
                    <Text style = {styles.text}> Weight: {this.props.weight} {(this.props.metric ? "kg" : "lbs")}</Text>
                    <Text style = {styles.text}> Sex: {this.props.sex}</Text>
                    <Text style = {styles.text}> Age: {this.props.age}</Text>
                    <Text> </Text>
                    <Text style = {styles.title}>Settings</Text>
                    <Text style = {styles.text}> Unit: {(this.props.metric ? "Metric" : "Imperial")} </Text>
                    <Text style = {styles.text}> Stats Displayed: {this.props.stats_to_display} </Text>
                    <Text style = {styles.text}> Update Frequency: {this.props.update_frequency} </Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            this.props.navigation.navigate("EDIT");
                            }
                        }>
                        <Text style={styles.buttonText}>Edit Profile</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        padding: 5
    },
    text: {
        textAlign: "center",
        padding: 2
    },
    button: {
        marginLeft: 120,
        marginRight: 120,
        marginTop:10,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#A44CA0',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff',
        color: "yellow"
      },
    buttonText: {
        color:'#fff',
        textAlign:'center',
        paddingLeft : 25,
        paddingRight : 25
      },
});

function mapStateToProps(state) {
    return {
        // all local states based on global props so that when editSettings changes them, they are updated here
        name: state.PersonalInfoReducer.name,
        email: state.PersonalInfoReducer.email,
        age: Math.floor(((Math.round(new Date().getTime()/1000)) - state.PersonalInfoReducer.birthday)/(3600*24*365)),
        height: ((state.SettingsReducer.metric) ?  (convertInchesToCentimeters(state.PersonalInfoReducer.height)) : 
            state.PersonalInfoReducer.height),
        weight: ((state.SettingsReducer.metric) ? (convertPoundsToKilograms(state.PersonalInfoReducer.weight)) :
            state.PersonalInfoReducer.weight),
        sex: state.PersonalInfoReducer.sex,

        stats_to_display: ("" + ((state.SettingsReducer.display_time) ? "Time, " : "")
            + ((state.SettingsReducer.display_pace) ? "Pace, " : "")
            + ((state.SettingsReducer.display_distance) ? "Distance, " : "")
            + ((state.SettingsReducer.display_calories) ? "Calories, " : "")).slice(0, -2),
        display_calories: state.SettingsReducer.display_calories,
        display_distance: state.SettingsReducer.display_distance,
        display_pace: state.SettingsReducer.display_pace,
        display_time: state.SettingsReducer.display_time,
        metric: state.SettingsReducer.metric,
        update_frequency: state.SettingsReducer.update_frequency,
    }
}

export default connect(mapStateToProps)(Settings);