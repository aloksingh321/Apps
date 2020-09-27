import React, { Component } from "react";
import { 
  View,
  Text,
  StyleSheet,
  AsyncStorage
} from "react-native";
import ParentProfileComponent from '../components/ParentProfileComponent';
import { DrawerActions } from 'react-navigation-drawer';
import { connect } from 'react-redux';

class ParentProfilrContainer extends Component {
  
    openDashboard = () => {
        this.props.navigation.dispatch(DrawerActions.openDrawer())
    }

   navigateToNotification=()=>{
        this.props.navigation.navigate('StudentRegisterContainer');
    }

     navigateToStudentProfile=(student)=>{
        this.props.navigation.navigate('StudentProfileContainer',{student});
    }

    navigateToSchedule=(StudentId)=>{
        this.props.navigation.navigate('SchedulesContainer',{StudentId});
    }

  render() {
    return (
      <ParentProfileComponent
      openDashboard={this.openDashboard}
      navigateToNotification={this.navigateToNotification}
      navigateToStudentProfile={(student)=>this.navigateToStudentProfile(student)}
      navigateToSchedule={(StudentId)=>this.navigateToSchedule(StudentId)}
      parent={this.props.parentDetialsList}
      student={this.props.studentsList}
      />
    );
  }
}
function mapStatetoProps(state) {
    return {
        parentDetialsList: state.parentDetails,
        studentsList: state.students,
    }
}
export default connect(mapStatetoProps)(ParentProfilrContainer);