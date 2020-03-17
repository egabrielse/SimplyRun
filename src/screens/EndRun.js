import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import firebaseConfig from '../config/firebaseConfig' 
import { connect } from 'react-redux'
//Initialize firebase
firebaseConfig

class EndRun extends Component {
    state = {
        notes: ""
    }

    writeNote = (note) => {
        this.setState({notes: note})
    }


    gotToRunScreen = () => {
        
        this.props.navigation.navigate('Main');
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}  >      
                <Text >{"Time: " + this.props.time} </Text>
                <Text >{"Distance: " } </Text>
                <Text >{"Pace: " } </Text>
                <Text >{"Calories: "} </Text>
                
                <TextInput
                    placeholder="Notes"
                    autoCapitalize="none"
                    onChangeText={note => this.writeNote(note)}
                    value={this.state.notes}
                />
               
                    <TouchableOpacity onPress={this.gotToRunScreen}>
                        <Text> Run Screen </Text>
                    </TouchableOpacity>
                
            </View>
        );
    }
    
}

//Getting the states from the store and mapping it to props in the Login
function mapStateToProps(state) {
    return {
        time: state.endRunReducer.time,

    }
}
//Sends actions to the reducer in the App.js file 
function mapDispatchtoProps(dispatch) {
    return {
        sendTime: (time) => dispatch({ type: "ENDRUN", time }),

    }
}

//Connecting the react components to the store in App.js 
export default connect(mapStateToProps, mapDispatchtoProps)(EndRun);