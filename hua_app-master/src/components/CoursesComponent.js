import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class CoursesComponent extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>CoursesComponent</Text>
            </View>
        );
    }
}
export default CoursesComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});