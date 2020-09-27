import React, {Component} from 'react';
import {
  Container,
  Content,
  Header,
  Left,
  Body,
  Right,
  Button,
  Title,
  Text,
  Card,
  CardItem,
  Item,
  Footer,
  FooterTab,
} from 'native-base';
import {View, TouchableOpacity, Style, StyleSheet,Dimensions,Image,ScrollView,StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImageSlider from 'react-native-image-slider';
import { FlatGrid } from 'react-native-super-grid';
import moment from 'moment';
Icon.loadFont();
const screenHeight = Math.round(Dimensions.get('window').height);

const image1 = require('../assets/images/message.png')
const image2 = require('../assets/images/result.png')
const image3 = require('../assets/images/makup.png')
const image4 = require('../assets/images/invoice.png')
const image5 = require('../assets/images/attendance.png')
const image6 = require('../assets/images/profile.png')

class HomeDashboardComponent extends Component {
    render() {
      const items = [
        { image: image1, code: 'Message',screen:'' }, { image: image2, code: 'Results',screen:'' },
        { image: image3, code: 'Makeup',screen:'MakeupLessonsContainer' }, { image: image4, code: 'Invoice',screen:'' },
        { image: image5, code: 'Attendance',screen:'SchedulesContainer' }, { image: image6, code: 'Register',screen:'RegisterContainer' },
      ];
        return (
           <Container>
        <Header style={{backgroundColor: '#F79A70'}}>
          <Left>
            <TouchableOpacity onPress={this.props.openDashboard}>
              <Icon name="bars" color="white" size={23} />
            </TouchableOpacity>
          </Left>
          <Body>
            <Title style={{color:'#fff',fontSize: 22, fontWeight: 'bold'}}>Dashboard</Title>
          </Body>
          <Right>
            <TouchableOpacity onPress={this.props.navigateToNotification}>
              <Icon name="bell" color="white" size={23} />
            </TouchableOpacity>
          </Right>
        </Header>
         <Content padder>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{fontSize:13}}>Announcements</Text>
          <TouchableOpacity>
          <Text style={{fontSize:13,marginRight:10}}>View all</Text>
           </TouchableOpacity>
           </View>
         <Card style={{height:130, width:'98%',marginTop:'3%'}}>
          <ImageSlider 
            loopBothSides
            autoPlayWithInterval={3000}
            images={[
           'httpss://law.utulsa.edu/wp-content/uploads/sites/3/2014/12/Email-Header-Deans-Report-16_171.jpg',
           'httpss://alumni.harvard.edu/sites/default/files/page/HCF_email%20header%20%26%20%20footer%20FINAL_0.jpg',
           'httpss://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSEn-BzqV8jkpRBfbs8F6s4v0VjVIr7lsvnrfEqn6kkzPmQW6qE&usqp=CAU',
           
           ]}
           />
           </Card>
           <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize:13,marginTop:'1%'}}>Quick Links</Text>
            <TouchableOpacity onPress={this.props.openDashboard}>
            <Text style={{fontSize:13,marginTop:'1%',marginRight:10}}>View all</Text>
            </TouchableOpacity>
           </View>
            <ScrollView>
            <Card style={styles.cardStyle}>
               <FlatGrid
                itemDimension={Platform.OS === 'ios' ? 100 : 70}
                items={items}
                style={styles.gridView}
                renderItem={({ item, index }) => (
                  <TouchableOpacity onPress={(screen)=>this.props.navigateTo(item.screen)}>
                  <View style={styles.itemContainer}>
                    <Image style={styles.itemImage} source={item.image}/>
                    <Text style={styles.itemCode}>{item.code}</Text>
                  </View>
                   </TouchableOpacity>
                )}
              />
            </Card>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
             <Text style={{fontSize:15,marginTop:5,marginLeft:5}}>Upcoming Classes</Text>
             <TouchableOpacity onPress={(screen)=>this.props.navigateTo('SchedulesContainer')}>
             <Text style={{fontSize:15,marginTop:5,marginRight:10}}>View all</Text>
              </TouchableOpacity>
           </View>
               <FlatGrid
                itemDimension={260}
                items={this.props.schedules.slice(0,2)}
                style={styles.gridView2}
                renderItem={({ item, index }) => (
                  <TouchableOpacity onPress={()=>this.props.navigateToSchedule(item.Date)}>
                  <View style={styles.itemContainer2}>
                    <Text style={styles.itemName2}> {item.CourseName}</Text>
                    <Text style={styles.itemCode2}>{' @'}{item.FromTime}{' '}
                    {moment(item.FromTime, "HH:mm").diff(moment(item.ToTime, 'HH:mm'),'hours')}
                    {'hrs / week on '}{moment(moment(item.Date, "YYYY-MM-DD'T'HH:mm:ss")).format('DD MMM YYYY')}</Text>
                   <Text style={styles.itemName1}> Attendee: {item.StudentName} </Text>
                  </View>
                  </TouchableOpacity>
                )}
              />
            </ScrollView>
         </Content>
        </Container>
        );
    }
}
export default HomeDashboardComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardStyle:{
      height:210, 
      width:'90%',
      marginTop:'3%',
      marginLeft:'5%',
      borderRadius:15
    },
    gridView: {
    marginTop: 7,
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems:'center',
    borderRadius: 5,
    padding: 10,
    height: 80,
    backgroundColor:'#fff',
    borderColor:'#F79A70',
    borderWidth:1.8
  },
  itemName: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#000',
    textAlign:'center'
  },
  itemImage:{
    width:50,
    height:50
  },
  gridView2: {
    marginTop: 7,
    // flex: 1,
  },
  itemContainer2: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 80,
    backgroundColor:'#fff',
    borderColor:'#F79A70',
    borderWidth:1
  },
  itemName2: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
  itemName1:{
    fontSize: 13,
    color: 'grey',
    // fontWeight: '100',
  },
  itemCode2: {
    fontWeight: '600',
    fontSize: 12,
    color: '#000',
  }
});