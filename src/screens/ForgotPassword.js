import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert, StyleSheet, KeyboardAvoidingView} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import firebase from 'firebase';
import firebaseConfig from '../config/firebaseConfig'
import { connect } from 'react-redux'
import {addRunAction} from '../actions/RunLogAction'
import {createLoginAction} from '../actions/UserAuthenticationAction'
import {updateAllPersonalInfoAction} from '../actions/PersonalInfoAction'
import {updateAllSettingsAction} from '../actions/SettingsAction'

//Firebase initialzation 
firebaseConfig

class ForgotPassword extends Component {
    state = {
        email:null,
        // password:null,
        // confirm:null,
        // code:null,

        emailValid:false,
        // passwordValid:false,
        // confirmValid:false,
        // codeValid:false,

        // sent:false,
        // verified:false,
        
    }

    sendResetEmail = () => {
        // Steps: Send reset email
        if (this.state.emailValid) {
            // ERROR IN DOCUMENTATION: THIS METHOD IS SUPPOSED TO SEND A RESET CODE TO THE PROVIDED EMAIL,
            // BUT INSTEAD SENDS A LINK FROM WHICH THE USER CAN CHANGE THEIR PASSWORD... WORKS BUT NOT AS EXPECTED.

            firebase.auth().sendPasswordResetEmail(this.state.email)
            .then(() => {
                Alert.alert("A link to reset your password was sent to the email you provided.")
                this.props.navigation.navigate("Login")
            })
            .catch((error) => {
                console.log(error)
                Alert.alert(error.message)
            })
        }
    }

    confirmResetCode = () => {
        this.setState({
            verified:true,
        })
    }

    // changePassword = () => {
    //     this.props.navigation.navigate("Login")
    // }

    updateEmail = (text) => {
        if (text != null && text.trim() != "" && text.length >= 8) {
            this.setState({email:text, emailValid:true})
        } else {
            this.setState({email:text, emailValid:false})
        }
    }
    // updatePassword = (text) => {
    //     if (text != null && text.trim() != "" && text.length >= 8) {
    //         this.setState({password:text, passwordValid:true})
    //     } else {
    //         this.setState({password:text, passwordValid:false})
    //     }
    // }
    // updateConfirm = (text) => {
    //     if (text != null && text.trim() != "" && text.length >= 8) {
    //         this.setState({confirmPassword:text, confirmValid:true})
    //     } else {
    //         this.setState({confirmPassword:text, confirmValid:false})
    //     }
    // }
    // updateCode = (text) => {
    //     if (text != null && text.trim() != "" && text.length == 6) {
    //         this.setState({code:text, codeValid:true})
    //     } else {
    //         this.setState({code:text, codeValid:false})
    //     }
    // }

    render() {
        return (
            <ScrollView contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps='handled'>
                <KeyboardAvoidingView style={{flex:1, marginHorizontal:20}} behavior='padding'>
                    {/*SIMPLY RUN*/}
                    <View  style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                        <Text style={styles.titleText}>Simply Run</Text>
                    </View>
                    <View style={{flex:2}}>

                    <View style={{justifyContent:'center', alignItems:'center', height:75, paddingHorizontal:20}}>

                        <Text style={{fontSize:18, textAlign:'center'}}>Enter the email you use for your Simply Run account.</Text>

                        </View>
                        {/*TextInput for email address OR reset code*/}
                        <TextInput
                            placeholder="Email"
                            value={this.state.email}
                            onChangeText={(text) => this.updateEmail(text.trim())}
                            autoCapitalize='none'
                            returnKeyType={"done"}
                            keyboardType='email-address'
                            style={styles.textInput}
                        />

                        {/*Button entering for sending OR verifying the reset code */}
                        <TouchableOpacity 
                            onPress={() => this.sendResetEmail()}
                            disabled={(this.state.emailValid ? false : true)}>
                            <View style={{
                                height:50,
                                backgroundColor: (this.state.emailValid  ? "lightblue" : "lightgray"),
                                justifyContent:'center',
                                alignItems:'center',
                                paddingHorizontal:15}}>
                                <Text style={{fontSize:20,color:'black'}}>Send Reset Email</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    
                    
                </KeyboardAvoidingView>
            </ScrollView>
        );
    }
}

