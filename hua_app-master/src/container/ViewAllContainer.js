import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class ViewAllContainer extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Announcements</Text>
            </View>
        );
    }
}
export default ViewAllContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});