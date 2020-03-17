import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert, StyleSheet, Button, KeyboardAvoidingView} from 'react-native';
import firebase from 'firebase';
import firebaseConfig from '../config/firebaseConfig'
import { connect } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler';
import {createLoginAction} from '../actions/UserAuthenticationAction'

//References to the root of the firestore database
const firestore = firebase.firestore();
//Firebase initialzation 
firebaseConfig

class Login extends Component {
    state = {
        email:"",
        password:"",
        emailValid:false,
        passwordValid:false,

    }

    // DEVELOPER FUNCTION: Used to bypass the login/create account screens
    DEV_SKIP_LOGIN = () => {
        this.props.navigation.navigate('Main')
    }

    // Function to navigate to the CreateAcount Screen
    goToCreateAccount = () => {
        this.props.navigation.navigate('CreateAccount');
    }

    login = (e,p) => {
        console.log("Login: Login in user with email =", e, "and password =", p)

        // Login existing user with given username and password
        if (e != null && p != null && e.trim() != "" && p != "") {
            firebase
                .auth()
                .signInWithEmailAndPassword(e, p)
                .then(() => {
                    // Dispatch login action to store
                    this.props.dispatch(createLoginAction(e,p));

                    // Navigate to 'Main'
                    this.props.navigation.navigate("Main")
                })
                .catch(error => Alert.alert(error.message));
        } else {
            // Alert user that email and/or password are empty
            Alert.alert("Please fill out all text fields")
            return
        }

        // Reset Login's state
        this.setState({email:"", password:""})
    }

    updateEmail = (text) => {
        if (text != null && text.trim() != "" && text.length >= 8) {
            this.setState({email:text, emailValid:true})
        } else {
            this.setState({email:text, emailValid:false})
        }
    }
    updatePassword = (text) => {
        if (text != null && text.trim() != "" && text.length >= 8) {
            this.setState({password:text, passwordValid:true})
        } else {
            this.setState({password:text, passwordValid:false})
        }
    }

    render() {
        return (
            <ScrollView contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps='handled'>
                <KeyboardAvoidingView style={{flex:1, marginHorizontal:20}} behavior='padding'>
                    <View  style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                        <Text style={styles.titleText}>Simply Run</Text>
                    </View>

                    <View style={{flex:2}}>
                        {/*TextInput for email address*/}
                        <TextInput
                            placeholder="Email"
                            value={this.state.email}
                            onChangeText={(text) => this.updateEmail(text)}
                            autoCapitalize='none'
                            returnKeyType={"next"}
                            onSubmitEditing={() => { this.passwordInput.focus(); }}
                            keyboardType='email-address'
                            style={styles.textInput}
                        />

                        {/*TextInput for password*/}
                        <TextInput
                            placeholder="Password" 
                            value={this.state.password}
                            onChangeText={(text) => this.updatePassword(text)}
                            autoCapitalize='none'
                            returnKeyType={'done'}
                            ref={(input) => { this.passwordInput = input; }}
                            keyboardType='email-address'
                            secureTextEntry
                            style={styles.textInput}
                        />

                        {/*Button for logging in*/}
                        <TouchableOpacity 
                            onPress={() => this.login(this.state.email, this.state.password)}
                            disabled={(this.state.emailValid && this.state.passwordValid ? false : true)}>
                            <View style={{
                                height:50,
                                backgroundColor: (this.state.emailValid && this.state.passwordValid ? "lightblue" : "lightgray"),
                                justifyContent:'center',
                                alignItems:'center',
                                paddingHorizontal:15,}}>
                                <Text style={{fontSize:20,color:'black'}}>Login!</Text>
                            </View>
                        </TouchableOpacity>

                        {/*Button for changing to the CreateAccount screen*/}
                        <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center', height:75}}>
                            <Text style={{fontSize:18}}>Don't have an account?</Text>
                            <Button title="Sign Up!" onPress={this.goToCreateAccount}/>
                        </View>

                        {/*DEVELOPER BUTTON FOR SKIPPING LOGIN*/}
                        <TouchableOpacity onPress={() => this.DEV_SKIP_LOGIN()}>
                            <View style={{height:50, maxHeight:50, backgroundColor:"red", padding:8, justifyContent:'center', alignItems:'center'}}>
                                <Text style={{fontSize:20,color:'white'}}>DEV:Skip Login</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        );
    }
}

export default connect()(Login)

const styles = StyleSheet.create({
    textInput: {
      borderWidth: 1,
      borderColor: 'lightgrey',
      height:50,
      maxHeight:50,
      justifyContent:'center',
      padding:8,
    },
    titleText: {
        fontSize:40,
        fontWeight:'bold',
        fontStyle:'italic',
    }
  });

//     //References to the root of the firestore database
//     const firestore = firebase.firestore();
//
//     sendToFirebase = () => {
//         firestore.collection('users').doc('test').set({
//             name: "SimpleTest",
//             weight: "260",
//             height: "6"
//         })
//     }
//
//     //Basic function that retrieves some date from firestore and displays it on the console
//     getFromFirebase = () => {
//         var ref = firestore.collection('users').doc('test');
//         ref.get().then(testData => {
//             console.log(testData.data())
//         })
//     }