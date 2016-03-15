/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict'

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';
import moment from 'moment'
import LayoutTest from "./LayoutTest"
import Calendar from "./Calendar";
class simpleCalendar extends Component {
  constructor(props){
    super(props)
    this.state = {
      selectedDate: moment().format('YYYY-MM-DD')
    }
  }

  render() {
    // console.log('render method called on index.android')
    return (
      // <LayoutTest></LayoutTest>
      <View style={styles.container}>
        <Calendar style={styles.calendar}
          dateSelected={this.dateSelected.bind(this)}
          eventDates = {['2016-03-18', '2016-04-19']}
          selectedDate = {this.state.selectedDate}/>
          <View style= {styles.list}></View>
      </View>
      // <MainScreen></MainScreen>
    )
  }

  dateSelected(date){
    console.log(`date selected ${date}`)
    this.setState({
      selectedDate: date
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  calendar: {
    // flex:2
  },
  list: {
    flex: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('simpleCalendar', () => simpleCalendar);
