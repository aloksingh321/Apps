import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";
import StudentProfileComponent from '../components/StudentProfileComponent'

class StudentProfileContainer extends Component {
    constructor(props) {
    super(props);
    this.state = {
      student:this.props.navigation.getParam('student')
    };
  }

    render() {
        return (
            <StudentProfileComponent
            student={this.state.student}
            />
        );
    }
}
export default StudentProfileContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});