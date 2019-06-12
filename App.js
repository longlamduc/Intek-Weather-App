import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import FacebookLogin from './components/FacebookLogin';
import CityList from './components/CityList';

class IntekWeatherApp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Weather App</Text>
        </View>
        <Text style={styles.title}>Weather Statistics</Text>
        <FacebookLogin/>  
        <CityList/>
      </View>
    ); 
  }
}

export default IntekWeatherApp;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 600,
  },
  header: {
    alignSelf: 'stretch',
    height: 50,
    backgroundColor: '#50c9f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 35,
    color: 'white',
  },
  title: {
    fontSize: 25,
  },
});
