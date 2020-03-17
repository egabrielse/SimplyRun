import React, { Component, } from 'react';
import { Text, View, Button, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import firebaseConfig from '../config/firebaseConfig'
import { connect } from 'react-redux'
import StartButton from "../runbutton/StartButton"
import StopRunButton from "../runbutton/StopRunButton"
//Firebase initialzation 
firebaseConfig

var display = "\n" + "Time:00:00:00"  +
    "\n" + "Distance: 0.0" + "\n" + "Pace: 0.0" + "\n" + "Calories: 0.0 "
class SimplyRun extends Component {

    state = {
        stats: display,
        current: "",
        displayStat: true,
        startRun: true,
        paused: false,
        button: false,
        stopButton: false
    }

    formatStats = () => {
        var formatSec = "" + this.state.sec; formatSec = formatSec.padStart(2, '0');

        var formatMin = "" + this.state.min; formatMin = formatMin.padStart(2, '0')

        var formatHour = "" + this.state.hour; formatHour = formatHour.padStart(2, '0')
        
        this.setState({
            stats: "\n" + "Time" + ":" + formatHour + ":" + formatMin + ":" + formatSec +
                "\n" + "Distance: 0.0" + "\n" + "Pace: 0.0" + "\n" + "Calories: 0.0 ",
        })

    }

    endRun = () => {
        this.setState({ stopButton: false })
        this.setState({ current: "" })
        this.props.navigation.navigate('EndRun');
        var totalTimeSecs = (this.state.hour * 60 * 60) + (this.state.min * 60) + this.state.sec + (this.state.mili / 1000);
        //Using Redux to pass info to the EndRun Screen
        time = this.props.sendRunStats(totalTimeSecs, "Test Ditance", "Test Pace", "Test Calories")
        this.setState({ hour: 0, min: 0, sec: 0, mili: 0 })
        this.formatStats()
        this.setState({ endRun: false })
    } 

    endRunButton = () => {
        Alert.alert(
            'Confirm End Run',
            'Would you like to end your run?',
            [
                { text: 'Yes', onPress: () => { this.endRun() } },
                {
                    text: 'No',
                    style: 'cancel',
                }
            ],
            { cancelable: false },
        );

    }

    start = () => {
        //Get Inital start of run time 
        var startTime = new Date().getTime()
       
        if (!this.state.startRun & this.state.paused) {
            this.setState({paused: false})
        }
        //Run has not started yet
        if (this.state.startRun) {
            this.setState({ current: "Tracking Run" })
            this.setState({ button: true, stopButton: true, startRun: false})
       
            this.intervalID = setInterval(() => {
                var diff = startTime - new Date().getTime();
                var hr = Math.floor(-diff / 3600000)
                var mili = -diff - 3600000 * hr
                var min = Math.floor(mili / 60000);
                mili = mili - 60000 * min;
                var sec = mili / 1000;
                mili = mili - 1000 & sec;
                min = min.toFixed(0);
                sec = sec.toFixed(0);
                this.setState({ hour: parseInt(hr), min: parseInt(min), sec: parseInt(sec), mili: parseInt(mili) })
                this.formatStats()
            }, 1);
        } else {           
            if (this.state.paused) {
                this.setState({ current: "Tracking Run" })
                var pauseSec = this.state.sec;
                var pauseMin = this.state.min;
                var pauseHour = this.state.hour;
               
                this.intervalID = setInterval(() => {
                    this.setState({ button: true })
                    var diff = startTime - new Date().getTime();
                    var hr = Math.floor(-diff / 3600000)
                    var mili = -diff - 3600000 * hr
                    var min = Math.floor(mili / 60000);
                    mili = mili - 60000 * min;
                    var sec = mili / 1000;
                    mili = mili - 1000 & sec;
                    min = min.toFixed(0);
                    sec = sec.toFixed(0);
                    //Add new time differnce to old time differnce 

                    var newSec = pauseSec + parseInt(sec)
                    var newMin = pauseMin + parseInt(min)
                    var newHour = pauseHour + parseInt(hr)

                    while (newSec >= 60) {
                        newSec = newSec - 60;
                        newMin = newMin + 1;
                    }
                    while (newMin >= 60) {
                        newMin = newMin - 60;
                        newHour = newHour + 1;
                    }
                    this.setState({ hour: newHour, min: newMin, sec: newSec, mili: parseInt(mili) }); 
                    this.formatStats()
                }, 1);
            } else {
                this.setState({ current: "Run Paused" })
                this.setState({ button: false })
                this.setState({ stopButton: true })
                this.setState({ paused: true })
                clearInterval(this.intervalID);
            }
        }
    }

    componentWillUnmount = () => {
        clearInterval(this.intervalId);
    }

    render() {
        return (

            <View style={{ alignItems: 'center', justifyContent: "center"}}>    
                <Text style={{ fontSize: 15 }}> {this.state.current}</Text>
                {
                    this.state.displayStat ? < Text style={{
                        paddingVertical: 50, fontSize: 15 }}> {this.state.stats}</Text> : null
                }

                {
                    this.state.button ? < StartButton onPress={this.start}  pauseButton={true} />:
                                      < StartButton onPress={this.start} pauseButton={false} />
                }
            
                {
                    !this.state.button && this.state.stopButton ?
                        <StopRunButton style={{ fontSize: 20}} onLongPress={this.endRunButton} title={'STOP'} /> : null                  
                }
              </View>
        );
    }
}
//Getting the states from the store and mapping it to props in the Login
function mapStateToProps(state) {
    return {
        time: state.endRunReducer.time,
        distance: state.endRunReducer.distance,
        pace: state.endRunReducer.pace,
        calories: state.endRunReducer.calories
    }
}
//Sends actions to the reducer in the App.js file 
function mapDispatchtoProps(dispatch) {
    return {
        sendRunStats: (time, distance,pace,calories) => dispatch({ type: "ENDRUN", time, distance, pace, calories}),
       
    }
}

//Connecting the react components to the store in App.js 
export default connect(mapStateToProps, mapDispatchtoProps)(SimplyRun);