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
import UserAvatar from 'react-native-user-avatar';
import Button from 'apsl-react-native-button';
Icon.loadFont();
export default class ParentProfileComponent extends Component {
  render() {
    return (
      <Container>
        <Header style={{backgroundColor: '#F79A70'}}>
          <Left>
            <TouchableOpacity onPress={this.props.openDashboard}>
              <Icon name="bars" color="white" size={23} />
            </TouchableOpacity>
          </Left>
          <Body>
            <Title style={{fontSize: 22, fontWeight: 'bold'}}>Profile</Title>
          </Body>
          <Right style={{marginRight:5}}>
            {// <TouchableOpacity onPress={this.props.navigateToNotification}>
            //   <Icon name="plus-circle" color="white" size={30} />
            // </TouchableOpacity>
            }
          </Right>
        </Header>
        <Content style={{paddingVertical:10,paddingHorizontal:12}}>
          <Card>
            <CardItem>
              <UserAvatar size={90} name={this.props.parent ? this.props.parent.ParentName.charAt(0) : "Parent Name" } />
              <Body style={{marginLeft: '5%',marginTop:'4%',alignItems:'center'}}>
                <Text style={{fontSize: 21, fontWeight: 'bold'}}>
                  {this.props.parent ? this.props.parent.ParentName : ""}
                </Text>
                  <Text style={{fontSize: 14, color: 'grey'}}>{this.props.parent ? this.props.parent.ParentPhone : ""}</Text>
                <Text style={{fontSize: 14, color: 'grey'}}>
                  {this.props.parent ? this.props.parent.ParentEmail : ""}
                </Text>
              
              </Body>
            </CardItem>
          </Card>

           <Card >
          <Item style={{marginTop: '1%',padding:10}}>
            <Left>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                Secondary Contact
              </Text>

              <Text style={{fontSize: 13, color: 'grey',marginTop: '1%'}}>
                Name : {this.props.parent.SecondaryName}
              </Text>
            </Left>

            <Body>
              <Text style={{fontSize: 13, color: 'grey'}}> {this.props.parent.SecondaryEmail}</Text>

              <Text style={{fontSize: 13, color: 'grey'}}> {this.props.parent.SecondaryPhone}</Text>
            </Body>
          </Item>

          <Item style={{marginTop: '1%',padding:10}}>
            <Left>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>Address</Text>

              <Text style={{fontSize: 13, color: 'grey'}}>
                {this.props.parent.ParentAddress1} {this.props.parent.ParentAddress2} {this.props.parent.ParentAddress3}
                {this.props.parent.ParentCity}{'\n'}{this.props.parent.ParentCountry} - {this.props.parent.ParentPostalCode}
              </Text>
            </Left>
          </Item>
           </Card>
          <Text style={{fontSize: 16, fontWeight: 'bold',marginTop: '3%',marginLeft:'1%'}}>Children</Text>
            <FlatList
            style={{marginBottom:20}}
          data={this.props.student}
          extraData={this.props.student}
          renderItem={({item, index}) => 
          <Card style={{ width:'98%',alignSelf: 'center',marginTop: '3%'}}>
            <CardItem>
              <UserAvatar size={70} name={ item ? item.StudentName.charAt(0) : "Student Name"} />
              <Body style={{marginLeft: '10%',marginTop:2}}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                  {item.StudentName}
                </Text>
                <Text style={{fontSize: 12, color: 'grey'}}>
                 {item.StudentLevel}
                </Text>
                 <Text style={{fontSize: 12, color: 'grey'}}>
                 {item.StudentSchoolName}
                </Text>
              </Body>
            </CardItem>
            <View style={{flexDirection: 'row'}}>
              <Button  onPress={(student)=>this.props.navigateToStudentProfile(item)}
                style={{
                  backgroundColor: '#F79A70',
                   width: '44%',
                  marginLeft:'4%',
                  borderColor: 'transparent',
                }}
                textStyle={{fontSize: 18, color: 'white'}}>
                Profile
              </Button>
              <Button onPress={(StudentId)=>this.props.navigateToSchedule(item.StudentId)}
                style={{
                  backgroundColor: '#F79A70',
                    width: '44%',
                  marginLeft:'4%',
                  borderColor: 'transparent',
                }}
                textStyle={{fontSize: 18, color: 'white'}}>
                Schedule
              </Button>
            </View>
          </Card>
          }
          keyExtractor={item => item.index}
        />
        </Content>
      </Container>
    );
  }
}