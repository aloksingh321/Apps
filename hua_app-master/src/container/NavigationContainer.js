import React, { Component } from 'react';
import { View, Text,StatusBar,TouchableOpacity,Alert,BackHandler,AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createDrawerNavigator,DrawerActions} from 'react-navigation-drawer';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import { createAppContainer,withNavigation,NavigationActions   } from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import LogoutBlackScreen from './LogoutBlackScreen';
import HomeDashboardContainer from './HomeDashboardContainer';
import ParentProfileContainer from './ParentProfileContainer';
import NotificationContainer from './NotificationContainer';
import CoursesContainer from './CoursesContainer';
import ResultContainer from './ResultContainer';
import DashboardContainer from './DashboardContainer'
import StudentProfileContainer from './StudentProfileContainer';
import SchedulesContainer from './SchedulesContainer'
import ViewAllContainer from './ViewAllContainer'
import StudentRegisterContainer from './StudentRegisterContainer';
import RegisterContainer from './RegisterContainer'
import MakeupLessonsContainer from './MakeupLessonsContainer';
import AddMakeupLessonContainer from './AddMakeupLessonContainer'
import { fromLeft } from 'react-navigation-transitions';
Icon.loadFont();
const Tabs = createMaterialBottomTabNavigator(
{
      ParentProfileContainer: { screen: ParentProfileContainer,  
            navigationOptions:{  
                tabBarLabel:'PROFILE',  
                tabBarIcon: ({ tintColor }) => (  
                    <View>  
                        <Icon name='user' style={[{color: tintColor}]} size={22}/> 
                    </View>),
                activeColor: 'white',  
                inactiveColor: '#fbd6c5' 
            }  
        }, 
    HomeDashboardContainer : { screen: HomeDashboardContainer,  
                navigationOptions:{  
                    tabBarLabel:'DASHBOARD',  
                    tabBarIcon: ({ tintColor }) => (  
                   <View>
                        <Icon style={[{color: tintColor}]} size={24} name={'th'}/> 
                    </View>),
                    activeColor: '#fff',  
                    inactiveColor:'#fbd6c5' 
                }  
            }, 
     LogoutBlackScreen: { screen: LogoutBlackScreen,  
            navigationOptions: ({navigation}) => ({
            tabBarOnPress: (scene, jumpToIndex) => {
               return Alert.alert(   
                   'Confirmation required'
                   ,'Do you really want to logout?'
                   ,[
                     {text: 'Cancel'},
                      {text: 'Logout', onPress: () => { 
                         AsyncStorage.removeItem('@sessionToken:key');
                          AsyncStorage.removeItem('@parentId:key');
                          BackHandler.exitApp() }}
                    ]
               );
           },tabBarLabel:'LOGOUT',  
                    tabBarIcon: ({ tintColor }) => (  
                   <View>
                        <Icon style={[{color: tintColor}]} size={24} name={'sign-out'}/> 
                    </View>),
                    activeColor: '#fff',  
                    inactiveColor:'#fbd6c5' 
       })
        },
},
        {  
      initialRouteName: "HomeDashboardContainer",   
      barStyle: { backgroundColor: '#F79A70' },  
    }
);

const DrawerNavigator = createDrawerNavigator({
    Tabs:{
        screen: Tabs
    }
},{
    initialRouteName: 'Tabs',
    contentComponent: DashboardContainer,
    drawerWidth: '80%',
});

const NavStack = createStackNavigator(
{
     DrawerNavigator : { screen: DrawerNavigator,
     navigationOptions:{
           headerShown:false
        }
     },
     SchedulesContainer: { screen: SchedulesContainer,
     navigationOptions:{
           headerShown:true
        }
     },
    NotificationContainer: { screen: NotificationContainer,
        navigationOptions:{
            title: 'Notification',
            headerStyle: {
                backgroundColor:'#F79A70'
            },
            headerTitleStyle: {
                color:'white',
                right: 12,
                fontSize:16
            },headerTintColor:'#fff'
        }
        },
    CoursesContainer: { screen: CoursesContainer,
        navigationOptions:{
            title: 'CoursesContainer',
            headerStyle: {
                backgroundColor:'#F79A70'
            },
            headerTitleStyle: {
                color:'white',
                right: 12,
                fontSize:16
            },headerTintColor:'#fff'
        }
        },
        ResultContainer: { screen: ResultContainer,
        navigationOptions:{
            title: 'Results',
            headerStyle: {
                backgroundColor:'#F79A70'
            },
            headerTitleStyle: {
                color:'white',
                right: 12,
                fontSize:16
            },headerTintColor:'#fff'
        }
        },
        StudentProfileContainer: { screen: StudentProfileContainer,
        navigationOptions:{
            title: 'Student Profile',
            headerStyle: {
                backgroundColor:'#F79A70'
            },
            headerTitleStyle: {
                color:'white',
                right: 12,
                fontSize:16
            },headerTintColor:'#fff'
        }
        },
        ViewAllContainer: { screen: ViewAllContainer,
        navigationOptions:{
            title: 'Announcements',
            headerStyle: {
                backgroundColor:'#F79A70'
            },
            headerTitleStyle: {
                color:'white',
                right: 12,
                fontSize:16
            },headerTintColor:'#fff'
        }
        },
        StudentRegisterContainer: { screen: StudentRegisterContainer,
        navigationOptions:{
            title: 'Programme Register',
            headerStyle: {
                backgroundColor:'#F79A70'
            },
            headerTitleStyle: {
                color:'white',
                right: 12,
                fontSize:16
            },headerTintColor:'#fff'
        }
        },
        RegisterContainer: { screen: RegisterContainer,
         navigationOptions:{
           headerShown:true
        }
        },
        MakeupLessonsContainer: { screen: MakeupLessonsContainer,
        navigationOptions:{
           headerShown:true
        }
        },
        AddMakeupLessonContainer: { screen: AddMakeupLessonContainer,
         navigationOptions:{
            title: 'Add Makeup Lesson',
            headerStyle: {
                backgroundColor:'#F79A70'
            },
            headerTitleStyle: {
                color:'white',
                right: 12,
                fontSize:16
            },headerTintColor:'#fff'
        }
        },
},
  {
    initialRouteName: 'DrawerNavigator',
    transitionConfig: () => fromLeft(400),
  }
);

const NavigationComp = createAppContainer(NavStack);

export default class NavigationContainer extends Component {
  render() {
    return (
            <NavigationComp/>
    );
  }
}
