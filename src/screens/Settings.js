import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import firebase from 'firebase';
import firebaseConfig from '../config/firebaseConfig';
import { connect } from 'react-redux';
import {updateAllPersonalInfoAction} from '../actions/PersonalInfoAction';
import {updateAllSettingsAction} from '../actions/SettingsAction';

//References to the root of the firestore database
const firestore = firebase.firestore();
//Firebase initialzation 
firebaseConfig

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            height: "",
            weight: "",
            age: "",
            stats_to_display: []
        };
    }

    getInfo = () => {
        var feet = Math.floor(this.props.height/12);
        var inches = this.props.height%12;

        var stats = [];
        if(this.props.display_time) {
            stats.push(" Time");
        }
        if(this.props.display_pace) {
            stats.push(" Pace");
        }
        if(this.props.display_distance) {
            stats.push(" Distance");
        }
        if(this.props.display_calories) {
            stats.push(" Calories");
        }
        this.setState({
            height: feet + "'" + inches + '"',
            weight: this.props.weight,
            age: Math.floor(((Math.round(new Date().getTime()/1000)) - this.props.birthday)/(3600*24*365)),
            stats_to_display: stats
        })
    }

    componentDidMount() {
        this.getInfo();
    }

    render() {
        return (
            <ScrollView>
                <View>
                    <Text style = {styles.title}>My Profile</Text>
                    <Text style = {styles.text}> Name: {this.props.name}</Text>
                    <Text style = {styles.text}> Email: {this.props.email}</Text>
                    <Text style = {styles.text}> Height: {this.state.height}</Text>
                    <Text style = {styles.text}> Weight: {this.state.weight} lbs</Text>
                    <Text style = {styles.text}> Sex: {this.props.sex}</Text>
                    <Text style = {styles.text}> Age: {this.state.age}</Text>
                    <Text> </Text>
                    <Text style = {styles.title}>Settings</Text>
                    <Text style = {styles.text}> Unit: {this.props.metric} </Text>
                    <Text style = {styles.text}> Stats Displayed: {this.state.stats_to_display.toString()} </Text>
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
        name: state.PersonalInfoReducer.name,
        email: state.PersonalInfoReducer.email,
        birthday: state.PersonalInfoReducer.birthday,
        height: state.PersonalInfoReducer.height,
        weight: state.PersonalInfoReducer.weight,
        sex: state.PersonalInfoReducer.sex,

        display_calories: state.SettingsReducer.display_calories,
        display_distance: state.SettingsReducer.display_distance,
        display_pace: state.SettingsReducer.display_pace,
        display_time: state.SettingsReducer.display_time,
        metric: state.SettingsReducer.metric,
        update_frequency: state.SettingsReducer.update_frequency,
    }
}

export default connect(mapStateToProps)(Settings);