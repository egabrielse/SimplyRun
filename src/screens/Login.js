import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert, StyleSheet, Button, KeyboardAvoidingView} from 'react-native';
import firebase from 'firebase';
import firebaseConfig from '../config/firebaseConfig'
import { connect } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler';
import {createLoginAction} from '../actions/UserAuthenticationAction'
import {updateAllPersonalInfoAction} from '../actions/PersonalInfoAction'
import {updateAllSettingsAction} from '../actions/SettingsAction'

//References to the root of the firestore database
const firestore = firebase.firestore();
//Firebase initialzation 
firebaseConfig

class Login extends Component {
    state = {
        email:null,
        password:null,
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

    signIn = () => {
        console.log("Login: Attempting to sign in existing user")
        let e = this.state.email
        let p = this.state.password

        // Login existing user with given username and password
        if (e != null && p != null && e.trim() != "" && p != "") {
            firebase
                .auth()
                .signInWithEmailAndPassword(e, p)
                .then(() => {
                    console.log("Login: Successfully signed in existing user!")
                    let user = firebase.auth().currentUser

                    // Fetch user data from the database
                    console.log("Login: Attempting to fetch user data for user with uid=", user.uid)
                    let userRef = firestore.collection('users').doc(user.uid)
                    userRef.get()
                    .then((doc) => {
                        if (doc.exists){
                            console.log("Login: Successfully fetched user data for user with uid=", user.uid)
                            let userData = doc.data()

                            // Update login info in store
                            this.props.dispatch(createLoginAction(user))
                            // Update all personal info in store
                            this.props.dispatch(updateAllPersonalInfoAction(userData.personal))
                            // Update all settings info in store 
                            this.props.dispatch(updateAllSettingsAction(userData.settings))

                            // Navigate to 'Main'
                            this.props.navigation.navigate("Main")

                        } else {
                            console.log("Login: User data for user with uid=", user.uid, "not found")
                            return
                        }
                    })
                    .catch((error) => {
                        console.log("Login: Error fetching user data:", error.message)
                        Alert.alert(error.message)
                        return
                    })
                })
                .catch((error) => {
                    console.log("Login: Error signing in user:", error.message)
                    Alert.alert(error.message)
                    return
                });

                // Reset Login's state
                this.setState({email:null, password:null, emailValid:false, passwordValid:false})


        } else {
            console.log("Login: One of the fields (email, password) is empty")
            Alert.alert("Please provide a email address and password")
            return
        }
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
                    {/*SIMPLY RUN*/}
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
                            onSubmitEditing={() => {this.signIn()}}
                            keyboardType='email-address'
                            secureTextEntry
                            style={styles.textInput}
                        />


                        {/*Button for signing user*/}
                        <TouchableOpacity 
                            onPress={() => this.signIn()}
                            disabled={(this.state.emailValid && this.state.passwordValid ? false : true)}>
                            <View style={{
                                height:50,
                                backgroundColor: (this.state.emailValid && this.state.passwordValid ? "lightblue" : "lightgray"),
                                justifyContent:'center',
                                alignItems:'center',
                                paddingHorizontal:15,}}>
                                <Text style={{fontSize:20,color:'black'}}>Sign In!</Text>
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