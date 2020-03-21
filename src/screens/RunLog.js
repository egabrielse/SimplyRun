import React, { Component } from 'react';
import { Modal, Text, TouchableOpacity, View, TextInput, Button, StyleSheet, TouchableHighlight, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { connect } from 'react-redux';
import firebaseConfig from '../config/firebaseConfig'
import firebase from 'firebase';

class RunLog extends Component {

	state = {
        tableHead: ['Date', 'Distance', 'Time', 'Pace'],
        tableData: [],
        modalVisible: false,
        modalData: []
    };

	async componentDidMount() {

      //get all runs in runlog and populate table
      const tableData = []
      await firebaseConfig.firestore().collection("users").doc(firebaseConfig.auth().currentUser.uid)
                                      .collection("RunLog").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            const rowData = [];
            rowData.push(doc.get("start_time").toDate().toString());  //fix this formatting
            rowData.push(doc.get("distance"));
            rowData.push(doc.get("time"));
            rowData.push(doc.get("time"));
            // rowData.push(
            //   <TouchableHighlight onPress={() => this.setModalVisible(true, doc.getId())}>
            //     <View style={styles.btn}>
            //       <Text style={styles.btnText}>button</Text>
            //     </View>
            //   </TouchableHighlight>
            // )
            tableData.push(rowData);
        });
      });

    this.setState({
      tableData : tableData
    });

  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
    this.RunDetails();
  //  alert("Id is" + id);
  }

  async RunDetails() {
    var id = "RqEr89LjBrxJE4l1gk6Y";

          //get info for specific run
          const modalData = []
          await firebaseConfig.firestore().collection("users").doc(firebaseConfig.auth().currentUser.uid)
                                          .collection("RunLog").doc(id).get().then(function(doc) {
                const rowData = [];
                modalData.push("Time: " + doc.get("time") + "\n");  //fix this formatting
                modalData.push("Distance: " + doc.get("distance") + "\n");
                modalData.push("Pace: 7:22 min/mi" + "\n");
                modalData.push("Pace: " + doc.get("calories") + "\n");
                modalData.push("Notes: " + doc.get("note") + "\n");
          });
    
        this.setState({
          modalData : modalData
        });

  }


  render() {
    return (
      <ScrollView >
        <View>
          <Text > Run Log for {this.name} </Text>
          <Text > Here is a list of all the beautiful runs you have been on! </Text>
          <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
            <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text}/>
            <Rows data={this.state.tableData} textStyle={styles.text}/>
          </Table>

          <TouchableHighlight onPress={() => this.setModalVisible(!this.state.modalVisible)}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>button</Text>
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
            <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Back</Text>
              </TouchableHighlight>

              <Text>Run Details</Text>
              <Text>{this.state.modalData}</Text>



              
            </View>
          </View>
        </Modal>

        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 }
});

// const mapDispatchToProps = dispatch => {
// //  return bindActionCreators({ updateEmail, updatePassword, updateName, updateFavoriteThings, update }, dispatch)
// }

const mapStateToProps = state => {
  return {
      user: state.user
  }
}

//Connecting the react components to the store in App.js 
export default connect(mapStateToProps)(RunLog);