import React, {Component} from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Container,
  Content,
  Header,
  Left,
  Body,
  Right,
  List,
  ListItem,
} from 'native-base';
import UserAvatar from 'react-native-user-avatar'
Icon.loadFont();
class DashboardComponent extends Component {
    render() {
        return (
          <Container>
        <Content>
        
        <View style={{alignItems:'center',justifyContent:'center',width:'100%',
              backgroundColor:'#F79A70',paddingHorizontal:20,paddingVertical:23,borderBottomLeftRadius:50,
              }}>
               
                <Text style={{color:'#fff',fontSize:22,fontWeight:'bold'}}>{this.props.parent ? this.props.parent.ParentName : ""}</Text>
                <Text style={{color:'#fff',fontSize:15}}>{this.props.parent ? this.props.parent.ParentPhone : ""}</Text>
                <Text style={{color:'#fff',fontSize:15}}>{this.props.parent ? this.props.parent.ParentEmail : ""}</Text>
        </View>
          <List style={{marginTop:'3%'}}>
           
             <ListItem avatar >
              <Left>
                <Image
            style={{height: 32, width: 32}}
            source={require('../assets/images/register.png')}
          />
              </Left>
              <Body>
                <TouchableOpacity onPress={()=>this.props.navigateToScreen('RegisterContainer')}>
                  <Text style={{fontSize: 17}}>Programme Register</Text>
                </TouchableOpacity>
              </Body>
              <Right>
                <Icon
                  name="chevron-right"
                  color="#5d5d5d"
                  style={{top: '30%'}}
                />
              </Right>
            </ListItem>

            
            <ListItem avatar style={{marginTop:'1%'}}>
              <Left>
                 <Image
            style={{height: 30, width: 30}}
            source={require('../assets/images/message.png')}
          />
              </Left>
              <Body>
                <TouchableOpacity >
                  <Text style={{fontSize: 17}}>Message</Text>
                </TouchableOpacity>
              </Body>
              <Right>
                <Icon
                  name="chevron-right"
                  color="#5d5d5d"
                  style={{top: '30%'}}
                />
              </Right>
            </ListItem>

            <ListItem avatar style={{marginTop:'1%'}}>
              <Left>
                 <Image
            style={{height: 30, width: 30}}
            source={require('../assets/images/result.png')}
          />
              </Left>
              <Body>
                <TouchableOpacity>
                  <Text style={{fontSize: 17}}>Results</Text>
                </TouchableOpacity>
              </Body>
              <Right>
                <Icon
                  name="chevron-right"
                  color="#5d5d5d"
                  style={{top: '30%'}}
                />
              </Right>
            </ListItem>


             <ListItem avatar style={{marginTop:'1%'}}>
              <Left>
               <Image
            style={{height: 30, width: 30}}
            source={require('../assets/images/makup.png')}
          />
              </Left>
              <Body>
                <TouchableOpacity onPress={()=>this.props.navigateToScreen('MakeupLessonsContainer')}>
                  <Text style={{fontSize: 17}}>Makeup Lessons</Text>
                </TouchableOpacity>
              </Body>
              <Right>
                <Icon
                  name="chevron-right"
                  color="#5d5d5d"
                  style={{top: '30%'}}
                />
              </Right>
            </ListItem>

            <ListItem avatar style={{marginTop:'1%'}}>
              <Left>
                <Image
            style={{height: 30, width: 30}}
            source={require('../assets/images/invoice.png')}
          />
              </Left>
              <Body>
                <TouchableOpacity >
                  <Text style={{fontSize: 17}}>Invoice</Text>
                </TouchableOpacity>
              </Body>
              <Right>
                <Icon
                  name="chevron-right"
                  color="#5d5d5d"
                  style={{top: '30%'}}
                />
              </Right>
            </ListItem>

            <ListItem avatar style={{marginTop:'1%'}}>
              <Left>
              <Image
            style={{height: 30, width: 30}}
            source={require('../assets/images/attendance.png')}
          />
              </Left>
              <Body>
                <TouchableOpacity onPress={()=>this.props.navigateToScreen('SchedulesContainer')}>
                  <Text style={{fontSize: 17}}>Attendance</Text>
                </TouchableOpacity>
              </Body>
              <Right>
                <Icon
                  name="chevron-right"
                  color="#5d5d5d"
                  style={{top: '30%'}}
                />
              </Right>
            </ListItem>
            

            <ListItem avatar style={{marginTop:'1%'}}>
              <Left>
                <Image
            style={{height: 28, width: 28}}
            source={require('../assets/images/logout.png')}
          />
              </Left>
              <Body>
                <TouchableOpacity onPress={this.props.handleOnPressLogout}>
                  <Text style={{fontSize: 17}}>Log Out</Text>
                </TouchableOpacity>
              </Body>
              <Right>
                <Icon
                  name="chevron-right"
                  color="#5d5d5d"
                  style={{top: '30%'}}
                />
              </Right>
            </ListItem>
            
          </List>
        </Content>
        <View style={{alignItems: 'center'}}>
          <Image
            style={{height: 100, width: 240}}
            source={require('../assets/images/logo.png')}
          />
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 12}}>VERSION 1.0.1</Text>
        </View>
      </Container>
        );
    }
}
export default DashboardComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});