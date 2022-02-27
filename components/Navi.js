import  React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Coins from './Coins';
import EditProfile from './EditProfile';
const Tab=createBottomTabNavigator();

const Navi=()=>{
  return(
  <Tab.Navigator screenOptions={{
    headerShown: false,
    tabBarStyle:{backgroundColor:"#4169e1"},
    tabBarInactiveTintColor:"#fff",
    tabBarActiveTintColor:"#fad105"
  }}>
    <Tab.Screen name="Market" component={Coins} options={{
      tabBarIcon:({color,size})=>(
        <Ionicons name="logo-bitcoin" color={color} size={size}/>
      )
    }}/>
    <Tab.Screen name="Profile" component={EditProfile} options={{
      tabBarIcon:({color,size})=>(
        <Feather name="user" color={color} size={size}/>
      )
    }}/>
  </Tab.Navigator>
  );
};



export default Navi;