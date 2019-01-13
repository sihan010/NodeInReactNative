import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import nodejs from 'nodejs-mobile-react-native'

export default class App extends Component {

  componentDidMount() {
    nodejs.start("main.js");
    nodejs.channel.addListener("message", (msg) => {
        alert(msg);
    },this);

      nodejs.channel.addListener("pack", (msg) => {
        alert(msg);
    },this);

      nodejs.channel.addListener("api", (msg) => {
        alert(msg);
    },this);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <TouchableOpacity onPress={() => nodejs.channel.post('message','sihan')}>
          <Text>Request Crypto</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => nodejs.channel.post('pack',JSON.stringify([{ 'user': 'fred',   'age': 48 },{ 'user': 'barney', 'age': 36 },{ 'user': 'fred',   'age': 40 },{ 'user': 'barney', 'age': 34 }] ))}>
          <Text>Alert from Node</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => nodejs.channel.post('api','data')}>
          <Text>Movie</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 16,
    textAlign: 'center',
    margin: 10
  }
});
