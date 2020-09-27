import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    AsyncStorage,StatusBar
} from "react-native";
import SplashScreen from './SplashScreen';
import NavigationContainer from './container/NavigationContainer';
import LoginNavigationContainer from './container/LoginNavigationContainer';
import { connect } from 'react-redux';
import { Toast } from 'native-base';
import moment from 'moment';
console.disableYellowBox = true;
class Main extends Component {
    constructor(props){
        super(props);
           this.state={
              currentScreen:'Splash',
              isLoggedIn:false
           }
    }

    async UNSAFE_componentWillMount() {
        const token = await AsyncStorage.getItem('@sessionToken:key');
        const parentId = await AsyncStorage.getItem('@parentId:key');
        if(token){
            this.setState({isLoggedIn:true});
            fetch("https://sappdemo.adaptivebizapp.com/api/Student?ParentId="+parentId+"",  {
                method: "GET",
                headers: {
                'Authorization': 'Bearer ' + token
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
              this.props.updateStudents(responseJson);
            })
            .catch(error => {
                Toast.show({
                    text: error.message,
                    type: "danger",
                    position: "bottom",
                    duration: 3000,
                    textStyle: { textAlign:'center' },
                })
            });
             fetch("https://sappdemo.adaptivebizapp.com/api/Parent?ParentId="+parentId+"",  {
                method: "GET",
                headers: {
                'Authorization': 'Bearer ' + token
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.props.updateParentDetails(responseJson);
            })
            .catch(error => {
                Toast.show({
                    text: error.message,
                    type: "danger",
                    position: "bottom",
                    duration: 3000,
                    textStyle: { textAlign:'center' },
                })
            });
            let formdata = new FormData();
            formdata.append("ParentId", parentId)
           
            fetch("https://sappdemo.adaptivebizapp.com/api/Class",  {
              method: "POST",
              headers: {
              'Authorization': 'Bearer ' + token
              },
              body: formdata
          })
          .then((response) => response.json())
          .then((responseJson) => {
             let upcomming=[];
              for(var i=0;i<responseJson.length;i++){
                  for (let j = 0; j < responseJson[i].length; j++) {
                    if(moment(responseJson[i][j].Date).isSameOrAfter()){
                        upcomming.push(responseJson[i][j]);
                    }        
                  }
              }
             const upcommingSorted  = upcomming.sort((a,b) => new moment(a.Date).format('YYYYMMDD') - new moment(b.Date).format('YYYYMMDD'))
              this.props.updateSchedules(upcommingSorted);
              this.setState({ currentScreen: "Home" });
          })
          .catch(error => {
              Toast.show({
                  text: error.message,
                  type: "danger",
                  position: "bottom",
                  duration: 3000,
                  textStyle: { textAlign:'center' },
              })
          });
        }else {
            this.setState({ IsLoggedIn: false });
            setTimeout(() => { this.setState({ currentScreen: "Home" }) }, 2500);
        }
    }
    

    render() {
        StatusBar.setBarStyle('dark-content', true);
        StatusBar.setBackgroundColor("#ffffff");
        const { currentScreen } = this.state
        let mainScreen = currentScreen === 'Splash' ? <SplashScreen/> : this.state.isLoggedIn ? <NavigationContainer/> : <LoginNavigationContainer/>
        return mainScreen
    }
}
function mapDispachertoProps(dispatch) {
    return {
        updateParentDetails: (parentDetails) => dispatch({
            type: 'UPDATE_PARENT_DETAILS',
            payload: { parentDetialsList: parentDetails }
        }),
        updateStudents: (students) => dispatch({
            type: 'UPDATE_STUDENT_DETAILS',
            payload: { studentsList: students }
        }),
        updateSchedules:(schedules)=> dispatch({
            type: 'UPDATE_SCHEDULES',
            payload: { scheduleList: schedules}
        })
    }
}
export default connect(null, mapDispachertoProps)(Main);