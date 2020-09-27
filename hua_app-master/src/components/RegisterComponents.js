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
import {View, TouchableOpacity, Style, StyleSheet,FlatList,Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from 'apsl-react-native-button';
import UserAvatar from 'react-native-user-avatar';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
const windowWidth = Dimensions.get('window').width;
Icon.loadFont();
import moment from 'moment';
import { NavigationEvents } from 'react-navigation';

class RegisterComponents extends Component {
    render() {
        return (
           <Container>
           <NavigationEvents
                onDidFocus={this.props.getRegistrationList}
                />
        <Content style={{padding:6}}>
         {this.props.RegistrationList.length <=0 ?
         <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item justifyContent='center' alignItems="center" marginTop={3}>
          <SkeletonPlaceholder.Item width={windowWidth-30} height={90} borderRadius={10} marginTop={5}/>
          <SkeletonPlaceholder.Item width={windowWidth-30} height={90} borderRadius={10} marginTop={10}/>
          <SkeletonPlaceholder.Item width={windowWidth-30} height={90} borderRadius={10}  marginTop={10}/>
          <SkeletonPlaceholder.Item width={windowWidth-30} height={90} borderRadius={10} marginTop={10}/>
          <SkeletonPlaceholder.Item width={windowWidth-30} height={90} borderRadius={10}  marginTop={10}/>
          <SkeletonPlaceholder.Item width={windowWidth-30} height={90} borderRadius={10} marginTop={10}/>
          <SkeletonPlaceholder.Item width={windowWidth-30} height={90} borderRadius={10} marginTop={10}/>
        </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder> : 
        <FlatList
            data={this.props.RegistrationList}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={()=>this.props.navigateToStudentRegistration(item.RegistrationId,item.Status)} >
          <Card  style={styles.cardstyle}>
            <View style={{padding: 5}}>
              <Text style={{fontSize: 17}}>
                {item.ClassName}
              </Text>
            </View>

            <View style={styles.infoview}>
              <View >
                <Text style={styles.datetextstyle}>{item.StudentName}</Text>
                <Text style={styles.timetextstyle}>Updated : {moment(item.LastUpdatedTime, "YYYY-MM-DD'T'HH:mm:ss").format('DD MMM YYYY - hh:mm a')}</Text>
              </View>

             
              <Button
                style={styles.buttonstyleen}
                textStyle={{color: '#FFFFFF', fontSize: 15}}>
               {item.Status}
              </Button>
            </View>
          </Card> 
          </TouchableOpacity>
          )}/> }
        </Content>
      </Container>
        );
    }
}
export default RegisterComponents;

const styles = StyleSheet.create({
  carditemstyle: {
    borderBottomWidth: 1,
    borderBottomColor: '#F79A70',
    width: '80%',
    alignSelf: 'center',
  },

  cardstyle: {
    width: '95%',
    alignSelf: 'center',
    borderRadius: 10,
    padding: 5
  },

  headerfooterstyle: {
    backgroundColor: '#F79A70',
  },
  infoview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft:'3%'
  },
  buttonstyleen: {
    width: '30%',
    height: '65%',
    backgroundColor: 'green',
    padding: 5,
    borderRadius: 5,
    borderColor: 'transparent',
    marginLeft: '10%',
    marginTop:'3%'
  },
  buttonstylecomp: {
    width: '25%',
    height: '60%',
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 20,
    borderColor: 'transparent',
    marginLeft: '5%',
  },
  datetextstyle: {
    fontSize: 12,
  },
  timetextstyle: {
    fontSize: 12
  },
});