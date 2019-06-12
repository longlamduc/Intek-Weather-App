import * as React from 'react';
import { Text, View, StyleSheet, Image, TextInput, Picker } from 'react-native';

const data = require('../data.json');
const app_id = '06b46fea53ba171468b1a93cee57cb2e';

export default class CityList extends React.Component {
  state = {
    city_id: '',
    city_name: '',
    temperature: '',
    humidity: '',
    pressure: '',
  };

  checkInput = text => {
    // Check if input is a substring of any city name
    {
      data.map(item => {
        if (item.name.toLowerCase().includes(text.toLowerCase())) {
          {
            // If yes, update new city weather information
            this.updateCity(item.id);
          }
          return;
        }
      });
    }
  };

  updateCity = async value => {
    // update new city weather information
    await this.setState({ city_id: value });
    try {
      // Call weather API and get result
      let response = await fetch(
        'http://api.openweathermap.org/data/2.5/weather?id=' +
          this.state.city_id +
          '&APPID=' +
          app_id +
          '&units=metric',
        {
          method: 'GET',
        }
      );

      // Get neccessary weather information from result
      let { main, name } = await response.json();
      await this.setState({
        city_name: name,
        temperature: main.temp,
        humidity: main.humidity,
        pressure: main.pressure,
      });

    } catch (error) {
      console.log(error);
    }
  };

  loadResult = () => {
    // Determine if there is weather information in state
    if (this.state.city_id) {
      // If yes, display them
      return (
        <View style={styles.weatherContainer}>
          <Text style={styles.weatherText}>
            City: {this.state.city_name}
          </Text>
          <Text style={styles.weatherText}>
            Temperature: {this.state.temperature} C
          </Text>
          <Text style={styles.weatherText}>
            Pressure: {this.state.pressure} P
          </Text>
          <Text style={styles.weatherText}>
            Humidity: {this.state.humidity} %
          </Text>
        </View>
      );
    } else {
      return <View style={styles.weatherContainer} />;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          // used to input name of city
          style={styles.input}
          textAlign={'center'}
          onChangeText={text => this.checkInput(text)}
        />
        <Picker
          // used to choose city from data list
          style={styles.picker}
          itemStyle={styles.picker}
          selectedValue={this.state.city_id}
          onValueChange={value => this.updateCity(value)}>
          <Picker.Item label="Select a city..." value="" />
          {data.map(item => (
            <Picker.Item label={item.name} value={item.id} />
          ))}
        </Picker>
        {this.loadResult()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  picker: {
    width: 300,
    height: 100,
  },
  input: {
    width: 300,
    height: 50,
    borderColor: '#50c9f6',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weatherContainer: {
    width: 300,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  weatherText: {
    fontSize: 18,
    height: 40,
  },
});
