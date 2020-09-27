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
  Radio,
} from 'native-base';
import {
  View,
  TouchableOpacity,
  Style,
  StyleSheet,
  CheckBox,FlatList,Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import moment from 'moment';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
const windowWidth = Dimensions.get('window').width;
import Button from 'apsl-react-native-button';
import {BubblesLoader} from 'react-native-indicator';
Icon.loadFont();
export default class SchedulesComponents extends Component {
  render() {
    return (
      <Container>
        <Content padder>
          <Card transparent style={{padding: 10, height: '100%'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: '2%',
              }}>
              <Button onPress={this.props.upcoming}
                rounded
                style={{
                  width: '40%',
                  backgroundColor: this.props.isUpcoming ? 'green' : 'lightgrey',
                  marginLeft: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 25,
                  borderColor: 'transparent',
                }}
                textStyle={{color: this.props.isUpcoming ? '#FFFFFF' : '#000' , fontSize: 17}}>
                Upcoming
              </Button>

              <Button onPress={this.props.past}
                rounded
                style={{
                  width: '40%',
                  backgroundColor: this.props.isUpcoming ? 'lightgrey' : 'green' ,
                  marginRight: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 25,
                  borderColor: 'transparent'}}
                textStyle={{color: this.props.isUpcoming ? '#000' : '#fff' , fontSize: 17}}>
                Past
              </Button>
            </View>

            {this.props.isUpcoming ? this.props.upcommingSchedules.length <=0 ?

            <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item justifyContent='center' alignItems="center" marginTop={3}>
          <SkeletonPlaceholder.Item width={windowWidth-45} height={110} borderRadius={10} marginTop={5}/>
          <SkeletonPlaceholder.Item width={windowWidth-45} height={110} borderRadius={10} marginTop={10}/>
          <SkeletonPlaceholder.Item width={windowWidth-45} height={110} borderRadius={10} marginTop={10}/>
          <SkeletonPlaceholder.Item width={windowWidth-45} height={110} borderRadius={10} marginTop={10}/>
           <SkeletonPlaceholder.Item width={windowWidth-45} height={110} borderRadius={10} marginTop={10}/>
        </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder> :

             <FlatList
          data={this.props.upcommingSchedules}
          extraData={this.props.upcommingSchedules}
          renderItem={({item, index}) => 

            <View style={index==this.props.scheduleindex ?  styles.cardviewbg : styles.cardview }>
           
              <Card style={{width: '98%',borderColor:'#F79A70',borderRadius:5, justifyContent: 'center',paddingHorizontal: 5}}>
                <View style={{padding: 5,flexDirection: 'row',justifyContent: 'space-between'}}>
                  <Text style={{fontSize: 16,fontWeight: 'bold'}}>
                   {item.CourseName}
                  </Text>
                   <Text style={{fontSize: 14, fontWeight: 'bold'}}>{moment(moment(item.Date, "YYYY-MM-DD'T'HH:mm:ss")).format("Do MMM")}</Text>
                </View>

               <View style={styles.infoview}>
              
                 <View style={{  flexDirection: 'row',justifyContent: 'center',top:3}}>
                 <View style={{marginRight: '5%'}}>
                    <Text style={{fontSize: 15, color: 'grey',fontWeight: 'bold'}}>{item.FromTime}</Text>
                  </View>
                  <View>
                    <Text style={{fontSize: 13}}>to</Text>
                  </View>
                  <View style={{marginLeft: '5%'}}>
                    <Text style={{fontSize: 15, color: 'grey',fontWeight: 'bold'}}>{item.ToTime}</Text>
                  </View>
                </View>

                 <Button
                    style={styles.buttonstyle}
                    textStyle={{color: '#FFFFFF', fontSize: 15}}>
                    {item.Status}
                  </Button>
                 </View>

                <View style={{ flexDirection: 'row',justifyContent: 'space-between',paddingHorizontal: 3,
                paddingBottom:6,marginTop:-5}}>
                  <Text style={{fontSize: 14, color: 'grey',marginLeft:'1%'}}>
                    <Text style={{fontSize: 14}}>Attendee : </Text>{item.StudentName} {'     '}
                  </Text>
                   <Text style={{fontSize: 14, color: 'grey',marginLeft:'1%'}}>
                    <Text style={{fontSize: 14}}>Tutor Name : </Text>{item.TutorName ? item.TutorName : "        "}
                  </Text>
                </View>
              </Card>
            </View>
          }/>

          : this.props.pastSchedules.length<=0 ?

          <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item justifyContent='center' alignItems="center" marginTop={3}>
          <SkeletonPlaceholder.Item width={windowWidth-45} height={110} borderRadius={10} marginTop={5}/>
          <SkeletonPlaceholder.Item width={windowWidth-45} height={110} borderRadius={10} marginTop={10}/>
          <SkeletonPlaceholder.Item width={windowWidth-45} height={110} borderRadius={10} marginTop={10}/>
          <SkeletonPlaceholder.Item width={windowWidth-45} height={110} borderRadius={10} marginTop={10}/>
           <SkeletonPlaceholder.Item width={windowWidth-45} height={110} borderRadius={10} marginTop={10}/>
        </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder> :

          <FlatList
          data={this.props.pastSchedules}
          extraData={this.props.pastSchedules}
          renderItem={({item, index}) => 

            <View style={styles.cardview }>
             <Card style={{width: '98%',borderColor:'#F79A70',borderRadius:5, justifyContent: 'center',paddingHorizontal: 5}}>
                <View style={{padding: 5,flexDirection: 'row',justifyContent: 'space-between'}}>
                  <Text style={{fontSize: 16,fontWeight: 'bold'}}>
                   {item.CourseName}
                  </Text>
                   <Text style={{fontSize: 14, fontWeight: 'bold'}}>{moment(moment(item.Date, "YYYY-MM-DD'T'HH:mm:ss")).format("Do MMM")}</Text>
                </View>

               <View style={styles.infoview}>
              
                 <View style={{  flexDirection: 'row',justifyContent: 'center',top:3}}>
                 <View style={{marginRight: '5%'}}>
                    <Text style={{fontSize: 15, color: 'grey',fontWeight: 'bold'}}>{item.FromTime}</Text>
                  </View>
                  <View>
                    <Text style={{fontSize: 13}}>to</Text>
                  </View>
                  <View style={{marginLeft: '5%'}}>
                    <Text style={{fontSize: 15, color: 'grey',fontWeight: 'bold'}}>{item.ToTime}</Text>
                  </View>
                </View>

                 <Button
                    style={styles.buttonstyle}
                    textStyle={{color: '#FFFFFF', fontSize: 15}}>
                    {item.Status}
                  </Button>
                 </View>

                <View style={{ flexDirection: 'row',justifyContent: 'space-between',paddingHorizontal: 3,
                paddingBottom:6,marginTop:-5}}>
                  <Text style={{fontSize: 14, color: 'grey',marginLeft:'1%'}}>
                    <Text style={{fontSize: 14}}>Attendee : </Text>{item.StudentName} {'     '}
                  </Text>
                   <Text style={{fontSize: 14, color: 'grey',marginLeft:'1%'}}>
                    <Text style={{fontSize: 14}}>Tutor Name : </Text>{item.TutorName ? item.TutorName : "        "}
                  </Text>
                </View>
              </Card>
            </View>
          }/>
           }
           
          </Card>
        </Content>
        <Modal isVisible={this.props.isModalVisible}>
          <Card style={{padding: 10}}>
            <Text style={{color: '#F79A70', fontWeight: '700', fontSize: 20}}>
              Filter
            </Text>
            <View style={{marginLeft: '3%', marginTop: '3%'}}>
              <Text>Student</Text>
            </View>

             <FlatList
          data={this.props.studentsDropdown}
          extraData={this.props.studentsDropdown}
          renderItem={({item, index}) => 
            <View style={{marginLeft: '4%', marginTop: '3%',flexDirection: 'row'}}>
              <CheckBox
                value={item.IsChecked}
                onChange={() => this.props.checkboxStudent(index)}
              />

              <Text style={{marginTop: '2%',color:'#000'}}>{item.StudentName}</Text>
            </View>
          } />

           <View style={{marginLeft: '5%', marginTop: '3%'}}>
              <Text>Course</Text>
            </View>

             <FlatList
          data={this.props.courseDropdown}
          extraData={this.props.courseDropdown}
          renderItem={({item, index}) => 
            <View style={{marginLeft: '4%', marginTop: '3%',flexDirection: 'row'}}>
              <CheckBox
                value={item.IsChecked}
                onChange={() => this.props.checkboxCourse(index)}
              />

              <Text style={{marginTop: '2%',color:'#000'}}>{item.CourseName}</Text>
            </View>
          } />

           { // <View style={{marginLeft: '4%', flexDirection: 'row'}}>
            //   <CheckBox
            //     value={this.props.checkstud}
            //     onChange={() => this.props.checkboxTeststud()}
            //   />

            //   <Text style={{marginTop: '2%'}}>Jin Bee Leng</Text>
            // </View>

            // <View style={{marginLeft: '5%', marginTop: '3%'}}>
            //   <Text>Course</Text>
            // </View>

            // <View style={{marginLeft: '4%', flexDirection: 'row'}}>
            //   <CheckBox
            //     value={this.props.checkcourse}
            //     onChange={() => this.props.checkboxTestcourse()}
            //   />

            //   <Text style={{marginTop: '2%'}}>Primary 3 Enriched</Text>
            // </View>

            // <View style={{marginLeft: '4%', flexDirection: 'row'}}>
            //   <CheckBox
            //     value={this.props.checkcourse1}
            //     onChange={() => this.props.checkboxTestcourse1()}
            //   />

            //   <Text style={{marginTop: '2%'}}>Primary 1 Enriched Program</Text>
            // </View>
            }
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                marginTop: '5%',
              }}>
              <Button onPress={this.props.applyFilter}
                style={{
                  width: '40%',
                  backgroundColor: 'green',
                  borderColor: 'transparent',
                }}
                textStyle={{color: '#FFFFFF', fontSize: 17, fontWeight: '700'}}>
                Apply
              </Button>

              <Button
                onPress={this.props.toggleModal}
                style={{
                  width: '40%',
                  marginLeft: '5%',
                  backgroundColor: 'red',
                  borderColor: 'transparent',
                }}
                textStyle={{color: '#FFFFFF', fontSize: 17, fontWeight: '700'}}>
                Cancel
              </Button>
            </View>
          </Card>
        </Modal>
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
  headerfooterstyle: {
    backgroundColor: '#F79A70',
  },

  cardview: {
    marginTop: '3%',
    backgroundColor:'lightgrey',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:5
  },
  cardviewbg: {
    marginTop: '3%',
    backgroundColor:'lightgrey',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:5
  },
  infoview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    marginTop:5
  },
  buttonstyle: {
    width: '40%',
    height: '60%',
    backgroundColor: '#F79A70',
    padding: 5,
    borderRadius: 20,
    borderColor: 'transparent',
    // marginRight: '4%',
  },
  datecard: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});