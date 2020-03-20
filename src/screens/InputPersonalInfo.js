import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert, StyleSheet, KeyboardAvoidingView} from 'react-native';
import firebase from 'firebase';
import firebaseConfig from '../config/firebaseConfig'
import { connect } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler';
import ModalDropdown from 'react-native-modal-dropdown';
import {months, days, years} from '../constants/Date'
import {updateAllPersonalInfoAction} from '../actions/PersonalInfoAction'
import {updateAllSettingsAction} from '../actions/SettingsAction'
import {convertCentimetersToInches, convertKilogramsToPounds} from '../constants/ConversionFunctions'

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
        sex:"male",
        month:null,
        day:null,
        year:null,
    }

    convertHeightToInches = (ftm, incm) => {
        if (this.state.metric) {
            console.log("InputPersonalInfo: convertHeightToInches (Metric)")
            let inches = convertCentimetersToInches(Number(+(100 * ftm) + +incm))
            return inches

        } else {
            console.log("InputPersonalInfo: convertHeightToInches (Imperial)")
            return Number(+(12*ftm) + +incm)
        }
    }

    convertWeightToPounds = (weight) => {
        if (this.state.metric) {
            console.log("InputPersonalInfo: convertWeightToPounds (Metric)")
            let pounds = convertKilogramsToPounds(Number(weight))
            return pounds

        } else {
            console.log("InputPersonalInfo: convertWeightToPounds (Imperial)")
            return Number(weight)
        }
    }

    submit = () => {
        console.log("InputPersonalInfo: Attempting to add user's personal info to firestore")

        if (this.state.name === null) {
            console.log("InputPersonalInfo: name is null")
            Alert.alert("Please provide a name.")
            return
        }
        if (this.state.ftm === null || this.state.incm === null) {
            console.log("InputPersonalInfo: ftm and/or incm are/is null")
            Alert.alert("Please provide a height.")
            return
        }
        if (this.state.ftm === null || this.state.incm === null) {
            console.log("InputPersonalInfo: ftm and/or incm are/is null")
            Alert.alert("Please provide a weight.")
            return
        }
        
        if (this.state.month === null || this.state.day === null || this.state.year === null) {
            console.log("InputPersonalInfo: month and/or day and/or year are/is null")
            Alert.alert("Please provide a full birth date.")
            return
        }

        let user = firebase.auth().currentUser;
        let personal = {
            name: this.state.name,
            email: user.email,
            sex: this.state.sex,
            height: this.convertHeightToInches(this.state.ftm, this.state.incm),
            weight: this.convertWeightToPounds(this.state.weight),
            birthday: (new Date(this.state.month + " " + this.state.day + ", " + this.state.year)),
        }
        let settings = {
            metric: this.state.metric,
            update_frequency:0,
            display_time:false,
            display_distance:false,
            display_pace:false,
            display_calories:false,
        }

        console.log("InputPersonalInfo: personal:",personal,"settings:",settings)

        firestore.collection('users').doc(user.uid)
        .set({ personal, settings})
        .then(() => {
            console.log("InputPersonalInfo: Successfully added user's personal info to firestore")

            // Update all personal info in store
            this.props.dispatch(updateAllPersonalInfoAction(personal))
            // Update all settings info in store 
            this.props.dispatch(updateAllSettingsAction(settings))
            // Navigate to 'Main'
            this.props.navigation.navigate("Main")

            // Reset InputPersoanlInfo's state
            this.setState({metric:false,name:null,ftm:null,incm:null,weight:null,sex:'male',month:null,day:null,year:null,})
            
        }).catch(function(error) {
            console.log("InputPersonalInfo:", error.message)
            Alert.alert(error.message);
        })
    }


    render() {
        return (
            <ScrollView contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps='handled'>
                <KeyboardAvoidingView style={{flex:1, marginHorizontal:20}} behavior='padding'>
                    {/*SIMPLY RUN*/}
                    <View  style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                        <Text style={styles.titleText}>Simply Run</Text>
                    </View>

                    <View style={{flex:1}}>

                        {/*TextInput for user's name*/}
                        <View style={{minHeight:50, maxHeight:50}}>
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
                        <View style={{ minHeight:25, flexDirection:'row', justifyContent:'center',alignItems:'center', paddingTop:10}}>
                            <Text style={{flex:1, alignContent:'center', justifyContent:'center'}}>Preferred Meaurement System:</Text>
                        </View>
                        <View style={{ minHeight:50, flexDirection:'row'}}>
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


                        {/*TextInput for inputing user's birthday (used for calculating age)*/}
                        <View style={{ minHeight:25, flexDirection:'row', justifyContent:'center',alignItems:'center', paddingTop:10}}>
                            <Text style={{flex:1, alignContent:'center', justifyContent:'center'}}>Birth Date:</Text>
                        </View>
                        <View style={{ minHeight:50, flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
                            <ModalDropdown
                                defaultValue={"Month"}
                                textStyle={{fontSize:20}}
                                style={{fontSize:18, flex:1, borderColor:'lightgray', borderWidth:1, height:50, alignItems:'center', justifyContent:'center'}}
                                dropdownTextStyle={{fontSize:18}}
                                options={months}
                                onSelect={(index, value) => this.setState({month:value})}/>
                            <ModalDropdown
                                defaultValue={"Day"}
                                textStyle={{fontSize:20}}
                                style={{fontSize:18, flex:1, borderColor:'lightgray', borderWidth:1, height:50, alignItems:'center', justifyContent:'center'}}
                                dropdownTextStyle={{fontSize:18}}
                                options={days}
                                onSelect={(index, value) => this.setState({day:value})}/>
                            <ModalDropdown
                                defaultValue={"Year"}
                                textStyle={{fontSize:20}}
                                style={{fontSize:18, flex:1, borderColor:'lightgray', borderWidth:1, height:50, alignItems:'center', justifyContent:'center'}}
                                dropdownTextStyle={{fontSize:18}}
                                options={years}
                                onSelect={(index, value) => this.setState({year:value})}/>
                        </View>


                        {/*TextInputs for inputing user's height*/}
                        <View style={{ minHeight:25, flexDirection:'row', justifyContent:'center',alignItems:'center', paddingTop:10}}>
                            <Text style={{flex:4, alignContent:'center', justifyContent:'center'}}>Height:</Text>
                            <Text style={{flex:2, alignContent:'center', justifyContent:'center', paddingLeft:10}}>Weight:</Text>
                        </View>
                        <View style={{flexDirection:'row', minHeight:50, justifyContent:'center', alignItems:'center'}}>
                            {/*TextInput for feet or meters*/}
                            <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
                                <TextInput
                                    value={this.state.ftm}
                                    onChangeText={(text) => this.setState({ftm:text})}
                                    keyboardType='number-pad'
                                    style={styles.inputNumber}
                                />
                                <Text>{(this.state.metric ? "m" : "ft")}</Text>
                            </View>
                            {/*TextInput for inches or centimeters*/}
                            <View style={{flex:1, flexDirection:'row', alignItems:'center', paddingRight:20}}>
                                <TextInput
                                    value={this.state.incm}
                                    onChangeText={(text) => this.setState({incm:text})}
                                    keyboardType='number-pad'
                                    style={styles.inputNumber}
                                />
                                <Text>{(this.state.metric ? "cm" : "in")}</Text>
                            </View>
                            {/*TextInput for kilograms or pounds*/}
                            <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
                                <TextInput
                                    value={this.state.weight}
                                    onChangeText={(text) => this.setState({weight:text})}
                                    keyboardType='number-pad'
                                    style={styles.inputNumber}
                                />
                                <Text>{(this.state.metric ? "kg" : "lb")}</Text>
                            </View>
                        </View>


                        {/*Buttons for inputing user's sex*/}
                        <View style={{ minHeight:25, flexDirection:'row', justifyContent:'center',alignItems:'center', paddingTop:10}}>
                            <Text style={{flex:1, alignContent:'center', justifyContent:'center'}}>Sex:</Text>
                        </View>
                        <View style={{ minHeight:50, flexDirection:'row'}}>
                            {/*Male Button*/}
                            <View style={{flex:1}}>
                                <TouchableOpacity 
                                    onPress={() => this.setState({sex:"male"})}
                                    disabled={(this.state.sex === "male" ? true : false)}>
                                    <View style={{
                                            backgroundColor:(this.state.sex === "male" ? 'lightgreen': 'lightgray'),
                                            height:50,
                                            justifyContent:'center',
                                            alignItems:'center',
                                            paddingHorizontal:15}}>
                                        <Text value={true} style={{fontSize:20,color:(this.state.sex === "male" ? 'black': 'darkgray')}}>Male</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            {/*Female Button*/}
                            <View style={{flex:1}}>
                                <TouchableOpacity
                                    onPress={() => this.setState({sex:"female"})}
                                    disabled={(this.state.sex ? false : true)}>
                                    <View style={{
                                            backgroundColor:(this.state.sex === "male" ? 'lightgray': 'lightgreen'),
                                            height:50,
                                            justifyContent:'center',
                                            alignItems:'center',
                                            paddingHorizontal:15}}>
                                        <Text value={false} style={{fontSize:20,color:(this.state.sex === 'male' ? 'darkgray': 'black')}}>Female</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>


                        {/*Submit Button*/}
                        <View style={{minHeight:50,maxHeight:50, paddingTop:20}}>
                            <TouchableOpacity onPress={() => this.submit()}>
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
        minHeight:50,
        maxHeight:50,
        width:85,
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