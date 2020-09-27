import React, {Component} from 'react';
import {
  Container,
  Content,
  Header,
  Left,
  Body,
  Right,
  Title,
  Text,
  Card,
  CardItem,
  Item,
  Footer,
  FooterTab,
  Input,
  Picker,
  Form,
} from 'native-base';
import {View, TouchableOpacity, Style, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from 'apsl-react-native-button';
import Modal from 'react-native-modal';
import {BubblesLoader} from 'react-native-indicator';
Icon.loadFont();
export default class AddMakeupComponent extends Component {

  render() {
    return (
      <Container>
        <Content style={{padding:5}}>
          <Card style={{width: '95%', alignSelf: 'center',padding:15}}>
            <View style={{marginLeft: '3%'}}>
              <Text style={{fontWeight: 'bold'}}>Student</Text>
              <Form>
                <Item regular picker style={styles.itemstyle}>
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    selectedValue={this.props.selectedStudent}
                    onValueChange={(value,index)=>this.props.onValueChangeStudent(value,index)}>
                   {this.props.studentsList.map((item, index) => {
                    return (
                    <Picker.Item label={item.StudentName} value={item.StudentId} key={index}/>
                ) })}
                  </Picker>
                </Item>
              </Form>
            </View>
             <View style={{marginLeft: '3%', marginTop: '2%'}}>
              <Text style={{fontWeight: 'bold'}}>Course</Text>
              <Form>
                <Item regular picker style={styles.itemstyle}>
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />} 
                     selectedValue={this.props.selectedCourse}
                    onValueChange={(value)=>this.props.onValueChangeCourse(value)}>
                    {this.props.courses.map((item, index) => {
                    return (
                    <Picker.Item label={item.CourseName} value={item.CourseId} key={index}/>
                ) })}
                  </Picker>
                </Item>
              </Form>
            </View>
             </Card>

              <Card style={{width: '95%', alignSelf: 'center',padding:15}}>
            <View >
             <Text
                style={{alignSelf: 'center', fontSize: 20, fontWeight: 'bold',color:'#F79A70'}}>
               Absent Lesson
              </Text>
             </View>

           

            <View style={{marginLeft: '3%', marginTop: '2%'}}>
              <Text style={{fontWeight: 'bold'}}>Class</Text>
              <Form>
                <Item regular picker style={styles.itemstyle}>
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    selectedValue={this.props.selectedAbsentClass}
                    onValueChange={(value)=>this.props.onValueChangeAbsentClass(value)}>
                   { this.props.AbsentClass.length>0 ? this.props.AbsentClass.map((item, index) => {
                    return (
                    <Picker.Item label={item.ClassCode} value={item.ClassId} key={index}/>
                ) }) : <Picker.Item label="Select Class" value="" /> }
                  </Picker>
                </Item>
              </Form>
            </View>

            <View style={{marginLeft: '3%', marginTop: '2%'}}>
              <Text style={{fontWeight: 'bold'}}>Lesson</Text>
              <Form>
                <Item regular picker style={styles.itemstyle}>
                  <Picker
                    mode="dropdown"
                     iosIcon={<Icon name="arrow-down" />}
                    selectedValue={this.props.selectedAbsentLesson}
                    onValueChange={(value)=>this.props.onValueChangeAbsentLesson(value)}>
                   {this.props.AbsentLessons.length >0 ? this.props.AbsentLessons.map((item, index) => {
                    return (
                    <Picker.Item label={item.LessonName} value={item.LessonId} key={index}/>
                ) }) : <Picker.Item label="Select Lesson" value="" /> }
                  </Picker>
                </Item>
              </Form>
            </View>
             </Card>

              <Card style={{width: '95%', alignSelf: 'center',padding:15}}>
            <View >
             <Text
                style={{alignSelf: 'center', fontSize: 20, fontWeight: 'bold',color:'#F79A70'}}>
                New Lesson
              </Text>
             </View>


            <View style={{marginLeft: '3%', marginTop: '2%'}}>
              <Text style={{fontWeight: 'bold'}}>Class</Text>
              <Form>
                <Item regular picker style={styles.itemstyle}>
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                  selectedValue={this.props.selectedMakeupClass}
                    onValueChange={(value)=>this.props.onValueChangeMakeupClass(value)}>
                     { this.props.MakeupClasses.length>0 ? this.props.MakeupClasses.map((item, index) => {
                    return (
                    <Picker.Item label={item.ClassCode} value={item.ClassId} key={index}/>
                ) }) : <Picker.Item label="Select Class" value="" /> }
                  </Picker>
                </Item>
              </Form>
            </View>

            <View style={{marginLeft: '3%', marginTop: '2%'}}>
              <Text style={{fontWeight: 'bold'}}>Lesson</Text>
              <Form>
                <Item regular picker style={styles.itemstyle}>
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    selectedValue={this.props.selectedMakeupLesson}
                    onValueChange={(value)=>this.props.onValueChangeMakeupLesson(value)}>
                   {this.props.MakeupLessons.length >0 ? this.props.MakeupLessons.map((item, index) => {
                    return (
                    <Picker.Item label={item.LessonName} value={item.LessonId} key={index}/>
                ) }): <Picker.Item label="Select Lesson" value="" /> }
                  </Picker>
                </Item>
              </Form>
            </View>

           { // <View style={{marginLeft: '3%', marginTop: '3%'}}>
            //   <Text style={{fontWeight: 'bold'}}>Availability : Yes</Text>
            // </View>
            }

            <View
              style={{
                marginTop: '6%',
                flexDirection: 'row',
                alignSelf: 'center',
              }}>
              <Button onPress={this.props.createMakup}
                style={{
                  backgroundColor: 'green',
                  width: '60%',
                  borderRadius: 20,
                  borderColor: 'transparent',
                }}
                textStyle={{fontSize: 18, color: 'white', fontWeight: 'bold'}}>
                Request
              </Button>
            </View>
          </Card>
        </Content>
         <Modal isVisible={this.props.loading} backdropOpacity={0.5} animationIn={"fadeIn"} animationOut={'fadeOut'} >
            <View style={{
             flex: 1 ,justifyContent:"center",alignItems:'center'
            }} >
              <BubblesLoader color="#F79A70"
              size={60}/>
            </View>
            
          </Modal>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  itemstyle: {
    width: '95%',
    height: 45,
    borderColor: '#F79A70',
    borderRadius:5,
    marginTop:'2%'
  },
});