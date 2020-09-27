import React, { Component } from 'react';
import { Platform, StyleSheet, View, Text, Image, TouchableOpacity, Alert, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from 'apsl-react-native-button';
import Modal from 'react-native-modal';
import {DotsLoader} from 'react-native-indicator';
Icon.loadFont();
class ParentLoginComponent extends Component {
    render() {
        return (
           <View style = { styles.container }>
                <View style={{ top:'20%'}}>
                <Image
          style={styles.image}
          source={require('../assets/images/logo.png')}
        />
        </View>
                
            <View style={{top:'35%'}}>
             
             <View style={styles.SectionStyle}>
                    <Icon style={styles.InputIcon} name="mobile" size={21} color="#F79A70"/>
                <TextInput style={styles.textinput}  
                    placeholder="Enter Your Username"
                    placeholderTextColor = "#a7a7a7"
                    value={this.props.username}
                    onChangeText={text => {
                      this.props.onValueChangeUsername(text);
                    }}
                    />
             </View>

            <View style={styles.SectionStyle}>
                    <Icon style={styles.InputIcon} name="unlock-alt" size={20} color="#F79A70"/>
                <TextInput style={styles.textinput}  
                    placeholder="Enter Password"
                    placeholderTextColor = "#a7a7a7"
                    value={this.props.password}
                    onChangeText={text => {
                      this.props.onValueChangePassword(text);
                    }}
                    secureTextEntry={this.props.passwordVisible}
                    />
                     {this.props.passwordVisible ? 
                     <TouchableOpacity onPress={this.props.togglePasswordVisiblity}>
                     <Icon style={styles.InputIcon} name="eye" size={20} color="#F79A70"/> 
                     </TouchableOpacity> : 
                     <TouchableOpacity onPress={this.props.togglePasswordVisiblity}>
                     <Icon style={styles.InputIcon} name="eye-slash" size={20} color="#F79A70"/> 
                     </TouchableOpacity>
                     }
            </View>
           </View>
            <View style={styles.fixToText}>
                <Button isDisabled={ this.props.username=="" || this.props.password=="" } 
                    style={styles.button} textStyle={{ color: "#FFFFFF", fontSize: 20 ,fontWeight:'700'}} onPress={this.props.login}>
                           Login
                        </Button>

                        <TouchableOpacity onPress={this.props.navigateToForgotPassword}>
                             <Text style={{color:'#F79A70',fontSize: 14,textAlign: 'center'}}>Forgot Password ?</Text>
                      </TouchableOpacity> 
            </View>
            <Modal isVisible={this.props.loading} backdropOpacity={0.1} animationIn={"fadeIn"} animationOut={'fadeOut'} >
            <View style={{
             flex: 1 ,justifyContent:"flex-end",marginBottom:"45%",alignItems:'center'
            }} >
              <DotsLoader color="#F79A70"
              size={20}
              betweenSpace={7}/>
            </View>
            
          </Modal>
        </View>
        );
    }
}
export default ParentLoginComponent;

const styles = StyleSheet.create(
{
    container: {
         flex:1,
         alignItems: 'center', 
     },
     textinput: {
        flex:1,
        color: '#000',
        fontSize: 15,
     },
     fixToText:{
         top:'47%'
     },
     image:{ 
    width: 300,
    height: 120 ,
   },
     button: {
         padding: 15,
         backgroundColor: '#F79A70',
         borderColor: "transparent",
         width:'80%',
        justifyContent: 'center',
        alignItems: 'center',
        color:'#fff',
         borderRadius: 20 ,
         height:Platform.OS === 'ios' ? 55 : 45
    },
    btntext: {
        color:'#fff',
    },
    SectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1.5,
        borderColor: '#F79A70',
        height: Platform.OS === 'ios' ? 55 : 45,
        borderRadius: 20 ,
        margin: 10,
        width:'80%'
    },
    InputIcon:{
        padding: 10,
        margin: 5,
        alignItems: 'center'
    },
     
})