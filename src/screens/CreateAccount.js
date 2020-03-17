import React, { Component } from 'react';
import { Text, View, TextInput, Alert, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import firebase from 'firebase'
import firebaseConfig from '../config/firebaseConfig'
import '@firebase/firestore';
import { connect } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler';
import {createLoginAction} from '../actions/UserAuthenticationAction'

//References to the root of the firestore database
const firestore = firebase.firestore();
//Firebase initialization 
firebaseConfig


class CreateAccount extends Component {
    state = {
        email:"",
        password:"",
        confirmPassword:"",
    }

    DEV_SKIP_ACCOUNT = () => {
        console.log("CreateAccount: DEV_SKIP_ACCOUNT")
        this.props.navigation.navigate("InputPersonalInfo")
    }

    signUp = (e,p,p2) => {
        console.log("CreateAccount: Signing up new user with email =", e, "and password =", p)

        // Create new user with given username and password
        if (e != null && e.trim() != "" && p != null && p.trim() != "" && p2 != null && p2.trim() != "") {
            if (p === p2) {
                firebase
                    .auth()
                    .createUserWithEmailAndPassword(e, p)
                    .catch(function(error) {
                        Alert.alert(error.message);
                        return
                    })
                    
                // Dispatch login action to store
                this.props.dispatch(createLoginAction(e,p));

                // Navigate to 'Main'
                this.props.navigation.navigate("InputPersonalInfo")

                // Reset state of CreateAccount
                this.setState({email:"", password:"", confirmPassword:""})

            } else {
                // Alert user that password and confirm password must match
                Alert.alert("Passwords do not match")
                return
            }
        } else {
            // Alert user that email and/or password are empty
            Alert.alert("Please fill out all text fields")
            return
        }
    }

    render () {
        return (
            <ScrollView contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps='handled'>
                <KeyboardAvoidingView style={{flex:1, marginHorizontal:20}} behavior='padding'>
                    <View  style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                        <Text style={styles.titleText}>Simply Run</Text>
                    </View>

                    <View style={{flex:2}}>
                        <TextInput
                            placeholder="Email"
                            value={this.state.email}
                            onChangeText={(text) => this.setState({email:text})}
                            autoCapitalize='none'
                            returnKeyType={'next'}
                            onSubmitEditing={() => { this.passwordInput.focus(); }}
                            keyboardType='email-address'
                            style={styles.textInput}
                        />
                        <TextInput
                            placeholder="Password" 
                            value={this.state.password}
                            onChangeText={(text) => this.setState({password:text})}
                            secureTextEntry
                            autoCapitalize='none'
                            returnKeyType={'next'}
                            ref={(input) => { this.passwordInput = input; }}
                            onSubmitEditing={() => {this.confirm.focus()}}
                            keyboardType='email-address'
                            style={styles.textInput}
                        />
                        <TextInput
                            placeholder="Confirm Password" 
                            value={this.state.confirmPassword}
                            onChangeText={(text) => this.setState({confirmPassword:text})}
                            secureTextEntry
                            autoCapitalize='none'
                            returnKeyType={'done'}
                            ref={(input) => { this.confirm = input; }}
                            keyboardType='email-address'
                            style={styles.textInput}
                        />
                        <TouchableOpacity onPress={() => this.signUp(this.state.email, this.state.password, this.state.confirmPassword)}>
                            <View style={styles.inputButton}>
                                <Text style={{fontSize:20,color:'black'}}>Sign Up!</Text>
                            </View>
                        </TouchableOpacity>

                        {/*DEVELOPER BUTTON FOR SKIPPING CREATE ACCOUNT*/}
                        <TouchableOpacity onPress={() => this.DEV_SKIP_ACCOUNT()}>
                            <View style={{height:50, maxHeight:50, backgroundColor:"red", padding:8, justifyContent:'center', alignItems:'center'}}>
                                <Text style={{fontSize:20,color:'white'}}>DEV:Skip Account</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </KeyboardAvoidingView>
            </ScrollView>
        )
    }
}

export default connect()(CreateAccount);

const styles = StyleSheet.create({
    textInput: {
      borderWidth: 1,
      borderColor: 'lightgrey',
      height:50,
      maxHeight:50,
      justifyContent:'center',
      padding:5,
    },
    inputButton: {
        height:50,
        backgroundColor: 'lightblue',
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:15,
    },
    titleText: {
        fontSize:40,
        fontWeight:'bold',
        fontStyle:'italic',
    }
  });