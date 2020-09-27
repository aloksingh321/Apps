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
import DatePicker from 'react-native-datepicker';
import CheckBox from 'react-native-check-box';
import Modal from 'react-native-modal';
import ToggleSwitch from 'toggle-switch-react-native';
const moment = require('moment');
import {BubblesLoader} from 'react-native-indicator';
Icon.loadFont();
export default class StudentRegisterComponent extends Component {
  
  render() {
    return (
      <Container>
      { this.props.excistingStudent ?

        <Content>
          <Card style={{width: '95%', alignSelf: 'center'}}>
            <CardItem>
              <Left>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                  Existing Child
                </Text>
              </Left>

              <Right>
                <ToggleSwitch
                  isOn={this.props.excistingStudent}
                  onColor="#F79A70"
                  offColor="lightgrey"
                  label=""
                  size="large"
                  onToggle={
                          this.props.onChangeExcistingStudent
                      }
                />
              </Right>
            </CardItem>
          </Card> 

          <Card style={{width: '95%', alignSelf: 'center',paddingLeft:10,paddingTop:10}}>
            <View style={{marginLeft: '3%', marginTop: '2%'}}>
              <Text>Select Child</Text>
              <Form style={{marginTop: '1%'}}>
                <Item regular picker style={styles.itemstyle}>
                  <Picker
                    mode="dropdown"
                    label="Select child"
                    iosHeader='Select Child'
                    iosIcon={<Icon name="angle-down" />}
                    selectedValue={this.props.selectedchilds}
                    onValueChange={this.props.onValueStudent.bind(this)}>
                    {  this.props.students.map((item, index) => {
                    return (
                    <Picker.Item label={item.StudentName} value={item.StudentId} key={index}/>
                    ) }) }
                  </Picker>
                </Item>
              </Form>
            </View>

            <View style={{marginLeft: '3%', marginTop: '3%'}}>
              <Text>Chinese Name</Text>
              <View style={{marginTop: '1%'}}>
                <Item regular style={styles.itemstyle1}>
                  <Input value={this.props.chineaseName}  disabled={true} />
                </Item>
              </View>
            </View>

            <View style={{flexDirection: 'row',justifyContent:'space-between',marginTop: '3%',width: '90%'}}>
              <View style={{marginLeft: '3%'}}>
                <Text style={{marginTop: '3%', marginLeft: '3%'}}>
                  Date of Birth
                </Text>
                <Item disabled >
                  <DatePicker
                  disabled={true}
                customStyles={{
                  dateInput:{
                    borderWidth: 1,marginLeft: 0,borderColor: '#F79A70',borderRadius:5,
                  },
                  dateIcon: {
                  position: 'absolute',
                  height: 0,
                  width: 0,
                },
                dateText: {
                  color: '#000'
                  }
                }}
                date={this.props.dateofbirth}
                format="DD-MM-YYYY"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                onDateChange={date => {
                      this.props.onChangeDateofBirth(date);
                    }}
              />
                </Item>
              </View>

              <View style={{marginLeft: '1%'}}>
                <Text style={{marginTop: '2%', marginLeft: '3%'}}>Gender</Text>
                <Form style={{marginTop: '1%'}}>
                  <Item disabled regular picker style={{borderColor: '#F79A70',borderRadius:5,backgroundColor: '#ededed',width:Platform.OS === 'ios' ? 180 : 140}}>
                    <Picker
                      mode="dropdown"
                      enabled={false}
                      iosIcon={<Icon name="angle-down" />}
                      style={{height: 39}}
                      selectedValue={this.props.studentgender}
                      onValueChange={this.props.onValueChangestudentgender.bind(this)}>
                      <Picker.Item label="MALE" value="0" />
                      <Picker.Item label="FEMALE" value="1" />
                    </Picker>
                  </Item>
                </Form>
              </View>
            </View>

            <View style={{marginLeft: '3%', marginTop: '3%'}}>
              <Text>Nationality</Text>
              <Form style={{marginTop: '1%'}}>
                <Item regular picker style={styles.itemstyle1}>
                  <Picker
                    mode="dropdown"
                     enabled={false}
                     selectedValue={'key0'}
                    iosIcon={<Icon name="angle-down" />} 
                    selectedValue={this.props.selectednation}
                    onValueChange={this.props.onValueChangeNatinality.bind(this)}>
                       {this.props.natinality.map((item, index) => {
                    return (
                    <Picker.Item label={item.Text} value={item.Value} key={index}/>
                ) })}
                  </Picker>
                </Item>
              </Form>
            </View>

            <View style={{marginLeft: '3%', marginTop: '3%'}}>
              <Text>Level in School</Text>
              <Form style={{marginTop: '1%'}}>
                <Item regular picker style={styles.itemstyle1}>
                  <Picker
                    mode="dropdown"
                     enabled={false}
                     selectedValue={'key0'}
                    iosIcon={<Icon name="angle-down" />}
                     selectedValue={this.props.selectedschoolLevel}
                    onValueChange={this.props.onValueChangeSchoolLevel.bind(this)}>
                    {this.props.levels.map((item, index) => {
                    return (
                    <Picker.Item label={item.Text} value={item.Value} key={index}/>
                ) })}
                  </Picker>
                </Item>
              </Form>
            </View>

            <View style={{marginLeft: '3%', marginTop: '2%'}}>
              <Text>School Name</Text>
              <Form style={{marginTop: '1%'}}>
                <Item regular picker style={styles.itemstyle1}>
                  <Picker
                    mode="dropdown"
                     enabled={false}
                     selectedValue={'key0'}
                    iosIcon={<Icon name="angle-down" />}
                    selectedValue={this.props.studentSchoolName}
                    onValueChange={this.props.onChangestudentSchoolName.bind(this)}>
                    {this.props.schools.map((item, index) => {
                    return (
                    <Picker.Item label={item.Text} value={item.Value} key={index}/>
                ) })}
                  </Picker>
                </Item>
              </Form>
            </View>

             <View style={{marginLeft: '3%', marginTop: '2%'}}>
              <Text>Chinese Curriculum</Text>
              <Form style={{marginTop: '1%'}}>
                <Item regular picker style={styles.itemstyle}>
                  <Picker
                    mode="dropdown"
                     enabled={true}
                     selectedValue={'key0'}
                    iosIcon={<Icon name="angle-down" />}
                    selectedValue={this.props.selectedChineseCurriculums}
                    onValueChange={this.props.onChangechineseCurriculums.bind(this)}>
                    {this.props.chineseCurriculums.map((item, index) => {
                    return (
                    <Picker.Item label={item.Name} value={item.Id} key={index}/>
                ) })}
                  </Picker>
                </Item>
              </Form>
            </View>

           { // <View
            //   style={{flexDirection: 'row', marginLeft: '3%', marginTop: '6%'}}>
            //   <Text style={{fontSize: 17}}>
            //     Is Chinese Curriculum in School
            //   </Text>
            //   <View style={{marginLeft: '10%'}}>
            //     <CheckBox
            //       onClick={
            //         this.props.onChanegChineseCurriculumInSchool
            //       }
            //       isChecked={this.props.chineseCurriculumInSchool}
            //     />
            //   </View>
            // </View>
            }
            <CardItem />
          </Card>

         
        <Card style={{width: '95%', alignSelf: 'center',paddingLeft:10,paddingTop:10}}>
           <View style={{marginLeft: '3%', marginTop: '2%'}}>
              <Text>Select Centre</Text>
              <Form style={{marginTop: '1%'}}>
                <Item regular picker style={styles.itemstyle}>
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="angle-down" />}
                    selectedValue={this.props.selectedcentre}
                    onValueChange={this.props.onValueChangeCentre.bind(this)}>
                    {this.props.learningCenter.map((item, index) => {
                    return (
                    <Picker.Item label={item.Text} value={item.Value} key={index}/>
                ) })}
                  </Picker>
                </Item>
              </Form>
            </View>

           <View style={{marginLeft: '3%', marginTop: '3%'}}>
             <Text>Select Class</Text>
              <Form style={{marginTop: '1%'}}>
                <Item regular picker style={styles.itemstyle}>
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="angle-down" />} 
                    selectedValue={this.props.selectedClass}
                    onValueChange={this.props.onChangeClass.bind(this)}>
                     {this.props.classes.length > 0 ? this.props.classes.map((item, index) => {
                    return (
                    <Picker.Item label={item.CourseName} value={item} key={index}/>
                ) }) : <Picker.Item label="No classes for selected Center" value="" key={-1}/> }
                  </Picker>
                </Item>
              </Form>
            </View>

            <View style={{marginLeft: '3%', marginTop: '5%'}}>
              <Text>Course Details</Text>
            </View>

      {this.props.selectedClass ?
            <Card style={{marginLeft: '3%', width: '89%',borderRadius:5,padding:5}}>
              <View style={{marginLeft: '3%'}}>
               <Text style={{fontWeight: 'bold'}}>Programme Name:</Text>
                <Text>{this.props.selectedClass.CourseName}</Text>
                <Text style={{fontWeight: 'bold'}}>Timing:</Text>
                <Text>{this.props.selectedClass.FromTime} to {this.props.selectedClass.ToTime}</Text>
                <Text style={{fontWeight: 'bold'}}>Period: </Text>
                <Text>{this.props.selectedClass.StartofCommencement} - {this.props.selectedClass.EndofCommencement}</Text>
                <Text style={{fontWeight: 'bold'}}>Center:</Text>
                <Text>{this.props.selectedClass.LearningCenter}</Text>
              </View>
            </Card> : null }

            <View
              style={{flexDirection: 'row', marginLeft: '3%', marginTop: '3%'}}>
              <View>
                <CheckBox
                  onClick={this.props.onChangeTermsAndCondition}
                  isChecked={this.props.tearmsAndCondition}
                />
              </View>
              <Text style={{fontSize: 17}}>  I agree the Terms & Conditions</Text>
            </View>
            <CardItem />
          </Card>

          <View
            style={{
              marginTop: '2%',
              flexDirection: 'row',
              alignSelf: 'center',
            }}>

            <Button
              onPress={this.props.registerExcistingStudent}
              style={{
                backgroundColor: 'green',
                width: '90%',
                borderRadius: 3,
                borderColor: 'transparent',
              }}
              isDisabled={ !this.props.tearmsAndCondition }
              textStyle={{fontSize: 18, color: 'white'}}>
              Register
            </Button>
          </View>
        </Content> : 
        <Content>
        {this.props.RegistrationId ?  null :
          <Card style={{width: '95%', alignSelf: 'center'}}>
            <CardItem>
              <Left>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                  Existing Child
                </Text>
              </Left>
            
               <Right>
                 <ToggleSwitch
                  isOn={this.props.excistingStudent}
                  onColor="#F79A70"
                  offColor="lightgrey"
                  label=""
                  size="large"
                  onToggle={
                          this.props.onChangeExcistingStudent
                      }
                />
              </Right> 
            </CardItem>
          </Card> }

          <Card style={{width: '95%', alignSelf: 'center',paddingLeft:10,paddingTop:20}}>
            <View style={{marginLeft: '3%'}}>
              <Text>Student Name</Text>
              <View style={{marginTop: '1%'}}>
                <Item regular style={styles.itemstyle}>
                  <Input disabled={!this.props.editable} value={this.props.studentName} 
                  onChangeText={(value)=>this.props.onChangestudentName(value)}
                  />
                </Item>
              </View>
            </View>

            <View style={{marginLeft: '3%', marginTop: '3%'}}>
              <Text>Chinese Name</Text>
              <View style={{marginTop: '1%'}}>
                <Item regular style={styles.itemstyle}>
                  <Input disabled={!this.props.editable}
                   value={this.props.chineaseName} 
                  onChangeText={(value)=>this.props.onChangechineaseName(value)}/>
                </Item>
              </View>
            </View>

            <View style={{flexDirection: 'row',justifyContent:'space-between',marginTop: '3%',width: '90%'}}>
              <View style={{marginLeft: '3%'}}>
                <Text style={{marginTop: '3%', marginLeft: '3%'}}>
                  Date of Birth
                </Text>
                 <View style={{marginTop: '1%'}}>
                <Item regular style={{ borderColor: '#F79A70',borderRadius:5}}>
                    <DatePicker color='#F79A70'
                    disabled={!this.props.editable}
                customStyles={{
                  dateInput:{
                    borderWidth: 0,marginLeft: 5
                  },
                  dateIcon: {
                  position: 'absolute',
                  height: 0,
                  width: 0,
                },
                dateText: {
                  color: '#000'
                  }
                }}
                date={this.props.dateofbirth}
                 format="DD-MM-YYYY"
                minDate="01-05-2000"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                onDateChange={date => {
                      this.props.onChangeDateofBirth(date);
                    }}
              />
                </Item>
                </View>
              </View>

              <View >
                <Text style={{marginTop: '3%', marginLeft: '1%'}}>Gender</Text>
                <Form>
                 <View style={{marginTop: '1%'}}>
                  <Item regular picker style={{borderColor: '#F79A70',borderRadius:5,width:Platform.OS === 'ios' ? 180 : 140}}>
                    <Picker
                      mode="dropdown"
                      enabled={this.props.editable}
                      iosHeader='Select Gender'
                      iosIcon={<Icon name="angle-down" />}
                      style={{ height: 40,marginRight:Platform.OS === 'ios' ? 40 : null,marginLeft:Platform.OS === 'ios' ? 40 : null}}
                      selectedValue={this.props.studentgender}
                      onValueChange={this.props.onValueChangestudentgender.bind(this)}>
                      <Picker.Item label="SELECT GENDER" value="" />
                      <Picker.Item label="MALE" value="0" />
                      <Picker.Item label="FEMALE" value="1" />
                    </Picker>
                  </Item>
                   </View>
                </Form>
              </View>
            </View>

            <View style={{marginLeft: '3%', marginTop: '4%'}}>
              <Text>Nationality</Text>
              <Form style={{marginTop: '1%'}}>
                <Item regular picker style={styles.itemstyle}>
                  <Picker
                  enabled={this.props.editable}
                    mode="dropdown"
                    iosHeader='Select Nationality'
                    iosIcon={<Icon name="angle-down" />}
                    
                   selectedValue={this.props.selectednation}
                      onValueChange={this.props.onValueChangeNatinality.bind(this)}>
                       {this.props.natinality.map((item, index) => {
                    return (
                    <Picker.Item label={item.Text} value={item.Value} key={index}/>
                ) })}
            </Picker>
                </Item>
              </Form>
            </View>

            <View style={{marginLeft: '3%', marginTop: '4%'}}>
              <Text>Level in School</Text>
              <Form style={{marginTop: '1%'}}>
                <Item regular picker style={styles.itemstyle}>
                  <Picker
                  enabled={this.props.editable}
                    mode="dropdown"
                    iosHeader='Select Level in School'
                    iosIcon={<Icon name="angle-down" />}
                    selectedValue={this.props.selectedschoolLevel}
                    onValueChange={this.props.onValueChangeSchoolLevel.bind(this)}>
                    {this.props.levels.map((item, index) => {
                    return (
                    <Picker.Item label={item.Text} value={item.Value} key={index}/>
                ) })}
                  </Picker>
                </Item>
              </Form>
            </View>

            <View style={{marginLeft: '3%', marginTop: '4%'}}>
              <Text>School Name</Text>
              <Form style={{marginTop: '1%'}}>
                <Item regular picker style={styles.itemstyle}>
                  <Picker
                  enabled={this.props.editable}
                    mode="dropdown"
                    iosHeader='Select School'
                    iosIcon={<Icon name="angle-down" />}
                    selectedValue={this.props.studentSchoolName}
                    onValueChange={this.props.onChangestudentSchoolName.bind(this)}>
                    {this.props.schools.map((item, index) => {
                    return (
                    <Picker.Item label={item.Text} value={item.Value} key={index}/>
                ) })}
                  </Picker>
                </Item>
              </Form>
            </View>

            <View style={{marginLeft: '3%', marginTop: '4%'}}>
              <Text>Chinese Curriculum</Text>
              <Form style={{marginTop: '1%'}}>
                <Item regular picker style={styles.itemstyle}>
                  <Picker
                  enabled={this.props.editable}
                    mode="dropdown"
                    iosHeader='Select School'
                    iosIcon={<Icon name="angle-down" />}
                    selectedValue={this.props.selectedChineseCurriculums}
                    onValueChange={this.props.onChangechineseCurriculums.bind(this)}>
                    {this.props.chineseCurriculums.map((item, index) => {
                    return (
                    <Picker.Item label={item.Name} value={item.Id} key={index}/>
                ) })}
                  </Picker>
                </Item>
              </Form>
            </View>

           { // <View
            //   style={{flexDirection: 'row', marginLeft: '3%', marginTop: '6%'}}>
            //   <Text style={{fontSize: 17,left:3}}>
            //      Is Chinese Curriculum in School
            //   </Text>
            //   <View style={{marginLeft: '8%'}}>
            //     <CheckBox
            //     disabled={!this.props.editable}
            //       onClick={
            //         this.props.onChanegChineseCurriculumInSchool
            //       }
            //       isChecked={this.props.chineseCurriculumInSchool}
            //     />
            //   </View>
            // </View>
            }
            <CardItem />
          </Card>

          <Card style={{width: '95%', alignSelf: 'center',paddingLeft:10,paddingTop:10}}>
            <View style={{marginLeft: '3%', marginTop: '3%'}}>
              <Text>Select Centre</Text>
              <Form style={{marginTop: '1%'}}>
                <Item regular picker style={styles.itemstyle}>
                  <Picker
                  enabled={this.props.editable}
                    mode="dropdown"
                    iosIcon={<Icon name="angle-down" />}
                    selectedValue={this.props.selectedcentre}
                    onValueChange={this.props.onValueChangeCentre.bind(this)}>
                    {this.props.learningCenter.map((item, index) => {
                    return (
                    <Picker.Item label={item.Text} value={item.Value} key={index}/>
                ) })}
                  </Picker>
                </Item>
              </Form>
            </View>

            <View style={{marginLeft: '3%', marginTop: '3%'}}>
             <Text>Select Class</Text>
              <Form style={{marginTop: '1%'}}>
                <Item regular picker style={styles.itemstyle}>
                  <Picker
                  enabled={this.props.editable}
                    mode="dropdown"
                    iosIcon={<Icon name="angle-down" />} 
                    selectedValue={this.props.selectedClass}
                    onValueChange={this.props.onChangeClass.bind(this)}>
                     {this.props.classes.length > 0 ? this.props.classes.map((item, index) => {
                    return (
                    <Picker.Item label={item.CourseName} value={item} key={index}/>
                ) }) : <Picker.Item label="No classes for selected Center" value="" key={-1}/> }
                  </Picker>
                </Item>
              </Form>
            </View>
            

            <View style={{marginLeft: '3%', marginTop: '5%'}}>
              <Text>Course Details</Text>
            </View>

          {this.props.selectedClass ? 
            <Card style={{marginLeft: '3%', width: '89%',borderRadius:5,padding:5}}>
              <View style={{marginLeft: '3%'}}>
                <Text style={{fontWeight: 'bold'}}>Programme Name:</Text>
                <Text>{this.props.selectedClass.CourseName}</Text>
                <Text style={{fontWeight: 'bold'}}>Timing:</Text>
                <Text>{this.props.selectedClass.FromTime} to {this.props.selectedClass.ToTime}</Text>
                <Text style={{fontWeight: 'bold'}}>Period: </Text>
                <Text>{this.props.selectedClass.StartofCommencement} - {this.props.selectedClass.EndofCommencement}</Text>
                <Text style={{fontWeight: 'bold'}}>Center:</Text>
                <Text>{this.props.selectedClass.LearningCenter}</Text>
              </View>
            </Card> : null }

            <View
              style={{flexDirection: 'row', marginLeft: '3%', marginTop: '3%'}}>
              <View style={{left:2}}>
                <CheckBox
                disabled={!this.props.editable}
                  onClick={this.props.onChangeTermsAndCondition}
                  isChecked={this.props.tearmsAndCondition}
                />
              </View>
              <Text style={{fontSize: 17}}>  I agree the Terms & Conditions</Text>
            </View>
            <CardItem />
          </Card>

          <View
            style={{
              marginTop: '2%',
              flexDirection: 'row',
              alignSelf: 'center',
            }}>

        { this.props.editable ?
            <Button
              onPress={this.props.registerNewStudent}
              style={{
                backgroundColor: 'green',
                width: '90%',
                borderRadius: 3,
                borderColor: 'transparent',
              }}
              isDisabled={!this.props.tearmsAndCondition}
              textStyle={{fontSize: 18, color: 'white'}}>
              {this.props.RegistrationId ? 'Update' : 'Register'}
            </Button> : null }
          </View>
        </Content>
        }
        <Modal isVisible={this.props.isModalVisible}>
          <Card style={{backgroundColor: '#3CB371'}}>
            <CardItem
              header
              bordered
              style={{backgroundColor: '#3CB371', alignSelf: 'center'}}>
              <Text style={{color: 'white'}}>Success</Text>
            </CardItem>
            <CardItem>
              <Body style={{alignItems: 'center'}}>
                <Text style={{fontWeight: 'bold'}}>
                  Course Registered Successfully
                </Text>

              </Body>
            </CardItem>

            <CardItem footer style={{alignItems:'center',justifyContent:'center'}}>
              <Button onPress={this.props.toggleModal}
                style={{
                  backgroundColor: '#3CB371',
                  width: '40%',
                  height: 40,
                  borderRadius: 10,
                  borderColor: 'transparent',
                }}
                textStyle={{fontSize: 18, color: 'white'}}>
                Okay
              </Button>
            </CardItem>
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
  itemstyle: {
    width: '90%',
    height: 45,
    borderColor: '#F79A70',
    borderRadius:5,
  },
  itemstyle1:{
     width: '90%',
    height: 45,
    borderColor: '#F79A70',
    backgroundColor: '#ededed',
    borderRadius:5,
  }

});
