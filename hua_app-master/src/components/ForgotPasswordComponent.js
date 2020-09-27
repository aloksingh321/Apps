import React, { Component } from 'react';
import { Platform, StyleSheet, View, Text, Image, TouchableOpacity, Alert, TextInput,BackHandler} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from 'apsl-react-native-button';
Icon.loadFont();
class ForgotPasswordComponent extends Component {
    constructor(props) {
    super(props)
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
       this.props.navigateToLogin();
        return true;
    }
    render() {
        return (
              <View style = { styles.container }>
                <View style={{ top:'20%',alignItems:'center'}}>
                <Text style={{fontSize:33,fontWeight:'700',color:'#F79A70'}}>Forgot Password ?</Text>
                 <Image
                    style={styles.image}
                    source={require('../assets/images/forgotpassword.png')}
                 />
                </View>
                
            <View style={{top:'25%'}}>
             
             <View style={styles.SectionStyle}>
                    <Icon style={styles.InputIcon} name="envelope" size={21} color="#F79A70"/>
                <TextInput style={styles.textinput}  
                    placeholder="Enter Your Email Id"
                    placeholderTextColor = "#000"
                />
             </View>
           </View>
            <View style={styles.fixToText}>
                <Button onPress={this.props.navigateToLogin} isDisabled={this.props.phonenumber==""} 
                    style={styles.button} textStyle={{ color: "#FFFFFF", fontSize: 20 ,fontWeight:'700'}} onPress={this.props.navigateToHome}>
                           Send Reset Link
                        </Button>

            </View>
        </View>
        );
    }
}
export default ForgotPasswordComponent;


const styles = StyleSheet.create(
{
    container: {
         flex:1,
        // justifyContent: 'center', 
         alignItems: 'center', 
     },
     textinput: {
        flex:1,
        color: '#000',
        fontSize: 15,
     },
     fixToText:{
         top:'30%'
     },
     image:{ 
    width: 150,
    height: 150 ,
    marginTop:'10%'
   },
     button: {
         padding: 15,
         backgroundColor: '#F79A70',
         borderColor: "transparent",
         width:'82%',
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
        resizeMode : 'stretch',
        alignItems: 'center'
    },
     
})