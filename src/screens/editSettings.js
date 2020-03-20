import React, { Component } from 'react';
import { TextInput, Text, View, Button, StyleSheet, TouchableOpacity, Switch, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ModalDropdown from 'react-native-modal-dropdown';
import firebase from 'firebase';
import {months, days, years} from '../constants/Date';
import firebaseConfig from '../config/firebaseConfig';
import { connect } from 'react-redux';
import {updateAllPersonalInfoAction} from '../actions/PersonalInfoAction';
import {updateAllSettingsAction} from '../actions/SettingsAction';
import {convertInchesToCentimeters, convertPoundsToKilograms, convertCentimetersToInches, 
    convertKilogramsToPounds} from '../constants/ConversionFunctions';

//References to the root of the firestore database
const firestore = firebase.firestore();
//Firebase initialzation 
firebaseConfig

class editSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            email: this.props.email,
            ftm: "",
            incm: "",
            weight: "",
            sex: this.props.sex,
            month: "",
            day: "",
            year: "",
            display_time_switch: this.props.display_time,
            display_pace_switch: this.props.display_pace,
            display_distance_switch: this.props.display_distance,
            display_calories_switch: this.props.display_calories,
            metric: this.props.metric,
            update_frequency: this.props.update_frequency.toString()
        };
    }

    componentDidMount() {
            var date = new Date((this.props.birthday)*1000);
            var big = "";
            var little = "";
            var w = "";
            // determine ftm/incm and weight based on imperial/metric
            if(this.props.metric) {
                var h = convertInchesToCentimeters(this.props.height);
                big = Math.floor(h / 100).toString();
                little = Math.floor(h % 100).toString();
                w = convertPoundsToKilograms(this.props.weight.toString());
            } else {
                big = Math.floor(this.props.height / 12).toString();
                little = Math.floor(this.props.height % 12).toString();
                w = this.props.weight.toString();
            }
            this.setState({
                ftm: big,
                incm: little,
                weight: w,
                year: date.getFullYear().toString(),
                month: months[date.getMonth()], 
                day: date.getDate().toString()
            })
    }
    
    convertMeasurementsToHeight = (ftm, incm) => {
        if (this.state.metric) {
            // User chose metric
            return (+(100 * ftm) + +incm)

        } else {
            // User chose imperial
            return (+(12*ftm) + +incm)
        }
    }

    sendToFirebase = () => {
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
            email: this.state.email,
            sex: this.state.sex,
            height: ((this.state.metric) ? convertCentimetersToInches(this.convertMeasurementsToHeight(this.state.ftm, this.state.incm))
                : this.convertMeasurementsToHeight(this.state.ftm, this.state.incm)),
            weight: ((this.state.metric) ? convertKilogramsToPounds(this.state.weight) : this.state.weight),
            birthday: (new Date(this.state.month + " " + this.state.day + ", " + this.state.year)),
        }
        let settings = {
            metric: this.state.metric,
            update_frequency: this.state.update_frequency,
            display_time: this.state.display_time_switch,
            display_distance: this.state.display_distance_switch,
            display_pace: this.state.display_pace_switch,
            display_calories: this.state.display_calories_switch,
        }

        firestore.collection('users').doc(user.uid)
        .update({ personal, settings})
        .then(() => {
            console.log("Successfully updated settings")

            // put it into format to make redux happy
            personal.birthday = {
                seconds: personal.birthday.getTime() / 1000
            }

            // Update all personal info in store
            this.props.dispatch(updateAllPersonalInfoAction(personal))
            // Update all settings info in store 
            this.props.dispatch(updateAllSettingsAction(settings))

            this.props.navigation.navigate('SETTINGS');
            console.log(this.props);
        }).catch(function(error) {
            console.log("InputPersonalInfo:", error.message)
            Alert.alert(error.message);
        })
    }

    render() {
        return (
            <ScrollView>
                <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
                <Text>Name:</Text>
                    <TextInput
                        style={{ height: 31, width: '25%', borderColor: 'gray', borderWidth: 1, margin: 2}}
                        textAlign={'center'}
                        value={this.state.name}
                        onChangeText={(text) => this.setState({name:text})}
                        placeholder = "Name"
                    />
                </View>

                <View>
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
                                defaultValue={this.state.month}
                                textStyle={{fontSize:20}}
                                style={{fontSize:18, flex:1, borderColor:'lightgray', borderWidth:1, height:50, alignItems:'center', justifyContent:'center'}}
                                dropdownTextStyle={{fontSize:18}}
                                options={months}
                                onSelect={(index, value) => this.setState({month:value})}/>
                            <ModalDropdown
                                defaultValue={this.state.day}
                                textStyle={{fontSize:20}}
                                style={{fontSize:18, flex:1, borderColor:'lightgray', borderWidth:1, height:50, alignItems:'center', justifyContent:'center'}}
                                dropdownTextStyle={{fontSize:18}}
                                options={days}
                                onSelect={(index, value) => this.setState({day:value})}/>
                            <ModalDropdown
                                defaultValue={this.state.year}
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
                    <View style={styles.row}>
                        <Text>Update Frequency:</Text> 
                        <TextInput
                            style={{ height: 31, width: '15%', borderColor: 'gray', borderWidth: 1, margin: 2}}
                            onChangeText={text => this.setState({update_frequency: text})}
                            textAlign={'center'}
                            value={this.state.update_frequency}
                            placeholder="Update Frequency"
                        />
                    </View>
                    <Text>Stats to Display on Run Screen:</Text>
                    <View style={styles.row}>
                        <Text>Time: </Text>
                        <Switch  
                            value={this.state.display_time_switch}  
                            onValueChange ={(value) => {
                                this.setState({display_time_switch: value})
                            }}/>
                    </View>
                    <View style={styles.row}>
                        <Text>Distance: </Text>
                        <Switch  
                            value={this.state.display_distance_switch}  
                            onValueChange ={(value) => {
                                this.setState({display_distance_switch: value})
                            }}/>
                    </View>
                    <View style={styles.row}>
                        <Text>Pace: </Text>
                        <Switch  
                            value={this.state.display_pace_switch}  
                            onValueChange ={(value) => {
                                this.setState({display_pace_switch: value})
                            }}/>
                    </View>
                    <View style={styles.row}>
                        <Text>Calories: </Text>
                        <Switch  
                            value={this.state.display_calories_switch}  
                            onValueChange ={(value) => {
                                this.setState({display_calories_switch: value})
                            }}/>
                    </View>
                    <View style={styles.row}>
                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={() => {
                                this.sendToFirebase();
                                }
                            }>
                            <Text style={styles.buttonText}>Save Changes</Text>
                        </TouchableOpacity>
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

        display_calories: state.SettingsReducer.display_calories,
        display_distance: state.SettingsReducer.display_distance,
        display_pace: state.SettingsReducer.display_pace,
        display_time: state.SettingsReducer.display_time,
        metric: state.SettingsReducer.metric,
        update_frequency: state.SettingsReducer.update_frequency,
    }
}

export default connect(mapStateToProps)(editSettings);

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: "row"
      },
    saveButton: {
        marginRight:40,
        marginLeft:40,
        marginTop:10,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:'#1E6738',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff'
      },
    cancelButton: {
        marginRight:40,
        marginLeft:40,
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
      },
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