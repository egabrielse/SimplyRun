import React, { Component, } from 'react';
import { Text, View, Button, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import firebaseConfig from '../config/firebaseConfig'
import { connect } from 'react-redux'
//Firebase initialzation 
firebaseConfig
class Triangle extends Component {

    render() {
        return (
            <View style={{
                width: 0,
                height: 0,
                backgroundColor: 'transparent',
                borderStyle: 'solid',
                borderLeftWidth: 35,
                borderRightWidth: 35,
                borderBottomWidth: 70,
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
                borderBottomColor: 'steelblue',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 5,
                transform: [{ rotate: '90deg' }]

            }} />
        )
    }
}

class Rectangle extends Component {
    render() {
        return (
            <View style={{
                width: 25,
                height: 2 * 50,
                backgroundColor: this.props.color,
                borderColor: 'black',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 5,
            }} />
        );
    }
}

class StartButton extends Component {

    render() {
        return (
            <TouchableOpacity
                style={{
                    borderWidth: 2,
                    borderColor: 'rgba(0,0,0,0.2)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 150,
                    height: 150,
                    backgroundColor: 'springgreen',
                    borderRadius: 75,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.8,
                    shadowRadius: 5,
                }} delayLongPress={1000} onPress={this.props.onPress} onLongPress={this.props.onLongPress}>
                {this.props.pauseButton ? <View style={{ flexDirection: "row", justifyContent: 'space-between', padding: 10 }}>
                    <Rectangle color='yellow' />
                <View style={{ paddingHorizontal: 10 }} />
                <Rectangle color='yellow' />
                </View> : <Triangle />
                }
                   
            </TouchableOpacity>
        )
    }
}

class StopButton extends Component {
    render() {
        return (
            <View style={{ paddingVertical: 50 }}>
                <TouchableOpacity delayLongPress={1000} onLongPress={this.props.onLongPress}>
                <Text> STOP </Text>
                </TouchableOpacity>
                </View>
            )
    }
}

class SimplyRun extends Component {
    state = {
        stats: 'Time:',
        displayStat: true,
        startRun: true,
        paused: false,
        button: false,
        stopButton: false
    }

    longPress = () => {
        this.setState({ button: false })
        this.setState({ paused: true })
        clearInterval(this.intervalID);
       var  totalTimeSec = (this.state.hour * 60 * 60) + (this.state.min * 60  )+ this.state.sec + (this.state.mili/1000)
        Alert.alert("" + totalTimeSec)
    }

    endRun = () => {
        this.props.navigation.navigate('EndRun');
        time = this.props.sendTime((this.state.hour * 60 * 60) + (this.state.min * 60) + this.state.sec + (this.state.mili / 1000))
    }

    start = () => {
        //Get Inital start of run time 
        var startTime = new Date().getTime()
       
        if (!this.state.startRun & this.state.paused) {
            this.setState({paused: false})
        }
        //Run has not started yet
        if (this.state.startRun) {
            this.setState({ button: true })
            this.setState({ startRun: false })
            this.setState({ stopButton: true })
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
                this.setState({ hour: parseInt(hr) })
                this.setState({ min: parseInt(min) })
                this.setState({ sec: parseInt(sec)})
                this.setState({ mili: parseInt(mili) })
                var formatSec = "" + this.state.sec;
                formatSec = formatSec.padStart(2, '0');
                var formatMin = "" + this.state.min;
                formatMin = formatMin.padStart(2, '0')
                var formatHour = "" + this.state.hour;
                formatHour = formatHour.padStart(2, '0')
                this.setState({ stats: "Time: " + formatHour + ":" + formatMin + ":" + formatSec })
            }, 1);
        } else {           
            if (this.state.paused) {
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

                    this.setState({ hour: newHour })
                    this.setState({ min: newMin  })
                    this.setState({ sec: newSec })
                    this.setState({ mili: parseInt(mili) })

                    var formatSec = "" + this.state.sec;
                    formatSec = formatSec.padStart(2, '0');
                    var formatMin = "" + this.state.min;
                    formatMin = formatMin.padStart(2, '0')
                    var formatHour = "" + this.state.hour;
                    formatHour = formatHour.padStart(2, '0')
                    this.setState({ stats: "Time: " + formatHour + ":" + formatMin + ":" + formatSec })
                }, 1);
            } else {
                this.setState({ button: false})
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

            <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center', padding: 100, position: 'absolute' }}>    
                {
                    this.state.displayStat ? < Text style={{ paddingVertical: 50, fontSize: 20 }}> {this.state.stats}</Text> : null
                }
                {
                    this.state.button ? < StartButton onPress={this.start}  pauseButton={true} />:
                                      < StartButton onPress={this.start} pauseButton={false} />
                }
                {
                    !this.state.button && this.state.stopButton ?
                        <StopButton style={{ paddingVertical: 100, fontSize: 20 }} onLongPress={this.endRun} title={'STOP'} /> : null               
                    }
                 
            </View>

        );
    }
}
//Getting the states from the store and mapping it to props in the Login
function mapStateToProps(state) {
    return {
        time: state.endRunReducer.time,
    
    }
}
//Sends actions to the reducer in the App.js file 
function mapDispatchtoProps(dispatch) {
    return {
        sendTime: (time) => dispatch({ type: "ENDRUN", time }),
       
    }
}

//Connecting the react components to the store in App.js 
export default connect(mapStateToProps, mapDispatchtoProps)(SimplyRun);