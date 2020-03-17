import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert, StyleSheet, KeyboardAvoidingView} from 'react-native';
import firebase from 'firebase';
import firebaseConfig from '../config/firebaseConfig'
import { connect } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler';

//References to the root of the firestore database
const firestore = firebase.firestore();
//Firebase initialzation 
firebaseConfig

class InputPersonalInfo extends Component {
    state = {
        metric:true,
        name:null,
        ftm:null,
        incm:null,
        weight:null,
        age:null,
    }

    convertMeasurementsToHeight = (ftm, incm) => {
        if (this.state.metric) {
            console.log("InputPersonalInfo: convertMeasurementsToHeight Metric Conversion")
            // User chose metric
            return (100 * ftm) + incm

        } else {
            // User chose imperial
            console.log("InputPersonalInfo: convertMeasurementsToHeight Imperial Conversion")
            return ((12*ftm) + incm)
        }
    }

    submit = (n, w, a, h) => {
        console.log("InputPersonalInfo: Adding user's personal info to firestore")
        let user = firebase.auth().currentUser

        if (n != null && w != null && a != null && h != null && user != 'undefined') {

            firestore.collection('users').doc(user.uid).set({
                email:user.email,
                name:n,
                age:a,
                height:h,
                weight:w,
            }).then(() => {
                console.log("InputPersonalInfo: Successfully Added user's info to firestore")
                this.props.navigation.navigate("Main")
            }).catch(function(error) {
                Alert.alert(error.message);
            })
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
                        
                        {/*TextInput for user's name*/}
                        <View style={{minHeight:50, padding:5}}>
                            <TextInput
                                placeholder="Name"
                                value={this.state.name}
                                onChangeText={(text) => this.setState({name:text})}
                                autoCapitalize='words'
                                returnKeyType={"next"}
                                keyboardType='default'
                                style={styles.inputText}
                            />
                        </View>

                        {/*Buttons for choosing Metric vs Imperial Measurements*/}
                        <View style={{ minHeight:50, padding:5, flexDirection:'row'}}>
                            {/*Metric Button*/}
                            <View style={{flex:1}}>
                                <TouchableOpacity 
                                    onPress={() => this.setState({metric:true})}
                                    disabled={(this.state.metric ? true : false)}>
                                    <View style={{
                                            backgroundColor:(this.state.metric ? 'lightgreen': 'lightgray'),
                                            height:50,
                                            justifyContent:'center',
                                            alignItems:'center',
                                            paddingHorizontal:15}}>
                                        <Text value={true} style={{fontSize:20,color:(this.state.metric ? 'black': 'darkgray')}}>Metric</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            {/*Imperial Button*/}
                            <View style={{flex:1}}>
                                <TouchableOpacity
                                    onPress={() => this.setState({metric:false})}
                                    disabled={(this.state.metric ? false : true)}>
                                    <View style={{
                                            backgroundColor:(this.state.metric ? 'lightgray': 'lightgreen'),
                                            height:50,
                                            justifyContent:'center',
                                            alignItems:'center',
                                            paddingHorizontal:15}}>
                                        <Text value={false} style={{fontSize:20,color:(this.state.metric ? 'darkgray': 'black')}}>Imperial</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/*TextInpus for inputing user's Age and Weight*/}
                        <View style={{flexDirection:'row', padding:5}}>
                            {/*TextInputs for age*/}
                            <View style={{flex:3, flexDirection:'row', alignItems:'center'}}>
                                <Text>Age:</Text>
                                <TextInput
                                    value={this.state.age}
                                    onChangeText={(text) => this.setState({age:text})}
                                    keyboardType='number-pad'
                                    style={styles.inputNumber}
                                />
                            </View>

                            {/*TextInputs for weight in pounds or kilograms*/}
                            <View style={{flex:4, flexDirection:'row', alignItems:'center'}}>
                                <Text>Weight:</Text>
                                <TextInput
                                    value={this.state.weight}
                                    onChangeText={(text) => this.setState({weight:text})}
                                    keyboardType='number-pad'
                                    style={styles.inputNumber}
                                />
                                <Text>{(this.state.metric ? "kg" : "lb")}</Text>
                            </View>
                        </View>

                        {/*TextInputs for inputing user's height*/}
                        <View style={{flexDirection:'row', minHeight:50, padding:5, justifyContent:'center', alignItems:'center'}}>
                            {/*TextInput for feet or meters*/}
                            <View style={{flex:4, flexDirection:'row', alignItems:'center'}}>
                                <Text>Height:</Text>
                                <TextInput
                                    value={this.state.ftm}
                                    onChangeText={(text) => this.setState({ftm:text})}
                                    keyboardType='number-pad'
                                    style={styles.inputNumber}
                                />
                                <Text>{(this.state.metric ? "m" : "ft")}</Text>
                            </View>

                            {/*TextInput for inches or centimeters*/}
                            <View style={{flex:3, flexDirection:'row', alignItems:'center'}}>
                                <TextInput
                                    value={this.state.incm}
                                    onChangeText={(text) => this.setState({incm:text})}
                                    keyboardType='number-pad'
                                    style={styles.inputNumber}
                                />
                                <Text>{(this.state.metric ? "cm" : "in")}</Text>
                            </View>
                        </View>

                        {/*Submit Button*/}
                        <View style={{minHeight:50, padding:5}}>
                            <TouchableOpacity 
                                onPress={() => 
                                this.submit(this.state.name, this.state.weight, this.state.age, 
                                this.convertMeasurementsToHeight(this.state.ftm, this.state.incm))}>
                                <View style={styles.inputButton}>
                                    <Text style={{fontSize:20,color:'black'}}>Submit!</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        );
    }
}

export default connect()(InputPersonalInfo)

const styles = StyleSheet.create({
    inputText: {
        borderWidth: 1,
        borderColor: 'lightgrey',
        height:50,
        maxHeight:50,
        justifyContent:'center',
        padding:8,
        flex:1,
    },
    inputNumber: {
        borderWidth: 1,
        borderColor: 'lightgrey',
        height:50,
        maxHeight:50,
        width:100,
        justifyContent:'center',
    },
    inputButton: {
        height:50,
        backgroundColor: 'lightblue',
        justifyContent:'center',
        alignItems:'center',
    },
    titleText: {
        fontSize:40,
        fontWeight:'bold',
        fontStyle:'italic',
    }
  });