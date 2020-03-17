import React, { Component } from 'react';
import { TextInput, Text, View, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import firebase from 'firebase';
import firebaseConfig from '../config/firebaseConfig'

//References to the root of the firestore database
const firestore = firebase.firestore();
//Firebase initialzation 
firebaseConfig

export default class editSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            feet: "",
            inches: "",
            weight: "",
            sex: "",
            month: "",
            day: "",
            year: ""
        };
    }

    componentDidMount() {
        var ref = firestore.collection('users').doc('fullerTest');
        ref.get().then(testData => {
            var date = new Date((testData.data().birthday.seconds)*1000);
            this.setState({
                name: testData.data().name,
                feet: Math.floor(testData.data().height/12),
                inches: testData.data().height%12,
                weight: testData.data().weight,
                sex: testData.data().sex,
                year: date.getFullYear(),
                month: date.getMonth() + 1,
                day: date.getDate()
            })
        })
    }
    
    getMonth = (num) => {
        if (num == 0) {
            return "January";
        } else if (num == 1) {
            return "February";
        } else if (num == 2) {
            return "March";
        } else if (num == 3) {
            return "April";
        } else if (num == 4) {
            return "May";
        } else if (num == 5) {
            return "June";
        } else if (num == 6) {
            return "July";
        } else if (num == 7) {
            return "August";
        } else if (num == 8) {
            return "September";
        } else if (num == 9) {
            return "October";
        } else if (num == 10) {
            return "November";
        } else if (num == 11) {
            return "December";
        }
    }

    sendToFirebase = () => {
        var dateString = this.getMonth(this.state.month - 1) + " " + this.state.day + ", " + this.state.year;
        firestore.collection('users').doc('fullerTest').set({
            name: this.state.name,
            height: +(this.state.feet * 12) + +this.state.inches,
            weight: this.state.weight,
            sex: this.state.sex,
            birthday: new Date(dateString)
        })
    }

    render() {
        return (
            <ScrollView>
                <View>
                    <Text>THIS IS THE EDIT SCREEN</Text>
                    <View style={styles.row}>
                        <Text>Name:</Text> 
                        <TextInput
                            style={{ height: 31, width: '70%', borderColor: 'gray', borderWidth: 1, margin: 2}}
                            onChangeText={text => this.setState({name: text})}
                            textAlign={'center'}
                            value={this.state.name}
                            placeholder="Name"
                        />
                    </View>
                    <View style={styles.row}>
                        <Text>Height:</Text> 
                        <TextInput
                            style={{ height: 31, width: '12%', borderColor: 'gray', borderWidth: 1, margin: 2}}
                            onChangeText={text => this.setState({feet: text})}
                            textAlign={'center'}
                            value={this.state.feet.toString()}
                            placeholder="Feet"
                        />
                        <Text>Feet</Text>
                        <TextInput
                            style={{ height: 31, width: '12%', borderColor: 'gray', borderWidth: 1, margin: 2}}
                            onChangeText={text => this.setState({inches: text})}
                            textAlign={'center'}
                            value={this.state.inches.toString()}
                            placeholder="Inches"
                        />
                        <Text>Inches</Text>
                    </View>
                    <View style={styles.row}>
                        <Text>Weight:</Text> 
                        <TextInput
                            style={{ height: 31, width: '15%', borderColor: 'gray', borderWidth: 1, margin: 2}}
                            onChangeText={text => this.setState({weight: text})}
                            textAlign={'center'}
                            value={this.state.weight.toString()}
                            placeholder="Weight"
                        />
                        <Text>lbs</Text> 
                    </View>
                    <View style={styles.row}>
                        <Text>Sex:</Text> 
                        <TextInput
                            style={{ height: 31, width: '15%', borderColor: 'gray', borderWidth: 1, margin: 2}}
                            onChangeText={text => this.setState({sex: text})}
                            textAlign={'center'}
                            value={this.state.sex}
                            placeholder="Sex"
                        />
                    </View>
                    <View style={styles.row}>
                        <Text>Birthday:</Text> 
                        <Text>Month:</Text> 
                        <TextInput
                            style={{ height: 31, width: '15%', borderColor: 'gray', borderWidth: 1, margin: 2}}
                            onChangeText={text => this.setState({month: text})}
                            textAlign={'center'}
                            value={this.state.month.toString()}
                            placeholder="Month"
                        />
                        <Text>Day:</Text> 
                        <TextInput
                            style={{ height: 31, width: '15%', borderColor: 'gray', borderWidth: 1, margin: 2}}
                            onChangeText={text => this.setState({day: text})}
                            textAlign={'center'}
                            value={this.state.day.toString()}
                            placeholder="Day"
                        />
                        <Text>Year:</Text> 
                        <TextInput
                            style={{ height: 31, width: '15%', borderColor: 'gray', borderWidth: 1, margin: 2}}
                            onChangeText={text => this.setState({year: text})}
                            textAlign={'center'}
                            value={this.state.year.toString()}
                            placeholder="Year"
                        />
                    </View>
                    <View style={styles.row}>
                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={() => {
                                this.sendToFirebase();
                                this.props.navigation.navigate('SETTINGS');
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
      }
});