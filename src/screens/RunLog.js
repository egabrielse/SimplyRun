import React, { Component } from 'react';
import { Modal, Text, TouchableOpacity, View, TextInput, Button, StyleSheet, TouchableHighlight, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { connect } from 'react-redux';
import firebaseConfig from '../config/firebaseConfig'
import firebase from 'firebase';
import MapView, {Polyline} from 'react-native-maps';

class RunLog extends Component {

  constructor(props) {
    super(props);
    this.formatTime = this.formatTime.bind(this);
    this.formatPace = this.formatPace.bind(this);
  }

	state = {
        tableHead: ['Date', 'Distance', 'Time', 'Pace'],
        tableData: [],
        modalVisible: false,
        modalData: [],
        date: null,
        total_time: null,
        total_distance: null,
        average_pace: null,
        total_calories: null,
        route: []
    };

    // addTestData() {
      

    //   firebaseConfig.firestore().collection("users").doc(firebaseConfig.auth().currentUser.uid)
    //   .collection("RunLog").add({
    //     calories: 3000,
    //     distance: 3454,
    //     start_time: firebase.firestore.Timestamp.fromDate(new Date()),
    //     end_time: firebase.firestore.Timestamp.fromDate(new Date()),
    //     route: [
    //       new firebase.firestore.GeoPoint(43.073051, -89.401230),
    //       new firebase.firestore.GeoPoint(43.083051, -89.402230),
    //       new firebase.firestore.GeoPoint(43.093051, -89.401830),
    //       new firebase.firestore.GeoPoint(43.073051, -89.401330)
    //     ],
    //     time: 4354,
    //     note: "great job Jon"

    //   }).then(function(docRef) {
    //     console.log("Document written with ID: ", docRef.id);
    // })
    // .catch(function(error) {
    //     console.error("Error adding document: ", error);
    // });
    
    // }

  
    //takes seconds and converts to HH:MM:SS format
  formatTime(time) {
    var hours = Math.trunc(time / 3600);
    time %= 3600;
    var minutes = Math.trunc(time / 60);
    var seconds = (time % 60).toFixed(2);
    if (hours   < 10) hours   = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;

    return hours + ":" + minutes + ":" + seconds;
  }  

  //takes seconds and converts to MM:SS format
  formatPace(time) {
    var seconds = Math.trunc(time % 60);
    var minutes = Math.trunc(time / 60);
    if (seconds < 10) seconds = "0" + seconds;

    return minutes + ":" + seconds;
  }  

	async componentDidMount() {
    
      //get all runs in runlog and populate table
      const tableData = [];
      var total_time = 0;
      var total_distance = 0;
      var average_pace = 0;
      var total_calories = 0;
      await firebaseConfig.firestore().collection("users").doc(firebaseConfig.auth().currentUser.uid)
                                      .collection("RunLog").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const rowData = [];
            total_time += doc.get("time");
            total_distance += doc.get("distance");
            total_calories += doc.get("calories");
            rowData.push(doc.get("start_time").toDate().toString().substring(0,16));  //fix this formatting
            rowData.push(doc.get("distance") + " mi");

            //format and add time
            rowData.push(this.formatTime(doc.get("time")));
            rowData.push(this.formatPace(doc.get("pace")) + " min/mi");
            tableData.push(rowData);
        });

        average_pace = this.formatPace(total_time / total_distance);
        total_time = this.formatTime(total_time);
      });


    this.setState({
      tableData : tableData,
      total_time: total_time,
      total_distance: total_distance,
      average_pace: average_pace,
      total_calories: total_calories,
    });

    

  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
    this.RunDetails();
  //  alert("Id is" + id);
  }


  async RunDetails() {
    var id = "Cve802M0hLrEKHGfYG14";

          //get info for specific run
          const modalData = [];
          var date = null;
          var route = [];
          await firebaseConfig.firestore().collection("users").doc(firebaseConfig.auth().currentUser.uid)
                                          .collection("RunLog").doc(id).get().then((doc) => {
                const rowData = [];
                modalData.push("Time: " + this.formatTime(doc.get("time")) + "\n");  //fix this formatting
                modalData.push("Distance: " + doc.get("distance")  + " miles\n");
                modalData.push("Pace: " + doc.get("pace") + " mi/min\n");
                modalData.push("Calories: " + doc.get("calories") + "\n");
                modalData.push("Notes: " + doc.get("note") + "\n");
                date = doc.get("start_time").toDate().toString()

                //build route
                doc.get("route").forEach(geopoint => {
                  route.push({latitude: geopoint.latitude, longitude: geopoint.longitude});
                });
          });

          //temporary way to display date
          date = date.substring(0,16);
    
        this.setState({
          modalData : modalData,
          date: date,
          route: route
        });
  }


  render() {
    return (
      <ScrollView >
        <View>
          <Text style = {styles.title}> Run Log </Text>
          <Text style = {styles.totals}> Total Time: {this.state.total_time} </Text>
          <Text style = {styles.totals}> Total Distance: {this.state.total_distance} miles </Text>
          <Text style = {styles.totals}> Average Pace: {this.state.average_pace} min/mi </Text>
          <Text style = {styles.totals}> Total Calories: {this.state.total_calories} </Text>
          <Table borderStyle={{borderWidth: 1, borderColor: '#444444'}}>
            <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text}/>
            <Rows data={this.state.tableData} textStyle={styles.text}/>
          </Table>
          <TouchableHighlight style={styles.button} onPress={() => this.setModalVisible(!this.state.modalVisible)}>
                <View >
                  <Text style={styles.buttonText}>popup</Text>
                </View>
          </TouchableHighlight>

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
            <View>
            <TouchableHighlight style={styles.backbutton}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text style={styles.buttonText}>Back</Text>
              </TouchableHighlight>

              <Text style={styles.title}>Run Details</Text>
              <MapView style={styles.map}
                    region={{
                      latitude: 43.073051,
                      longitude: 	-89.401230,
                      latitudeDelta: 0.03,
                      longitudeDelta: 0.03,
                    }}>
                  
                  <Polyline coordinates = {this.state.route}
                      strokeColor="#000"
                      strokeColors={[
                        '#7F0000',
                        '#00000000',
                        '#B24112',
                        '#E5845C',
                        '#238C23',
                        '#7F0000'
                      ]}
                      strokeWidth={6}
                      />
                </MapView>
              <Text style={styles.date}>{this.state.date}</Text>                   
              <Text style={styles.totals}>{this.state.modalData}</Text>
            </View>
          </View>
        </Modal>
        </View>
      </ScrollView>
    );
  }
}



const mapStateToProps = state => {
  return {
      user: state.user,
      name: state.PersonalInfoReducer.name,
  }
}

//Connecting the react components to the store in App.js 
export default connect(mapStateToProps)(RunLog);

const styles = StyleSheet.create({

  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#A44CA0' },
  text: { margin: 6 },

  title: {
    fontSize: 26,
    textAlign: "center",
    padding: 5
},
totals: {
  textAlign: "center",
  fontSize: 16,
  padding: 2
},
date: {
  fontSize: 20,
  textAlign: "center",
  padding: 5
},
text: {
    textAlign: "center",
    padding: 2
},
button: {
    marginLeft: 120,
    marginRight: 120,
    marginTop:10,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#BBBBBB',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  backbutton: {
    marginLeft: 15,
    marginRight: 300,
    marginTop:10,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#BBBBBB',
    borderRadius:5,
    borderWidth: 1,
    borderColor: '#fff'
  },
buttonText: {
    color:'#fff',
    textAlign:'center',
    paddingLeft : 25,
    paddingRight : 25
  },
  map: {
    position: 'relative',
    alignItems: "center",
    height: 300,
  },

})