import React, { Component } from 'react';
import { TextInput, Text, View,  StyleSheet, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import firebase from 'firebase';
import firebaseConfig from '../config/firebaseConfig';
import { connect } from 'react-redux';
import {updateEmailAction} from '../actions/PersonalInfoAction';

//References to the root of the firestore database
const firestore = firebase.firestore();
//Firebase initialzation 
firebaseConfig

class updateEmailPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldEmail: this.props.email,
            email:this.props.email,
            password:null,
            confirmPassword:null,
        };
    }

    sendToFirebase = () => {
        let e = this.state.email;
        let p = this.state.password;
        let p2 = this.state.confirmPassword;

        let user = firebase.auth().currentUser;

        // flag variable. Determines whether function should navigate back to settings upon execution
        let toReturn = 1;

        // update email if it changed
        if(e != null && e.trim() != "" && e !== this.state.oldEmail) {
            user.updateEmail(e)
                .then(() => {
                    console.log("Email successfully updated in firebase auth");

                    // get personal info from firebase to quickly update email
                    firestore.collection('users').doc(user.uid).get().then((doc) => {
                        // update firebase, then update redux for email, if changed
                        firestore.collection('users').doc(user.uid)
                        .update({personal: doc.data().personal})
                        .then(() => {
                            console.log("Successfully updated email in firebase")
                            // Update all personal info in store
                            this.props.dispatch(updateEmailAction(e))
                            Alert.alert("Email successfully changed!");
                        }).catch(function(error) {
                            console.log("InputPersonalInfo:", error.message)
                            Alert.alert(error.message);
                            toReturn = 0;
                        })
                    })
                })
                .catch((error) => {
                    Alert.alert(error.message);
                    toReturn = 0;
                });
        } else {
            console.log("User did not attempt to change email.");
        }

        // update password if it changed
        if(p != null && p.trim() != "" && p2 != null && p2.trim() != "") {
            // update password if p and p2 match
            if (p === p2) {
                user.updatePassword(p)
                .then(() => {
                    console.log("Password successfully updated!");
                    Alert.alert("Password successfully updated!");
                })
                .catch((error) => {
                    Alert.alert(error.message);
                    toReturn = 0;
                });
            } else {
                console.log("UpdatePassword: password and confirmPassword do not match.");
                Alert.alert("Passwords do not match.");
                toReturn = 0;
            }
        } else {
            if((p != null && p.trim() != "") || (p2 != null && p2.trim() != "")) {
                console.log("User only filled out one of the password fields.");
                Alert.alert("Please fill out both password boxes if you wish to change your password.")
            } else {
                console.log("User did not attempt to change password.")
            }
        }

        // reset state and return to settings if everything went gracefully
        if(toReturn == 1) {
            this.setState({ oldEmail:e,email:null,password:null,confirmPassword:null})
            this.props.navigation.navigate('SETTINGS');
        }
    }

    render() {
        return (
            <ScrollView>
                <KeyboardAvoidingView style={{flex:1, marginHorizontal:20}} behavior='padding'>
                    {/*TextInput for email*/}
                    <TextInput
                        placeholder="Email"
                        value={this.state.email}
                        onChangeText={(text) => this.setState({email: text})}
                        autoCapitalize='none'
                        returnKeyType={'next'}
                        onSubmitEditing={() => { this.passwordInput.focus(); }}
                        keyboardType='email-address'
                        style={styles.textInput}
                    />

                    <Text style={{fontSize: 11, margin: 5}}>(leave these fields blank if you do not wish to change your password)</Text>

                    {/*TextInput for password*/}
                    <TextInput
                        placeholder="Password" 
                        value={this.state.password}
                        onChangeText={(text) => this.setState({password: text})}
                        secureTextEntry
                        autoCapitalize='none'
                        returnKeyType={'next'}
                        ref={(input) => { this.passwordInput = input; }}
                        onSubmitEditing={() => {this.confirm.focus()}}
                        keyboardType='email-address'
                        style={styles.textInput}
                    />


                    {/*TextInput for confirmPassword*/}
                    <TextInput
                        placeholder="Confirm Password" 
                        value={this.state.confirmPassword}
                        onChangeText={(text) => this.setState({confirmPassword: text})}
                        secureTextEntry
                        autoCapitalize='none'
                        returnKeyType={'done'}
                        ref={(input) => { this.confirm = input; }}
                        keyboardType='email-address'
                        style={styles.textInput}
                    />

                    <View>
                        <View style={styles.row}>
                            {/* Save changes, then navigate back to settings page (called in the send function) */}
                            <TouchableOpacity 
                                onPress={() => this.sendToFirebase()}
                                style={styles.submitButton}>
                                <Text style={styles.buttonText}>Submit Changes</Text>
                            </TouchableOpacity>

                            {/* Cancel changes and navigate back to settings */}
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => {
                                    this.props.navigation.navigate('SETTINGS');
                                    }
                                }>
                                <Text style={styles.buttonText}>Cancel Changes</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        );
    }
}

function mapStateToProps(state) {
    return {
        name: state.PersonalInfoReducer.name,
        email: state.PersonalInfoReducer.email,
        birthday: state.PersonalInfoReducer.birthday,
        height: state.PersonalInfoReducer.height,
        weight: state.PersonalInfoReducer.weight,
        sex: state.PersonalInfoReducer.sex,
    }
}

export default connect(mapStateToProps)(updateEmailPassword);

const styles = StyleSheet.create({
    textInput: {
        borderWidth: 1,
        borderColor: 'lightgrey',
        height:50,
        maxHeight:50,
        justifyContent:'center',
        padding:5,
        margin: 5
    },
    row: {
        flex: 1,
        flexDirection: "row"
      },
    submitButton: {
        marginRight:10,
        marginLeft:20,
        marginTop:10,
        paddingTop:10,
        paddingBottom:10,
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor:"#1E6738"
    },
    cancelButton: {
        marginRight:20,
        marginLeft:10,
        marginTop:10,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#F05353',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff' 
      },
    buttonText: {
        color:'#fff',
        textAlign:'center',
        paddingLeft : 25,
        paddingRight : 25
      }
});