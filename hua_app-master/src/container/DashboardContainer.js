import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Alert,
    AsyncStorage,
    BackHandler
} from "react-native";
import DashboardComponent from '../components/DashboardComponent';
import { connect } from 'react-redux';
import { DrawerActions } from 'react-navigation-drawer';

class DashboardContainer extends Component {

    handleOnPressLogout=()=>{
        Alert.alert(   
            'Confirmation required'
            ,'Do you really want to logout?'
            ,[
                {text: 'Cancel'},
                {text: 'Logout', onPress: () => { 
                    AsyncStorage.removeItem('@sessionToken:key');
                    AsyncStorage.removeItem('@parentId:key');
                    BackHandler.exitApp() }}
            ]
        );
    }

    navigateToScreen=(screen)=>{
        this.props.navigation.navigate(screen);
          this.props.navigation.dispatch(DrawerActions.closeDrawer());
    }

    render() {
        return (
            <DashboardComponent
            handleOnPressLogout={this.handleOnPressLogout}
            parent={this.props.parentDetialsList}
            navigateToScreen={(screen)=>this.navigateToScreen(screen)}
            />
        );
    }
}
function mapStatetoProps(state) {
    return {
        parentDetialsList: state.parentDetails,
    }
}
export default connect(mapStatetoProps, null)(DashboardContainer);