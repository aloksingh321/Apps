import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,AsyncStorage
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import MakeupLessonsComponent from '../components/MakeupLessonsComponent';
import { Toast } from 'native-base';
Icon.loadFont();
class MakeupLessonsContainer extends Component {
    static navigationOptions = ({ navigation }) => {
    return {
            title: 'Makeup Lessons',
            headerStyle: {
                backgroundColor:'#F79A70'
            },
            headerTitleStyle: {
                color:'white',
                right: 12,
                fontSize:16
            },headerTintColor:'#fff',
            headerRight:<TouchableOpacity
            onPress={()=>navigation.navigate('AddMakeupLessonContainer')}
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
      makeupLessons:[]
    };
  }

  componentDidMount() {
      this.getMakeuplessonList();
  }

 getMakeuplessonList=async()=> {
    this.setState({makeupLessons:[]});
    const token = await AsyncStorage.getItem('@sessionToken:key');
    const parentId = await AsyncStorage.getItem('@parentId:key');
    fetch("https://sappdemo.adaptivebizapp.com/api/MakeupLesson?ParentId="+parentId+"",  {
            method: "GET",
            headers: {
            'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({makeupLessons:responseJson});
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
            <MakeupLessonsComponent
            makeupLessons={this.state.makeupLessons}
            getMakeuplessonList={this.getMakeuplessonList}
            />
        );
    }
}
export default MakeupLessonsContainer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});