export default connect()(ForgotPassword)

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

//   {this.state.verified ? (
//     // ENTER AND CONFIRM NEW PASSWORD
//     <View style={{flex:2}}>
//         {/*TextInput for new password*/}
//         <View style={{justifyContent:'center', alignItems:'center', height:75, paddingHorizontal:20}}>
//             <Text style={{fontSize:18, textAlign:'center'}}>Enter the a new password for your account.</Text>
//         </View>
//         <TextInput
//             placeholder="Enter new password" 
//             value={this.state.password}
//             onChangeText={(text) => this.updatePassword(text.trim())}
//             secureTextEntry
//             autoCapitalize='none'
//             returnKeyType={'next'}
//             onSubmitEditing={() => {this.confirm.focus()}}
//             keyboardType='email-address'
//             style={styles.textInput}
//         />

//         {/*TextInput for confirmPassword*/}
//         <TextInput
//             placeholder="Confirm new password" 
//             value={this.state.confirmPassword}
//             onChangeText={(text) => this.updateConfirm(text.trim())}
//             secureTextEntry
//             autoCapitalize='none'
//             returnKeyType={'done'}
//             ref={(input) => { this.confirm = input; }}
//             keyboardType='email-address'
//             style={styles.textInput}
//         />

//         {/*Button for resetting user's forgotten password*/}
//         <TouchableOpacity 
//             onPress={() => this.changePassword()}
//             disabled={(this.state.passwordValid && this.state.confirmValid ? false : true)}>
//             <View style={{
//                 height:50,
//                 backgroundColor: (this.state.passwordValid && this.state.confirmValid  ? "lightblue" : "lightgray"),
//                 justifyContent:'center',
//                 alignItems:'center',
//                 paddingHorizontal:15,}}>
//                 <Text style={{fontSize:20,color:'black'}}>Reset Password</Text>
//             </View>
//         </TouchableOpacity>
//     </View>
// ) : (
//     // SEND EMAIL RESET CODE
    // <View style={{flex:2}}>
    //     {/*Help Text*/}
    //     <View style={{justifyContent:'center', alignItems:'center', height:75, paddingHorizontal:20}}>
    //         {this.state.sent ? (
    //             <Text style={{fontSize:18, textAlign:'center'}}>Enter the reset code sent to the email you provided.</Text>
    //         ) : (
    //             <Text style={{fontSize:18, textAlign:'center'}}>Enter the email you use for your Simply Run account.</Text>
    //         )}
            
    //     </View>
    //     {/*TextInput for email address OR reset code*/}
    //     <TextInput
    //         placeholder={this.state.sent ? "Code" : "Email"}
    //         value={this.state.sent ? this.state.code : this.state.email}
    //         onChangeText={(text) => this.state.sent ? this.updateCode(text.trim()) : this.updateEmail(text.trim())}
    //         autoCapitalize='none'
    //         returnKeyType={"done"}
    //         keyboardType='email-address'
    //         style={styles.textInput}
    //     />
    //     {/*Button entering for sending OR verifying the reset code */}
    //     <TouchableOpacity 
    //         onPress={() => this.state.sent ? this.confirmResetCode() : this.sendResetEmail()}
    //         disabled={((this.state.codeValid && this.state.sent) || (this.state.emailValid & !this.state.sent) ? false : true)}>
    //         <View style={{
    //             height:50,
    //             backgroundColor: ((this.state.codeValid && this.state.sent) || (this.state.emailValid & !this.state.sent) ? "lightblue" : "lightgray"),
    //             justifyContent:'center',
    //             alignItems:'center',
    //             paddingHorizontal:15,}}>
    //             <Text style={{fontSize:20,color:'black'}}>{this.state.sent ? "Verify Code" : "Send Reset Code"}</Text>
    //         </View>
    //     </TouchableOpacity>
    // </View>
// )}