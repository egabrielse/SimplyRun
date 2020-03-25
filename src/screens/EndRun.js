import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView } from 'react-native';
import firebaseConfig from '../config/firebaseConfig' 
import * as firebase from 'firebase';
import '@firebase/firestore';
import { connect } from 'react-redux'

//Initialize firebase
firebaseConfig
const Firestore = firebase.firestore();

class EndRun extends Component {
    state = {
        notes: ""
    }

    writeNote = (note) => {
        this.setState({notes: note})
    }
    sendToFirebase = () => {
        Firestore.collection('users').doc(firebase.auth().currentUser.uid).collection("RunLog").add({
            calories: this.props.calories,
            distance: this.props.distance,
            end_time: this.props.endTime,
            note: this.state.notes,
            route: this.props.route,
            start_time: this.props.startTime,
            time: this.props.time,
            pace: this.props.pace
        })
    }

    saveRun = () => {
        Alert.alert("Run Saved")
        this.sendToFirebase();
        this.props.clearRun();
        this.props.navigation.navigate('SimplyRun');
    }

    dontSave = () => {
        this.props.clearRun();
        this.props.navigation.navigate('SimplyRun')
    }

    discardRun = () => {
        Alert.alert(
            'Confirm Discard Run',
            'Would you like to end your run?',
            [
                { text: 'Yes', onPress: () => { this.dontSave() } },
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
            
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', bottom: 2, backgroundColor: 'powderblue'}}  >
                <Text style = {{fontSize: 20, paddingBottom: 240}} > {"Run Complete"} </Text>
                <Text >{"Time: " + this.props.time} </Text>
                <Text style = {{left: 10}}>{"Distance: " + this.props.distance} </Text>
                <Text style = {{left: 14}}>{"Pace: " + this.props.pace} </Text>
                <Text style = {{left: 14, paddingBottom: 30}}>{"Calories: " + this.props.calories} </Text>
                
                <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset='100' style={{alignItems: 'center'}}>
                    <TextInput style={{ paddingLeft: 7, borderWidth: 5, borderColor: 'black', right: 0, width: 200 }}
                        placeholder="Notes     "
                        autoCapitalize="none"
                        onChangeText={note => this.writeNote(note)}
                        value={this.state.notes}
                        multiline
                        blurOnSubmit={true}
                />
                
                <View style = {{paddingTop: 30, flexDirection: 'row', alignContent: 'space-between'}}> 

                    <TouchableOpacity style = {{
                        right: 20, 
                        width: 90, 
                        height: 90, 
                        backgroundColor: 'darkcyan',
                        borderRadius: 200/2,
                        alignItems: 'center' }} onPress={this.saveRun}>
                        
                        <Text style = {{paddingVertical: 35}}>Save Run </Text>
                        
                    </TouchableOpacity>

                    <TouchableOpacity style = {{
                        left: 20,
                        width: 90, 
                        height: 90, 
                        backgroundColor: 'darkorange',
                        borderRadius: 200/2,
                        alignItems: 'center'}} onPress={this.discardRun}>
                        
                        <Text style = {{paddingVertical: 35}}>Discard Run</Text>

                    </TouchableOpacity>
                </View>
                </KeyboardAvoidingView>
            </View>
        );
    }
    
}

class Circle extends Component {
    
    render () {
        return (
            <View style = {{
                width: 75,
                height: 75,
                backgroundColor: 'darkcyan',
                borderRadius: 200/2
            }}/>
        )
    }
}

//Getting the states from the store and mapping it to props in the Login
function mapStateToProps(state) {
    return {
        time: state.endRunReducer.time,
        distance: state.endRunReducer.distance,
        pace: state.endRunReducer.pace,
        calories: state.endRunReducer.calories,
        startTime: state.endRunReducer.startTime,
        endTime: state.endRunReducer.endTime,
        route: state.endRunReducer.route

    }
}
//Sends actions to the reducer in the App.js file 
function mapDispatchtoProps(dispatch) {
    return {
        sendTime: (time) => dispatch({ type: "ENDRUN", time }),
        clearRun: () => dispatch({ type: "CLEARRUN" })
    }
}

//Connecting the react components to the store in App.js 
export default connect(mapStateToProps, mapDispatchtoProps)(EndRun);