import React, { Component } from 'react';
import { Text, View, TextInput, Button, Alert  } from 'react-native';
import firebase from 'firebase';
import firebaseConfig from '../config/firebaseConfig'
import { connect } from 'react-redux'

//References to the root of the firestore database
const firestore = firebase.firestore();
//Firebase initialzation 
firebaseConfig

//Login Screen 
class Login extends Component {
    //Using the Firebase built in authentification to login 
    login = () => {
        if (this.props.email != null && this.props.password != null &&
            this.props.email.trim() != "" && this.props.password.trim() != "") {
            firebase
                .auth()
                .signInWithEmailAndPassword(this.props.email, this.props.password)
                .then(() => this.props.navigation.navigate('Main'))
                .catch(error => Alert.alert(error.message));
        }
    }
    //Function to change to the Create Acount Screen
    goToCreateAccount = () => {
        this.props.navigation.navigate('CreateAccount');
    }

    //Basic Funtion that sends some hard coded data to a specific place in the 
    //firestore database
    sendToFirebase = () => {
        firestore.collection('users').doc('test').set({
            name: "SimpleTest",
            weight: "260",
            height: "6"
        })
    }
    //Basic function that retrieves some date from firestore and displays it on the console
    getFromFirebase = () => {
        var ref = firestore.collection('users').doc('test');
        ref.get().then(testData => {
            console.log(testData.data())
        })
    }

    devSkip = () => {
        this.props.navigation.navigate('Main')
    }

    render() {
        return (
            <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }} >
                <Text>Login</Text>
                <TextInput
                    placeholder="Email"
                    autoCapitalize="none"
                    onChangeText={email => this.props.typeEmail(email)}
                    value={this.props.email}
                />
                <TextInput
                    secureTextEntry
                    placeholder="Password"
                    autoCapitalize="none"
                    onChangeText={password => this.props.typePassword(password)}
                    value={this.props.password}
                />
                <Button title="Login" onPress={this.login} />
                <Button title="CreateAccount" onPress={this.goToCreateAccount} />
                <Text>This sends some hardcoded data to the firestore database</Text>
                <Button title="Write To Firebase" onPress={this.sendToFirebase} />
                <Text>This retrieves some data from firestore and prints it on the console </Text>
                <Button title="Read From Firebase" onPress={this.getFromFirebase} />
                <Button title="DEV:skip login" onPress={this.devSkip}/>

            </View>
        );
    }
    
}
//Getting the states from the store and mapping it to props in the Login
function mapStateToProps(state) {
    return {
        email: state.email,
        password: state.password
    }
}
//Sends actions to the reducer in the App.js file 
function mapDispatchtoProps(dispatch) {
    return {
        typeEmail: (email) => dispatch({ type: "EMAIL", email }),
        typePassword: (password) => dispatch({ type: "PASSWORD", password })
    }
}

//Connecting the react components to the store in App.js 
export default connect(mapStateToProps, mapDispatchtoProps)(Login);