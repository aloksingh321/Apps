import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,TouchableOpacity,AsyncStorage
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import RegisterComponents from '../components/RegisterComponents'
Icon.loadFont();
class RegisterContainer extends Component {
    static navigationOptions = ({ navigation }) => {
    return {
            title: 'Programme Register',
            headerStyle: {
                backgroundColor:'#F79A70'
            },
            headerTitleStyle: {
                color:'white',
                right: 12,
                fontSize:16
            },headerTintColor:'#fff',
            headerRight:<TouchableOpacity
            onPress={()=>navigation.navigate('StudentRegisterContainer')}
                style={{
                  borderWidth: 2,
                  borderColor: '#F79A70',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 40,
                  height: 40,
                  backgroundColor: '#fff',
                  borderRadius: 50,
                  marginRight:10
                }}>
                <Icon name="plus" color="#F79A70" size={23} />
              </TouchableOpacity> 
    }
  }
   constructor(props) {
    super(props);
    this.state = {
     RegistrationList:[]
    };
  }

  navigateToStudentRegistration=(RegistrationId,RegistrationStatus)=>{
      this.props.navigation.navigate('StudentRegisterContainer',{RegistrationId,RegistrationStatus});
  }

  
  componentDidMount() {
      this.getRegistrationList();
  }

  getRegistrationList = async () => {
    this.setState({RegistrationList:[]});
    const token = await AsyncStorage.getItem('@sessionToken:key');
    const parentId = await AsyncStorage.getItem('@parentId:key');
   fetch("https://sappdemo.adaptivebizapp.com/api/Registration?ParentId="+parentId+"",  {
                method: "GET",
                headers: {
                'Authorization': 'Bearer ' + token
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({RegistrationList:responseJson});
            })
            .catch(error => {
                Toast.show({
                    text: error.message,
                    type: "danger",
                    position: "bottom",
                    duration: 3000,
                    textStyle: { textAlign:'center' },
                })
            });    
  }
    render() {
        return (
            <RegisterComponents
            RegistrationList={this.state.RegistrationList}
            navigateToStudentRegistration={(RegId,RegStatus)=>this.navigateToStudentRegistration(RegId,RegStatus)}
            getRegistrationList={this.getRegistrationList}
            />
        );
    }
}
export default RegisterContainer;