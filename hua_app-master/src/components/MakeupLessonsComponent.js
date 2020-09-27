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
import {View, TouchableOpacity, Style, StyleSheet,FlatList,Dimensions,Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from 'apsl-react-native-button';
import UserAvatar from 'react-native-user-avatar';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
const windowWidth = Dimensions.get('window').width;
import { NavigationEvents } from 'react-navigation';
Icon.loadFont();
export default class MakeupLessonsComponent extends Component {
  render() {
    return (
      <Container>
      <NavigationEvents
                onDidFocus={this.props.getMakeuplessonList}
                />
        <Content style={{padding:6}}>

      {this.props.makeupLessons.length <=0 ?
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
        </SkeletonPlaceholder>

      :

        <FlatList
            data={this.props.makeupLessons}
            style={{marginBottom:20}}
            renderItem={({ item }) => (
               <Card style={styles.cardstyle}>
            <View style={{padding: 5}}>
              <Text style={{fontSize: 16}}>
                {item.Course}
              </Text>
            </View>

            <View style={styles.infoview}>
              <View style={{marginRight: '2%'}}>
                <Text style={styles.datetextstyle}>{item.AbsentDetails.replace(/ .*/, '')}</Text>
                <Text style={styles.timetextstyle}>{item.AbsentDetails.substring(9, )}</Text>
              </View>

              <View>
                <Text style={{fontSize: 12, fontWeight: 'bold'}}>to</Text>
              </View>

              <View style={{marginLeft: '2%'}}>
                <Text style={styles.datetextstyle}>{item.MakeupDetails.replace(/ .*/, '')}</Text>
                <Text style={styles.timetextstyle}>{item.MakeupDetails.substring(9, )}</Text>
              </View>
              <Button
                style={styles.buttonstyleen}
                textStyle={{color: '#FFFFFF', fontSize: 14}}>
                {item.Status}
              </Button>
            </View>
          </Card>
            )}
          /> }
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

  cardstyle: {
    width: '95%',
    alignSelf: 'center',
    borderRadius: 10,
    padding:5
  },

  headerfooterstyle: {
    backgroundColor: '#F79A70',
  },
  infoview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonstyleen: {
    width: '25%',
    height: '60%',
    backgroundColor: 'green',
    padding: 5,
    borderRadius: 20,
    borderColor: 'transparent',
    marginLeft: '3%',
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
    alignSelf: 'center',
    color: 'green',
  },
  timetextstyle: {
    fontSize: 10,
    color: 'green',
  },
});