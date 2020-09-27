import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class LogoutBlackScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>LogoutBlackScreen</Text>
            </View>
        );
    }
}
export default LogoutBlackScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});