import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet, 
} from "react-native";
import ForgotPasswordComponent from '../components/ForgotPasswordComponent'

class ForgotPasswordContainer extends Component {

    navigateToLogin=()=>{
         this.props.navigation.navigate('ParentLoginContainer');
    }
    
    render() {
        return (
            <ForgotPasswordComponent
            navigateToLogin={this.navigateToLogin}
            />
        );
    }
}
export default ForgotPasswordContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});