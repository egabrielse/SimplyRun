import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import firebaseConfig from '../config/firebaseConfig' 
import firebase from 'firebase';
import { connect } from 'react-redux'
//Initialize firebase
firebaseConfig
const firestore = firebase.firestore();

class EndRun extends Component {

    state = {
        notes: ""
    }

    writeNote = (note) => {
        this.setState({notes: note})
    }


    sendToFirebase = () => {
        firestore.collection('users').doc('testSendRunInfo').set({
            distance: this.props.distance,
            runtime: this.props.time,
            pace: this.props.pace,
            calories: this.props.calories
        })
    }


    saveRun = () => {
        Alert.alert("Run Saved")
        this.sendToFirebase();
        this.props.navigation.navigate('Main');
    }

    discardRun = () => {
        Alert.alert(
            'Confirm Discard Run',
            'Would you like to end your run?',
            [
                { text: 'Yes', onPress: () => { this.props.navigation.navigate('Main'); } },
                {
                    text: 'No',
                    style: 'cancel',
                }
            ],
            { cancelable: false },
        );
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}  >
                <Text >{"Time: " + this.props.time} </Text>
                <Text >{"Distance: " + this.props.distance } </Text>
                <Text >{"Pace: " + this.props.pace} </Text>
                <Text >{"Calories: " + this.props.calories} </Text>
                
                <TextInput
                    placeholder="Notes"
                    autoCapitalize="none"
                    onChangeText={note => this.writeNote(note)}
                    value={this.state.notes}
                />
                <TouchableOpacity onPress={this.saveRun}>
                        <Text>Save Run </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.discardRun}>
                    <Text>Discard Run</Text>
                </TouchableOpacity>
                
            </View>
        );
    }
    
}

//Getting the states from the store and mapping it to props in the Login
function mapStateToProps(state) {
    return {
        time: state.endRunReducer.time,
        distance: state.endRunReducer.distance,
        pace: state.endRunReducer.pace,
        calories: state.endRunReducer.calories

    }
}
//Sends actions to the reducer in the App.js file 
function mapDispatchtoProps(dispatch) {
    return {
        sendTime: (time) => dispatch({ type: "ENDRUN", time}),
 

    }
}

//Connecting the react components to the store in App.js 
export default connect(mapStateToProps, mapDispatchtoProps)(EndRun);