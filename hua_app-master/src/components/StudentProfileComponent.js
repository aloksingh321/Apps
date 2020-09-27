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
} from 'native-base';
import {View, TouchableOpacity, Style, StyleSheet,FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from 'apsl-react-native-button';
import UserAvatar from 'react-native-user-avatar';
Icon.loadFont();
export default class StudentProfileComponent extends Component {
  render() {
    return (
      <Container>
        <Content>
          <Card style={{width: '95%', alignSelf: 'center',marginTop:'5%'}}>
            <CardItem>
              <UserAvatar size={70} name={this.props.student ? this.props.student.StudentName.charAt(0) : "Student Name"} />
              <Body style={{marginLeft: '10%'}}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                  {this.props.student.StudentName}
                </Text>
                <Text style={{fontSize: 13}}>{this.props.student.StudentLevel}</Text>
                <Text style={{fontSize: 13}}>{this.props.student.StudentSchoolName}</Text>
              </Body>
            </CardItem>
          </Card>
          <Text style={{marginLeft:10,marginTop:'5%'}}>Courses</Text>

      {this.props.student.CourseList.length > 0 ?
           <FlatList
          data={this.props.student.CourseList}
          extraData={this.props.student.CourseList}
          renderItem={({item, index}) => 

          <Card style={{width: '95%', alignSelf: 'center',marginTop:'5%'}}>
            

            <View style={styles.infoview}>
             { // <Text style={{fontSize: 12, color: 'grey', marginTop: '1%'}}>
              //   25 June 2019 - 24 April 2020
              // </Text>
              }
              <View style={{padding: 5,width:'60%'}}>
              <Text style={{fontSize: 18}}>{item.CourseName}</Text>
            </View>
              <Button
                style={item.CourseName.CourseStatus==="New" ? styles.buttonstyleen : styles.buttonstylecomp}
                textStyle={{color: '#FFFFFF', fontSize: 15}}>
                {item.CourseStatus}
              </Button>
            </View>
          </Card>
          }/>  
          :
          <Card style={{width: '85%', alignSelf: 'center',alignItems:'center',justifyContent:'center',marginTop:'5%'}}>
            <View style={{padding: 5}}>
              <Text style={{fontSize: 16, color: 'grey'}}>No Courses</Text>
            </View>
          </Card>}
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  carditemstyle: {
    borderBottomWidth: 1,
    borderBottomColor: '#F79A70',
    width: '80%',
    alignSelf: 'center',
  },

  headerfooterstyle: {
    backgroundColor: '#F79A70',
  },
  infoview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  buttonstyleen: {
    width: '40%',
    height: Platform.OS === 'ios' ? "80%" : "60%",
    backgroundColor: '#F79A70',
    padding: 5,
    borderRadius: 20,
    marginTop:20,
    borderColor: 'transparent',
  },
  buttonstylecomp: {
    width: '40%',
    height: Platform.OS === 'ios' ? "80%" : "60%",
    backgroundColor: 'green',
    padding: 5,
    borderRadius: 20,
    marginTop:8,
    borderColor: 'transparent',
  },
});