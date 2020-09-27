import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class CoursesContainer extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>CoursesContainer</Text>
            </View>
        );
    }
}
export default CoursesContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});