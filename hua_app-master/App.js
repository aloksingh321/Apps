import React, { Component } from "react";
import { 
  View,
  Text,
  StyleSheet,
  StatusBar
} from "react-native";
import Main from "./src/Main";
import { Root } from 'native-base';
import {Provider} from 'react-redux';
import store from './src/store'

class App extends Component {

  render() {
    StatusBar.setBarStyle('dark-content', true);
    StatusBar.setBackgroundColor("#ffffff")
    return (
      <Provider store={store}>
        <Main/>
      </Provider>
    );
  }
}

export default () =>
  <Root>
    <App/>
  </Root>;