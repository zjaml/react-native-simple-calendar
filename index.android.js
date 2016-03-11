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

import Calendar from "./src/Calendar";

class simpleCalendar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Calendar/>
      </View>
    )
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
