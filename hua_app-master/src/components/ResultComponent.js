import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class ResultComponent extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>ResultComponent</Text>
            </View>
        );
    }
}
export default ResultComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});