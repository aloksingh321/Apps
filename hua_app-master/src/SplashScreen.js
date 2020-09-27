import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Image,
} from "react-native";
import  {DotsLoader} from 'react-native-indicator';

class SplashScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image}
          source={require("./assets/images/logo.png")} />
           <View style={{width: 360, height: 30, alignSelf: 'auto',alignItems: 'center',position: 'absolute',
      bottom: 0}}>
           <DotsLoader size={16} color='#F79A70'
          />
        </View>        
      </View>
    );

  }
}
export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  image:{ 
    width: "70%",
    height: "15%" ,
   },
});

