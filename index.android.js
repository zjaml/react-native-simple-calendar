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
      <View style={styles.container}>
        <Calendar dateSelected={this.dateSelected.bind(this)}
          selectedDate = {this.state.selectedDate}/>
        <Text>{this.state.selectedDate}</Text>
      </View>
    )
  }

  dateSelected(date){
    this.setState({
      selectedDate: date
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
