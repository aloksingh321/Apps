import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";
import NotificationComponent from '../components/NotificationComponent'

class NotificationContainer extends Component {
    render() {
        return (
            <NotificationComponent/>
        );
    }
}
export default NotificationContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});