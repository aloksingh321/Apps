import React, {Component} from 'react';
import {View, Text, StyleSheet, Alert,TouchableOpacity,AsyncStorage} from 'react-native';
import SchedulesComponents from '../components/SchedulesComponents';
import Icon from 'react-native-vector-icons/FontAwesome';
import StudentRegisterComponent from '../components/StudentRegisterComponent';
import { Toast } from 'native-base';
import moment from 'moment';
import { connect } from 'react-redux';
Icon.loadFont();
class SchedulesContainer extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
            title: 'Schedules',
            headerStyle: {
                backgroundColor:'#F79A70'
            },
            headerTitleStyle: {
                color:'white',
                right: 12,
                fontSize:16
            },headerTintColor:'#fff',
            headerRight:<TouchableOpacity
            onPress={navigation.getParam('onPressSyncButton')}
                style={{
                  borderWidth: 2,
                  borderColor: '#F79A70',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 40,
                  height: 40,
                  backgroundColor: '#fff',
                  borderRadius: 50,
                  marginRight:10
                }}>
                <Icon name="filter" color="#F79A70" size={23} />
              </TouchableOpacity> 
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      StudentId:this.props.navigation.getParam('StudentId'),
      studentUpcommingSchedules:undefined,
      studentPastSchedules:undefined,
      allSchedules:undefined,
      upcommingSchedules:[],
      pastSchedules:[],
      isUpcoming:true,
      scheduleIndexDate:this.props.navigation.getParam('ScheduleIndex'),
      scheduleindex:undefined,
      studentsDropdown:[],
      courseDropdown:[],
      loading:false
    };
  }

  componentDidMount = async () => {
    this.props.navigation.setParams({ onPressSyncButton: this.toggleModal });
    const token = await AsyncStorage.getItem('@sessionToken:key');
    const parentId = await AsyncStorage.getItem('@parentId:key');

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
       let allsch=[];
      for (let i = 0; i < responseJson.length; i++) {
        allsch.push(responseJson[i]);
      }
      this.setState({ allSchedules: allsch });
      let upcomming=[];
      let past=[];
      let students=[];
      for(var i=0;i<responseJson.length;i++){
        
        if(this.state.StudentId){
            if(this.state.StudentId===responseJson[i][0].StudentId){
              students.push({'StudentId':responseJson[i][0].StudentId,'StudentName':responseJson[i][0].StudentName,'IsChecked':true,'Index':i})
              for(var j=0;j<responseJson[i].length;j++){
              if(moment(responseJson[i][j].Date).isAfter()){
                upcomming.push(responseJson[i][j]);
              }
              if(moment(responseJson[i][j].Date).isBefore()){
                past.push(responseJson[i][j]);
              }
        }
            }else{
              students.push({'StudentId':responseJson[i][0].StudentId,'StudentName':responseJson[i][0].StudentName,'IsChecked':false,'Index':i})
            }
        }else{
          students.push({'StudentId':responseJson[i][0].StudentId,'StudentName':responseJson[i][0].StudentName,'IsChecked':true,'Index':i})
          var yesterday = moment().subtract(1, "day").format("YYYY-MM-DD");
            for(var j=0;j<responseJson[i].length;j++){
              if(moment(responseJson[i][j].Date).isAfter(yesterday)){
                  upcomming.push(responseJson[i][j]);
              }
              else if(moment(responseJson[i][j].Date).isBefore()){
                past.push(responseJson[i][j]);
              }
            }
        }
      }
      const upcommingSorted  = upcomming.sort((a,b) => new moment(a.Date).format('YYYYMMDD') - new moment(b.Date).format('YYYYMMDD'))
      const pastSorted  = past.sort((a,b) => new moment(b.Date).format('YYYYMMDD') - new moment(a.Date).format('YYYYMMDD'))
      for(var i=0;i<upcommingSorted.length;i++){
        if(this.state.scheduleIndexDate == upcommingSorted[i].Date){
          this.setState({scheduleindex:i});
          break;
        }
        }
      this.setState({upcommingSchedules:upcommingSorted});
      this.setState({pastSchedules:pastSorted});
      this.setState({studentsDropdown:students});
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

     fetch("https://sappdemo.adaptivebizapp.com/api/Course?ParentId="+parentId+"",  {
          method: "GET",
          headers: {
          'Authorization': 'Bearer ' + token
          }
      })
      .then((response) => response.json())
      .then((responseJson) => {
          const cources=[];
          for (let i = 0; i < responseJson.length; i++) {
            responseJson[i].IsChecked = true;
            cources.push(responseJson[i]);
          }
          this.setState({courseDropdown:cources});
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
  }

  past=()=>{
    this.setState({isUpcoming:false})
  }

  upcoming=()=>{
    this.setState({isUpcoming:true})
  }

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  openDashboard = () => {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  };

  checkboxStudent = (index) => {
   let list=this.state.studentsDropdown
   list[index].IsChecked=!list[index].IsChecked
   this.setState({studentsDropdown:list})
  };

  checkboxCourse = (index) => {
   let list=this.state.courseDropdown
   list[index].IsChecked=!list[index].IsChecked
   this.setState({courseDropdown:list})
  };

  applyFilter=async()=>{
    this.setState({loading:true});
    const token = await AsyncStorage.getItem('@sessionToken:key');
    const parentId = await AsyncStorage.getItem('@parentId:key');
    let formdata = new FormData();
    formdata.append("ParentId", parentId);
    let j=0;
    for (let i = 0; i <this.state.studentsDropdown.length; i++) {
      if(this.state.studentsDropdown[i].IsChecked){
        formdata.append("StudentId["+j+"]", this.state.studentsDropdown[i].StudentId);
        j++;
      }
    }
    let k=0;
    for (let i = 0; i < this.state.courseDropdown.length; i++) {
      if(this.state.courseDropdown[i].IsChecked){
        formdata.append("CourseId["+k+"]", this.state.courseDropdown[i].CourseId);
        k++;
      }
    }
    fetch("https://sappdemo.adaptivebizapp.com/api/Class",  {
        method: "POST",
        headers: {
        'Authorization': 'Bearer ' + token
        },
        body: formdata
    })
    .then((response) => response.json())
    .then((responseJson) => {
      let allsch=[];
      for (let i = 0; i < responseJson.length; i++) {
        allsch.push(responseJson[i]);
      }
      this.setState({ allSchedules: allsch });
      let upcomming=[];
      let past=[];
      for(var i=0;i<responseJson.length;i++){
          var yesterday = moment().subtract(1, "day").format("YYYY-MM-DD");
            for(var j=0;j<responseJson[i].length;j++){
              if(moment(responseJson[i][j].Date).isAfter(yesterday)){
                  upcomming.push(responseJson[i][j]);
              }
              else if(moment(responseJson[i][j].Date).isBefore()){
                past.push(responseJson[i][j]);
              }
            }
      }
      const upcommingSorted  = upcomming.sort((a,b) => new moment(a.Date).format('YYYYMMDD') - new moment(b.Date).format('YYYYMMDD'))
      const pastSorted  = past.sort((a,b) => new moment(b.Date).format('YYYYMMDD') - new moment(a.Date).format('YYYYMMDD'))
      this.setState({upcommingSchedules:upcommingSorted});
      this.setState({pastSchedules:pastSorted});
      this.setState({loading:false});
      this.toggleModal();
    })
    .catch(error => {
      this.setState({loading:false});
      this.toggleModal();
        Toast.show({
            text: error.message,
            type: "danger",
            position: "bottom",
            duration: 3000,
            textStyle: { textAlign:'center' },
        })
        setTimeout(() => {
          this.toggleModal()
        }, 3000);
    });
  }
  
  render() {
    return (
      <SchedulesComponents
        isModalVisible={this.state.isModalVisible}
        checkboxStudent={(index)=>this.checkboxStudent(index)}
        checkboxCourse={(index)=>this.checkboxCourse(index)}
        toggleModal={this.toggleModal}
        openDashboard={this.openDashboard}
        navigateToNotification={this.navigateToNotification}
        studentPastSchedules={this.state.studentPastSchedules}
        studentUpcommingSchedules={this.state.studentUpcommingSchedules}
        allSchedules={this.state.allSchedules}
        upcommingSchedules={this.state.upcommingSchedules}
        pastSchedules={this.state.pastSchedules}
        isUpcoming={this.state.isUpcoming}
        past={this.past}
        upcoming={this.upcoming}
        studentsDropdown={this.state.studentsDropdown}
        scheduleindex={this.state.scheduleindex}
        applyFilter={this.applyFilter}
        courseDropdown={this.state.courseDropdown}
        loading={this.state.loading}
      />
    );
  }
}
function mapStatetoProps(state) {
    return {
        studentsList: state.students,
    }
}
export default connect(mapStatetoProps)(SchedulesContainer);