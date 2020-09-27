import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    StatusBar
} from "react-native";
import HomeDashboardComponent from '../components/HomeDashboardComponent';
import { DrawerActions } from 'react-navigation-drawer';
import { connect } from 'react-redux';

class HomeDashboardContainer extends Component {

     openDashboard = () => {
        this.props.navigation.dispatch(DrawerActions.openDrawer())
    }

    navigateToNotification=()=>{
        this.props.navigation.navigate('NotificationContainer');
    }

    navigateTo=(navigateTo)=>{
        this.props.navigation.navigate(navigateTo);
    }

    navigateToSchedule=(index)=>{
        this.props.navigation.navigate('SchedulesContainer',{ScheduleIndex : index});
    }

    render() {
        return (
            <HomeDashboardComponent
            openDashboard={this.openDashboard}
            navigateToNotification={this.navigateToNotification}
            navigateTo={(screen)=>this.navigateTo(screen)}
            schedules={this.props.scheduleList}
            navigateToSchedule={(i)=>this.navigateToSchedule(i)}
            />
        );
    }
}
function mapStatetoProps(state) {
    return {
        scheduleList: state.schedules,
    }
}
export default connect(mapStatetoProps)(HomeDashboardContainer);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});