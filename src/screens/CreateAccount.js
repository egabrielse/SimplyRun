import React, { Component } from 'react';
import { Text, View, TextInput, Button, Alert } from 'react-native';
import firebase from 'firebase'
import firebaseConfig from '../config/firebaseConfig'
import '@firebase/firestore';
import { connect } from 'react-redux'


//Firebase initialization 
firebaseConfig


class CreateAccount extends Component {

    signUp = () => {
        if (this.props.email != null && this.props.password != null &&
            this.props.email.trim() != "" && this.props.password.trim() != "") {
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.props.email, this.props.password)
                .then(() => this.props.navigation.navigate('Main'))
                .catch(error => Alert.alert(error.message));
        }
    }
    render() {
        return (
            <View style={{ flex: 1, alignContent: 'center' , justifyContent: 'center' }} >
                <Text>Sign Up</Text>
                <TextInput
                    placeholder="Email"
                    autoCapitalize="none"
                    onChangeText={email=> this.props.typeEmail(email)}
                    value={this.props.email}
                />
                 <TextInput
                    secureTextEntry
                    placeholder="Password"
                    autoCapitalize="none"
                    onChangeText={password => this.props.typePassword(password)}
                    value={this.props.password}
                />
                <Button title="Sign Up" onPress={this.signUp} />
     
            </View>
        );
    }
}


//Getting the states from the store and mapping it to props in the CreateAccountScreen
function mapStateToProps(state) {
    return {
        email: state.email,
        password: state.password
    }
}
//Sends actions to the reducer in the App.js file 
function mapDispatchtoProps(dispatch){
    return {
        typeEmail: (email) => dispatch({ type: "EMAIL", email }),
        typePassword: (password) => dispatch({ type: "PASSWORD", password })
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(CreateAccount);