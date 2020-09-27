import React, {Component} from 'react';
import {View, Text, StyleSheet, Alert,AsyncStorage} from 'react-native';
import StudentRegisterComponent from '../components/StudentRegisterComponent';
import { Toast } from 'native-base';
const moment = require('moment');

class StudentRegisterContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      excistingStudent:false,
      tearmsAndCondition:false,
      studentName:'',
      chineaseName:'',
      studentSchoolName:undefined,
      dateofbirth:'',
      studentgender:'',
      selectednation: undefined,
      selectedschoolLevel:undefined,
      selectedcentre:undefined,
      selectedchilds:undefined,
      selectedClass:undefined,
      selectedChineseCurriculums:undefined,
      natinality:[],
      levels:[],
      learningCenter:[],
      students:[],
      schools:[],
      classes:[],
      chineseCurriculums:[],
      RegistrationId:this.props.navigation.getParam('RegistrationId'),
      editable:true,
      loading:false
    };
  }

  onChangestudentName=(value)=>{
    this.setState({studentName:value})
  }

  onChangechineaseName=(value)=>{
    this.setState({chineaseName:value})
  }

  onChangestudentSchoolName=(value)=>{
    this.setState({studentSchoolName:value})
  }

  onValueChangestudentgender=(value)=>{
    this.setState({studentgender:value})
  }

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  onChangechineseCurriculums=(value)=>{
    this.setState({selectedChineseCurriculums:value})
  }

  onChangeTermsAndCondition=()=>{
    this.setState({tearmsAndCondition:!this.state.tearmsAndCondition})
  }

  onChangeExcistingStudent = async () =>{
    this.setState({excistingStudent:!this.state.excistingStudent})
    if(!this.state.excistingStudent){
      const token = await AsyncStorage.getItem('@sessionToken:key');
      fetch("https://sappdemo.adaptivebizapp.com/api/Registration?StudentId="+this.state.selectedchilds+"",  {
            method: "GET",
            headers: {
            'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({chineaseName:responseJson.ChineseName})
          this.setState({dateofbirth:moment(responseJson.DateOfBirth).format("DD-MM-YYYY")})
          this.setState({studentgender:responseJson.Gender})
          this.setState({selectednation:responseJson.NationalityId})
          this.setState({selectedschoolLevel:responseJson.LevelId})
          this.setState({studentSchoolName:responseJson.SchoolId})
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
    }else{
      this.setState({chineaseName:""})
      this.setState({dateofbirth:""})
      this.setState({studentgender:""})
      this.setState({selectednation:""})
      this.setState({selectedschoolLevel:""})
      this.setState({studentSchoolName:""})
      this.setState({selectedChineseCurriculums:""})
    }
  }

  onValueChangeNatinality = (value) =>{
    this.setState({selectednation:value})
  }

  onValueChangeSchoolLevel = (value) =>{
    this.setState({selectedschoolLevel:value})
  }

  onValueChangeCentre = async (value)=>{
    this.setState({selectedcentre:value});
    const token = await AsyncStorage.getItem('@sessionToken:key');
    fetch("https://sappdemo.adaptivebizapp.com/api/Registration?LearningCenterId="+value+"&SelectedId=null",  {
        method: "GET",
        headers: {
        'Authorization': 'Bearer ' + token
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({classes:responseJson});
        this.setState({selectedClass:responseJson[0]})
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

  onValueStudent =async(value)=>{
    this.setState({selectedchilds:value})
    const token = await AsyncStorage.getItem('@sessionToken:key');
      fetch("https://sappdemo.adaptivebizapp.com/api/Registration?StudentId="+value+"",  {
            method: "GET",
            headers: {
            'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({chineaseName:responseJson.ChineseName})
          this.setState({dateofbirth:moment(responseJson.DateOfBirth).format("DD-MM-YYYY")})
          this.setState({studentgender:responseJson.Gender})
          this.setState({selectednation:responseJson.NationalityId})
          this.setState({selectedschoolLevel:responseJson.LevelId})
          this.setState({studentSchoolName:responseJson.SchoolId})
          this.setState({selectedChineseCurriculums:responseJson.ChineseCurriculumInSchoolId})
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

  onChangeDateofBirth = (date) =>{
    this.setState({dateofbirth:date})
  }

  onChangeClass=(value)=>{
    this.setState({selectedClass:value})
  }

   async UNSAFE_componentWillMount() {
      const token = await AsyncStorage.getItem('@sessionToken:key');
      const parentId = await AsyncStorage.getItem('@parentId:key');
      if(this.state.RegistrationId){
           if(this.props.navigation.getParam('RegistrationStatus') === 'Completed' ){
             this.setState({editable:false});
           }
           fetch("https://sappdemo.adaptivebizapp.com/api/Registration?Id="+this.state.RegistrationId,  {
                method: "GET",
                headers: {
                'Authorization': 'Bearer ' + token
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
              this.setState({studentName:responseJson.ApplicantName})
              this.setState({chineaseName:responseJson.ChineseName})
              this.setState({dateofbirth:moment(responseJson.DateOfBirth).format("DD-MM-YYYY")})
              this.setState({studentgender:responseJson.Gender})
              this.setState({selectednation:responseJson.NationalityId})
              this.setState({selectedschoolLevel:responseJson.LevelId})
              this.setState({studentSchoolName:responseJson.SchoolId})
              this.setState({selectedChineseCurriculums:responseJson.ChineseCurriculumInSchoolId})
              this.setState({selectedcentre:responseJson.LearningCenterId})
              this.setState({tearmsAndCondition:responseJson.IsAgreedToConditions})
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
      fetch("https://sappdemo.adaptivebizapp.com/api/Registration/GetDropdownList?BusinessUnitId=null&FilterId=null&SelectedId=null&Type=Nationality",  {
                method: "GET",
                headers: {
                'Authorization': 'Bearer ' + token
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
              this.setState({natinality:responseJson});
              this.setState({selectednation:responseJson[0].Value})
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
            fetch("https://sappdemo.adaptivebizapp.com/api/Registration/GetDropdownList?BusinessUnitID=00000000-0000-0000-0000-000000000000&FilterId=null&SelectedId=null&Type=School",  {
                method: "GET",
                headers: {
                'Authorization': 'Bearer ' + token
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
              this.setState({schools:responseJson});
              this.setState({studentSchoolName:responseJson[0].value})
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
            fetch("https://sappdemo.adaptivebizapp.com/api/Registration?BusinessUnitId=00000000-0000-0000-0000-000000000000&SelectedId=null",  {
                method: "GET",
                headers: {
                'Authorization': 'Bearer ' + token
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
              this.setState({chineseCurriculums:responseJson});
              this.setState({selectedChineseCurriculums:responseJson[0].Id})
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
          fetch("https://sappdemo.adaptivebizapp.com/api/Registration/GetDropdownList?BusinessUnitId=00000000-0000-0000-0000-000000000000&FilterId=null&SelectedId=null&Type=Level",  {
                method: "GET",
                headers: {
                'Authorization': 'Bearer ' + token
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
              this.setState({levels:responseJson});
              this.setState({selectedschoolLevel:responseJson[0].value})
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
             fetch("https://sappdemo.adaptivebizapp.com/api/Registration/GetDropdownList?BusinessUnitId=00000000-0000-0000-0000-000000000000&FilterId=null&SelectedId=null&Type=LearningCenter",  {
                method: "GET",
                headers: {
                'Authorization': 'Bearer ' + token
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
              this.setState({learningCenter:responseJson});
                fetch("https://sappdemo.adaptivebizapp.com/api/Registration?LearningCenterId="+responseJson[0].Value+"&SelectedId=null",  {
                  method: "GET",
                  headers: {
                  'Authorization': 'Bearer ' + token
                  }
                })
                .then((response) => response.json())
                .then((responseJson) => {
                  this.setState({classes:responseJson});
                  this.setState({selectedClass:responseJson[0]})
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
            fetch("https://sappdemo.adaptivebizapp.com/api/Student?ParentId="+parentId+"",  {
                method: "GET",
                headers: {
                'Authorization': 'Bearer ' + token
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
              this.setState({students:responseJson});
              this.setState({selectedchilds:responseJson[0].StudentId})
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

   registerExcistingStudent=async()=>{
     this.setState({loading:true});
     const token = await AsyncStorage.getItem('@sessionToken:key'); 
     fetch('https://sappdemo.adaptivebizapp.com/api/Registration',
        {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(
            {
           "Id":null,
           "ApplicantName":null,
           "ChineseName":null,
           "DateOfBirth":null,
           "NationlityId":null,
           "LevelId":null,
           "SchoolId":null,
           "ChineseCurriculumInSchoolId": this.state.selectedChineseCurriculums,
           "Gender":null,
           "LearningCenterId":this.state.selectedcentre,
           "ClassId":this.state.selectedClass.ClassId,
           "StudentTypeId":null,
           "IsAgreedToConditions": 1,
           "StudentId":this.state.selectedchilds 
            }
          )
        })
        .then((response) => response.json())
            .then((responseJson) => {
              this.setState({loading:false});
              Toast.show({
                text: responseJson,
                type: "sucess",
                position: "bottom",
                duration: 3000,
                textStyle: { textAlign:'center' },
            })
            this.props.navigation.navigate('RegisterContainer');
            })
        .catch(error => {
          this.setState({loading:false});
            Toast.show({
                text: error.message,
                type: "danger",
                position: "bottom",
                duration: 3000,
                textStyle: { textAlign:'center' },
            })
        });
   }

   registerNewStudent = async () => {
    if(!this.state.dateofbirth || !this.state.studentName || !this.state.studentgender){
      if(!this.state.studentName ){
         Toast.show({
              text: "Please enter Student Name",
              type: "danger",
              position: "bottom",
              duration: 3000,
              textStyle: { textAlign:'center' },
          })
      }else if(!this.state.dateofbirth){
        Toast.show({
              text: "Please select Correct Date of Birth",
              type: "danger",
              position: "bottom",
              duration: 3000,
              textStyle: { textAlign:'center' },
          })
      }else if(!this.state.studentgender){
         Toast.show({
              text: "Please select Student Gender",
              type: "danger",
              position: "bottom",
              duration: 3000,
              textStyle: { textAlign:'center' },
          })
      }
    }else{
      this.setState({loading:true});
    const token = await AsyncStorage.getItem('@sessionToken:key');
     fetch('https://sappdemo.adaptivebizapp.com/api/Registration',
        {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(
            {
           "Id":null,
           "ApplicantName":this.state.studentName,
           "ChineseName":this.state.chineaseName,
           "DateOfBirth":moment(this.state.dateofbirth, "DD-MM-YYYY").format("YYYY-MM-DD"),
           "NationlityId":this.state.selectednation,
           "LevelId":this.state.selectedschoolLevel,
           "SchoolId":this.state.studentSchoolName,
           "ChineseCurriculumInSchoolId": this.state.selectedChineseCurriculums,
           "Gender":this.state.studentgender,
           "LearningCenterId":this.state.selectedcentre,
           "ClassId":this.state.selectedClass.ClassId,
           "StudentTypeId":null,
           "IsAgreedToConditions": 1,
           "StudentId":null
            }
          )
        })
        .then((response) => response.json())
        .then((responseJson) => {
           this.setState({loading:false});
              Toast.show({
              text: responseJson,
              type: "success",
              position: "bottom",
              duration: 3000,
              textStyle: { textAlign:'center' },
            })
            this.props.navigation.navigate('RegisterContainer');
        })
        .catch(error => {
          this.setState({loading:false});
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

  render() {
    return (
      <StudentRegisterComponent
        isModalVisible={this.state.isModalVisible}
        toggleModal={this.toggleModal}
        natinality={this.state.natinality}
        selectednation={this.state.selectednation}
        onValueChangeNatinality={(value)=>{this.onValueChangeNatinality(value)}}
        levels={this.state.levels}
        selectedschoolLevel={this.state.selectedschoolLevel}
        onValueChangeSchoolLevel={(value)=>{this.onValueChangeSchoolLevel(value)}}
        learningCenter={this.state.learningCenter}
        selectedcentre={this.state.selectedcentre}
        onValueChangeCentre={(value)=>{this.onValueChangeCentre(value)}}
        onChangeExcistingStudent={this.onChangeExcistingStudent}
        excistingStudent={this.state.excistingStudent}
        students={this.state.students}
        selectedchilds={this.state.selectedchilds}
        onValueStudent={(value)=>{this.onValueStudent(value)}}
        dateofbirth={this.state.dateofbirth}
        onChangeDateofBirth={(date)=>{this.onChangeDateofBirth(date)}}
        tearmsAndCondition={this.state.tearmsAndCondition}
        onChangeTermsAndCondition={this.onChangeTermsAndCondition}
        studentName={this.state.studentName}
        chineaseName={this.state.chineaseName}
        studentSchoolName={this.state.studentSchoolName}
        onChangechineaseName={(value)=>this.onChangechineaseName(value)}
        onChangestudentName={(value)=>this.onChangestudentName(value)}
        onChangestudentSchoolName={(value)=>this.onChangestudentSchoolName(value)}
        registerNewStudent={this.registerNewStudent}
        registerExcistingStudent={this.registerExcistingStudent}
        studentgender={this.state.studentgender}
        onValueChangestudentgender={(value)=>this.onValueChangestudentgender(value)}
        schools={this.state.schools}
        RegistrationId={this.state.RegistrationId}
        classes={this.state.classes}
        selectedClass={this.state.selectedClass}
        onChangeClass={(value)=>this.onChangeClass(value)}
        editable={this.state.editable}
        chineseCurriculums={this.state.chineseCurriculums}
        selectedChineseCurriculums={this.state.selectedChineseCurriculums}
        onChangechineseCurriculums={(val)=>this.onChangechineseCurriculums(val)}
        loading={this.state.loading}
      />
    );
  }
}
export default StudentRegisterContainer;