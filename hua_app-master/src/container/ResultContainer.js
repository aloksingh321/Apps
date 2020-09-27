import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class ResultContainer extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>ResultContainer</Text>
            </View>
        );
    }
}
export default ResultContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});