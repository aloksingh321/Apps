import React, { Component } from "react";
import { View,Text,StyleSheet,StatusBar } from "react-native";
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { createAppContainer } from 'react-navigation';
import { Transition } from 'react-native-reanimated';
import ParentLoginContainer from './ParentLoginContainer';
import ForgotPasswordContainer from './ForgotPasswordContainer';
import NavigationContainer from './NavigationContainer';

const SignUp = createAnimatedSwitchNavigator(
{
    ParentLoginContainer:ParentLoginContainer,
    ForgotPasswordContainer: ForgotPasswordContainer,
    NavigationContainer: NavigationContainer,
},
{
    transition: (
    <Transition.Together>
        <Transition.Out
        type="slide-left"
        durationMs={300}
        interpolation="easeIn"
        />
        <Transition.In type="slide-left" durationMs={400} />
    </Transition.Together>
    ),
},
{
    initialRouteName: 'ParentLoginContainer',
}
);

const LoginNavigation = createAppContainer(SignUp);

export default class LoginNavigationContainer extends Component {
  render() {
    StatusBar.setBarStyle('dark-content', true);
    StatusBar.setBackgroundColor("#fff")
    return (
        <LoginNavigation/>
    );
  }
}