import React, { Component, } from 'react';
import { Text, View, Button, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import firebaseConfig from '../config/firebaseConfig'
import { connect } from 'react-redux'
import StartButton from "../runbutton/StartButton"
import StopRunButton from "../runbutton/StopRunButton"
import MapView, { Polyline } from 'react-native-maps';
import * as firebase from 'firebase';
import '@firebase/firestore';
//Firebase initialzation 
firebaseConfig

const haversine = require('haversine');

class SimplyRun extends Component {
   
    state = {
        stats: "",
        current: "",
        displayStat: true,
        startRun: true,
        paused: false,
        button: false,
        stopButton: false,
        coordinates: [],
        distance: 0,
        previousPosition: {},
        ms: 0,
        secs: 0,
        mins: 0,
        hrs: 0,
        startTime: "",
        route: "",
        pace: 0
    }
    
    componentDidMount() {
        if (this.props.metric) {
            this.setState({
                stats: "\n" + "Time: 00:00:00 hr:min:sec" +
                    "\n" + "Distance: 0.0 km" + "\n" + "Pace: 0.0 mins/km" + "\n" + "Calories: 0.0 cals "})

        } else {
            this.setState({
                stats: "\n" + "Time: 00:00:00 hr:min:sec" +
                    "\n" + "Distance: 0.0 miles" + "\n" + "Pace: 0.0 mins/miles" + "\n" + "Calories: 0.0 cals "
            })
        }
    }
    componentDidUpdate(prevProps) {
        //If user changes setting change display
        if (this.props.metric !== prevProps.metric) {
            this.formatStats()
        }
    }

    formatStats = () => {
        var formatSec = "" + this.state.sec; formatSec = formatSec.padStart(2, '0');

        var formatMin = "" + this.state.min; formatMin = formatMin.padStart(2, '0')

        var formatHour = "" + this.state.hour; formatHour = formatHour.padStart(2, '0')

        var totalTimeSecs = (this.state.hour * 60 * 60) + (this.state.min * 60) + this.state.sec + (this.state.mili / 1000);
        
        if (this.state.distance !== 0) {
            var pace = (totalTimeSecs / 60) / this.state.distance.toFixed(2)
            this.setState({ pace: pace })
        } 

        if (!this.props.metric) {
            this.setState({
                stats: "\n" + "Time" + ": " + formatHour + ":" + formatMin + ":" + formatSec + " hr:min:sec"+ 
                    "\n" + "Distance: " + this.state.distance.toFixed(2) +" miles" + "\n" + "Pace: " + this.state.pace.toFixed(2)+" mins/mile" + "\n" + "Calories: 0.0 cals",
            })
        } else {
            this.setState({
                stats: "\n" + "Time" + ": " + formatHour + ":" + formatMin + ":" + formatSec + " hr:min:sec" + 
                    "\n" + "Distance: " + (this.state.distance * 1.609).toFixed(2) + " km" + "\n" + "Pace: " + (this.state.pace * .621).toFixed(2) +
                    " mins/km" + "\n" + "Calories: 0.0 cals",
            })
        }
    }

    endRun = () => {
        this.setState({ stopButton: false })
        this.setState({ current: "" })
        this.props.navigation.navigate('EndRun');
        var totalTimeSecs = (this.state.hour * 60 * 60) + (this.state.min * 60) + this.state.sec + (this.state.mili / 1000);
    
        if (this.state.distance !== 0) {
            var pace = (totalTimeSecs / 60) / this.state.distance.toFixed(2)
            this.setState({ pace: pace })
        } 
        //Using Redux to pass info to the EndRun Screen
        time = this.props.sendRunStats(totalTimeSecs, this.state.distance,
            this.state.pace, 0.0, this.state.startTime, new Date(), this.state.route, this.state.hour,
            this.state.min, this.state.sec)
        this.setState({ hour: 0, min: 0, sec: 0, mili: 0, distance: 0, pace: 0, })
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
                    style: 'cancel'
                }
            ],
            { cancelable: false },
        );

    }

    start = () => {
        //Get Inital start of run time 

        var startTime = new Date().getTime()


        if (!this.state.startRun & this.state.paused) {
            this.setState({ paused: false })
        }
        //Run has not started yet
        if (this.state.startRun) {
            this.setState({ startTime: new Date() })
            this.startTracking()
            this.setState({ current: "Tracking Run" })
            this.setState({ button: true, stopButton: true, startRun: false })

            setTimeout(() => this.intervalID = setInterval(() => {
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
            }, 500), 1000 / 60);

        } else {
            if (this.state.paused) {
                this.setState({ current: "Tracking Run" })
                navigator.geolocation.getCurrentPosition(
                    position => {
                        var currentPosition = position.coords;
                        this.setState({ previousPosition: currentPosition })
                    }
                )
                this.startTracking()
                var pauseSec = this.state.sec;
                var pauseMin = this.state.min;
                var pauseHour = this.state.hour;

                setTimeout(() => this.intervalID = setInterval(() => {
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
                }, 500), 1000 / 60);


            } else {
                this.setState({ current: "Run Paused" })
                this.setState({ button: false })
                this.setState({ stopButton: true })
                this.setState({ paused: true })

                clearInterval(this.intervalID);
                clearInterval(this.intervalTrackingID)
            }
        }
    }




    startTracking = () => {
        setTimeout(() => this.intervalTrackingID = setInterval(() => {
            navigator.geolocation.getCurrentPosition(
                position => {
                    var currentPosition = position.coords;

                    this.setState({ coordinates: this.state.coordinates.concat([currentPosition]) })
                    this.setState({ distance: this.state.distance + this.coordDistance(currentPosition) })
                    this.setState({ previousPosition: currentPosition })
                    geopoint = new firebase.firestore.GeoPoint(currentPosition.latitude, currentPosition.longitude)
                    this.setState(prevState => ({
                        route: [...prevState.route, geopoint]
                    }))
                }

            )
        }, 10000), 1000);
    }

    coordDistance = (position) => {
        return haversine(this.state.previousPosition, position, { unit: 'mile' }) || 0;
    }

    componentWillUnmount = () => {

        clearInterval(this.intervalId, this.intervalTrackingID);
    }

    render() {
        return (
            <View style={{ flex: 1, }}>

                <MapView
                    showsUserLocation={true}
                    style={{ flex: 2 }}
                    followsUserLocation={true}
                >

                    <Polyline coordinates={this.state.coordinates} strokeWidth={5} />


                </MapView>

                <View style={{
                    alignItems: 'center', justifyContent: "center", flex: 1.5, backgroundColor: 'powderblue',
                }}>
                    <Text style={{ fontSize: 15 }}> {this.state.current}</Text>

                    {
                        this.state.displayStat ? < Text style={{
                            paddingBottom: 10, fontSize: 15
                        }}> {this.state.stats}</Text> : null
                    }

                    <View style={{
                        flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 10
                    }}>
                        {
                            this.state.button ? < StartButton onPress={this.start} pauseButton={true} /> :
                                < StartButton onPress={this.start} pauseButton={false} />

                        }
                        <Text>  </Text>
                        {
                            !this.state.button && this.state.stopButton ?
                                <StopRunButton style={{ fontSize: 20 }} onLongPress={this.endRunButton} title={'STOP'} /> : null
                        }

                    </View>
                </View>
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
        calories: state.endRunReducer.calories,
        startTime: state.endRunReducer.startTime,
        endTime: state.endRunReducer.endTime,
        route: state.endRunReducer.route,
        hours: state.endRunReducer.hours,
        mins: state.endRunReducer.mins,
        secs: state.endRunReducer.secs,
        display_calories: state.SettingsReducer.display_calories,
        display_distance: state.SettingsReducer.display_distance,
        display_pace: state.SettingsReducer.display_pace,
        display_time: state.SettingsReducer.display_time,
        metric: state.SettingsReducer.metric,
        update_frequency: state.SettingsReducer.update_frequency,
    }
}
//Sends actions to the reducer in the App.js file 
function mapDispatchtoProps(dispatch) {
    return {
        sendRunStats: (time, distance, pace, calories, startTime, endTime, route, hours, mins,secs) => dispatch({
            type: "ENDRUN", time, distance,
            pace, calories, startTime, endTime,
            route, hours, mins,secs
        }),

    }
}

//Connecting the react components to the store in App.js 
export default connect(mapStateToProps, mapDispatchtoProps)(SimplyRun);