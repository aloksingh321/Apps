import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    AsyncStorage
} from "react-native";
import ParentLoginComponent from '../components/ParentLoginComponent';
import { Toast } from 'native-base';
var qs = require('qs');
import { connect } from 'react-redux';
import moment from 'moment';

class ParentLoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      passwordVisible:true,
      loading:false
    };
  }
  onValueChangeUsername(value) {
    this.setState({
      username: value,
    });
  }

  onValueChangePassword(value) {
    this.setState({
      password: value,
    });
  }

  togglePasswordVisiblity=()=>{
      this.setState({passwordVisible:!this.state.passwordVisible})
  }

   async saveKey(sessionToken,parentId) {
    try {
      await AsyncStorage.setItem('@sessionToken:key', sessionToken);
      await AsyncStorage.setItem('@parentId:key', parentId);
    } catch (error) {
      this.setState({loading:false})
      Toast.show({
        text: "Connection failed..! Please try again.",
        type: "danger",
        position: "bottom",
        duration: 3000,
        textStyle: { textAlign:'center' },
        })
    }
    }

 login = () =>{
    this.setState({loading:true})
    if(this.state.username && this.state.password){
        fetch('https://sappdemo.adaptivebizapp.com/Token',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },
          body: qs.stringify({
            grant_type: 'password',
            username: this.state.username,
            password: this.state.password
          })
        }).then((response) => response.json())
        .then((responseJson) => {
            if(responseJson.access_token){
              this.saveKey(responseJson.access_token,responseJson.parentId)
                fetch("https://sappdemo.adaptivebizapp.com/api/Student?ParentId="+responseJson.parentId+"",  {
                method: "GET",
                headers: {
                'Authorization': 'Bearer ' + responseJson.access_token
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
                fetch("https://sappdemo.adaptivebizapp.com/api/Parent?ParentId="+responseJson.parentId+"",  {
                method: "GET",
                headers: {
                'Authorization': 'Bearer ' + responseJson.access_token
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
                formdata.append("ParentId", responseJson.parentId)
            
                fetch("https://sappdemo.adaptivebizapp.com/api/Class",  {
                method: "POST",
                headers: {
                'Authorization': 'Bearer ' + responseJson.access_token
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
                 this.navigateToHome();
                this.setState({loading:false})
                Toast.show({
                  text: "Login Successfull.",
                  type: "success",
                  position: "bottom",
                  duration: 2000,
                  textStyle: { textAlign:'center' },
                })
            }else{
                this.setState({loading:false})
                Toast.show({
                text: responseJson.error_description,
                type: "danger",
                position: "bottom",
                duration: 3000,
                textStyle: { textAlign:'center' },
              })
            }
        })
        .catch(error => {
            this.setState({loading:false})
              Toast.show({
                text: error.message,
                type: "danger",
                position: "bottom",
                duration: 3000,
                textStyle: { textAlign:'center' },
              })
        });
    }
  }
    navigateToHome=()=>{
        this.props.navigation.navigate('NavigationContainer');
    }
    navigateToForgotPassword=()=>{
        this.props.navigation.navigate('ForgotPasswordContainer');
    }
    render() {
        return (
            <ParentLoginComponent
            navigateToForgotPassword={this.navigateToForgotPassword}
            username={this.state.username}
            password={this.state.password}
            onValueChangePassword={(value)=>this.onValueChangePassword(value)}
            onValueChangeUsername={(value)=>this.onValueChangeUsername(value)}
            login={this.login}
            passwordVisible={this.state.passwordVisible}
            togglePasswordVisiblity={this.togglePasswordVisiblity}
            loading={this.state.loading}
            />
        );
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
export default connect(null, mapDispachertoProps)(ParentLoginContainer);