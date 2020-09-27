import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,AsyncStorage
} from "react-native";
import { Toast } from 'native-base';
import { connect } from 'react-redux';
import AddMakeupComponent from '../components/AddMakeupComponent'

class AddMakeupLessonContainer extends Component {
     constructor(props) {
    super(props);
    this.state = {
      selectedStudent:'',
      AbsentClass:[],
      MakeupClasses:[],
      courses:[],
      AbsentLessons:[],
      MakeupLessons:[],
      selectedCourse:'',
      selectedAbsentClass:'',
      selectedAbsentLesson:'',
      selectedMakeupClass:'',
      selectedMakeupLesson:'',
      loading:false
    };
  }

  onValueChangeCourse(value){
      this.setState({selectedCourse:value});
  }

  async onValueChangeStudent(value,index) {
    this.setState({
      selectedStudent: value,
    });
    this.setState({courses:this.props.studentsList[index].CourseList});
    this.setState({selectedCourse:this.props.studentsList[index].CourseList[0].CourseId})
    const token = await AsyncStorage.getItem('@sessionToken:key');
    const parentId = await AsyncStorage.getItem('@parentId:key');
    fetch("https://sappdemo.adaptivebizapp.com/api/Class?StudentId="+this.props.studentsList[index].StudentId+"&SelectedId=null",  {
        method: "GET",
        headers: {
        'Authorization': 'Bearer ' + token
        }
    })
    .then((response) => response.json())
    .then((responseJson) => {
        this.setState({AbsentClass:responseJson});
        this.setState({selectedAbsentClass:responseJson[0].ClassId})
         fetch("https://sappdemo.adaptivebizapp.com/api/Class?ClassId="+responseJson[0].ClassId+"&AbsentLessonId=null&SelectedId=null",  {
            method: "GET",
            headers: {
            'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({AbsentLessons:responseJson});
            this.setState({selectedAbsentLesson:responseJson[0].LessonId})
             fetch("https://sappdemo.adaptivebizapp.com/api/Class?AbsentClassId="+this.state.selectedAbsentClass+"&SelectedId=null",  {
            method: "GET",
            headers: {
            'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({MakeupClasses:responseJson});
            this.setState({selectedMakeupClass:responseJson[0].ClassId})
             fetch("https://sappdemo.adaptivebizapp.com/api/Class?ClassId="+responseJson[0].ClassId+"&AbsentLessonId="+this.state.selectedAbsentLesson+"&SelectedId=null",  {
                method: "GET",
                headers: {
                'Authorization': 'Bearer ' + token
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({MakeupLessons:responseJson});
                this.setState({selectedMakeupLesson:responseJson[0].LessonId})
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
  }

  async onValueChangeAbsentClass(value){
      this.setState({selectedAbsentClass:value});
      const token = await AsyncStorage.getItem('@sessionToken:key');
      const parentId = await AsyncStorage.getItem('@parentId:key');
      fetch("https://sappdemo.adaptivebizapp.com/api/Class?ClassId="+value+"&AbsentLessonId=null&SelectedId=null",  {
            method: "GET",
            headers: {
            'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({AbsentLessons:responseJson});
            this.setState({selectedAbsentLesson:responseJson[0].LessonId})
            fetch("https://sappdemo.adaptivebizapp.com/api/Class?AbsentClassId="+this.state.selectedAbsentClass+"&SelectedId=null",  {
            method: "GET",
            headers: {
            'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({MakeupClasses:responseJson});
            this.setState({selectedMakeupClass:responseJson[0].ClassId})
             fetch("https://sappdemo.adaptivebizapp.com/api/Class?ClassId="+responseJson[0].ClassId+"&AbsentLessonId="+this.state.selectedAbsentLesson+"&SelectedId=null",  {
                method: "GET",
                headers: {
                'Authorization': 'Bearer ' + token
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({MakeupLessons:responseJson});
                this.setState({selectedMakeupLesson:responseJson[0].LessonId})
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

  async onValueChangeAbsentLesson(value){
      const token = await AsyncStorage.getItem('@sessionToken:key');
       fetch("https://sappdemo.adaptivebizapp.com/api/Class?ClassId="+this.state.selectedMakeupClass+"&AbsentLessonId="+value+"&SelectedId=null",  {
            method: "GET",
            headers: {
            'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({MakeupLessons:responseJson});
            this.setState({selectedMakeupLesson:responseJson[0].LessonId})
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
      this.setState({selectedAbsentLesson:value});
  }

  async onValueChangeMakeupClass(value){
      this.setState({selectedMakeupClass:value});
      const token = await AsyncStorage.getItem('@sessionToken:key');
      const parentId = await AsyncStorage.getItem('@parentId:key');
       fetch("https://sappdemo.adaptivebizapp.com/api/Class?ClassId="+value+"&AbsentLessonId="+this.state.selectedAbsentLesson+"&SelectedId=null",  {
            method: "GET",
            headers: {
            'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({MakeupLessons:responseJson});
            this.setState({selectedMakeupLesson:responseJson[0].LessonId})
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

  onValueChangeMakeupLesson(value){
      this.setState({selectedMakeupLesson:value});
  }

  componentDidMount = async () => {
    this.setState({selectedStudent:this.props.studentsList[0].StudentId})
    this.setState({courses:this.props.studentsList[0].CourseList})
    this.setState({selectedCourse:this.props.studentsList[0].CourseList[0].CourseId})
    const token = await AsyncStorage.getItem('@sessionToken:key');
    const parentId = await AsyncStorage.getItem('@parentId:key');
   fetch("https://sappdemo.adaptivebizapp.com/api/Class?StudentId="+this.props.studentsList[0].StudentId+"&SelectedId=null",  {
                method: "GET",
                headers: {
                'Authorization': 'Bearer ' + token
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({AbsentClass:responseJson});
                this.setState({selectedAbsentClass:responseJson[0].ClassId})
                fetch("https://sappdemo.adaptivebizapp.com/api/Class?ClassId="+responseJson[0].ClassId+"&AbsentLessonId=null&SelectedId=null",  {
                    method: "GET",
                    headers: {
                    'Authorization': 'Bearer ' + token
                    }
                })
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({AbsentLessons:responseJson});
                    this.setState({selectedAbsentLesson:responseJson[0].LessonId})
                     fetch("https://sappdemo.adaptivebizapp.com/api/Class?AbsentClassId="+this.state.selectedAbsentClass+"&SelectedId=null",  {
                    method: "GET",
                    headers: {
                    'Authorization': 'Bearer ' + token
                    }
                })
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({MakeupClasses:responseJson});
                    this.setState({selectedMakeupClass:responseJson[0].ClassId})
                    fetch("https://sappdemo.adaptivebizapp.com/api/Class?ClassId="+responseJson[0].ClassId+"&AbsentLessonId="+this.state.selectedAbsentLesson+"&SelectedId=null",  {
                        method: "GET",
                        headers: {
                        'Authorization': 'Bearer ' + token
                        }
                    })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        this.setState({MakeupLessons:responseJson});
                        this.setState({selectedMakeupLesson:responseJson[0].LessonId})
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
  }

  createMakup=async()=>{
      this.setState({loading:true});
    const token = await AsyncStorage.getItem('@sessionToken:key');
    const parentId = await AsyncStorage.getItem('@parentId:key');
     var date = new Date();
      var year = date.getFullYear();
      fetch('https://sappdemo.adaptivebizapp.com/api/MakeupLesson',
        {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(
           {
                "Id":"null",
                "LessonAbsentYear":year,
                "LessonAbsentClassId":this.state.selectedAbsentClass,
                "LessonAbsentLessonId":this.state.selectedAbsentLesson,
                "MakeupClassId":this.state.selectedMakeupClass,
                "MakeupLessonsId":this.state.selectedMakeupLesson,
                "MakeupLessonYear":year,
                "StudentId":this.state.selectedStudent,
                "CourseId":this.state.selectedCourse,
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
            this.props.navigation.navigate('MakeupLessonsContainer');
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

    render() {
        return (
            <AddMakeupComponent
            studentsList={this.props.studentsList}
            selectedStudent={this.state.selectedStudent}
            onValueChangeStudent={(val,index)=>this.onValueChangeStudent(val,index)}
            AbsentClass={this.state.AbsentClass}
            MakeupClasses={this.state.MakeupClasses}
            courses={this.state.courses}
            selectedCourse={this.state.selectedCourse}
            AbsentLessons={this.state.AbsentLessons}
            MakeupLessons={this.state.MakeupLessons}
            onValueChangeCourse={(val)=>this.onValueChangeCourse(val)}
            selectedAbsentClass={this.state.selectedAbsentClass}
            onValueChangeAbsentClass={(val)=>this.onValueChangeAbsentClass(val)}
            selectedAbsentLesson={this.state.selectedAbsentLesson}
            onValueChangeAbsentLesson={(val)=>this.onValueChangeAbsentLesson(val)}
            selectedMakeupClass={this.state.selectedMakeupClass}
            onValueChangeMakeupClass={(val)=>this.onValueChangeMakeupClass(val)}
            selectedMakeupLesson={this.state.selectedMakeupLesson}
            onValueChangeMakeupLesson={(val)=>this.onValueChangeMakeupLesson(val)}
            createMakup={this.createMakup}
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
export default connect(mapStatetoProps)(AddMakeupLessonContainer);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});