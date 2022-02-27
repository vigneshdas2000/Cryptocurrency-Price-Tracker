import React,{useState,useEffect} from "react";
import {View,KeyboardAvoidingView,Text,TextInput,Image,TouchableOpacity,StyleSheet,ScrollView,SafeAreaView,onPress, Pressable} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';


const EditProfile=()=>{

    return(   
      <Stack.Navigator initialRouteName='Profilee'>
        <Stack.Screen options={{headerShown: false}} name='Profilee' component={ProfileeScreen} />
        <Stack.Screen options={{headerShown: false}} name='Edit' component={EditProfileScreen} />
      </Stack.Navigator>
    );
};

const ProfileeScreen=({route,navigation})=>{
const [name,setName]=useState(route.params?.paramkey01);
const [phone,setPhone]=useState(route.params?.paramkey02);
const [country,setCountry]=useState(route.params?.paramkey03);
const [city,setCity]=useState(route.params?.paramkey04);

  const save=async()=>{
    try{
    AsyncStorage.setItem('N',name);
    AsyncStorage.setItem('P',phone);
    AsyncStorage.setItem('C',country);
    AsyncStorage.setItem('CI',city);
    }catch(error){
      console.log(error);
    }
  };

  const getname=async()=>{
    try{
      const name01=await AsyncStorage.getItem('N');
      const phone01=await AsyncStorage.getItem('P');
      const country01=await AsyncStorage.getItem('C');
      const city01=await AsyncStorage.getItem('CI');
      setName(name01);
      setPhone(phone01);
      setCountry(country01);
      setCity(city01);
    }catch(error){
      console.log(error);
    }
  };

  useEffect(()=> {
    getname();
},[])



  return(
  <SafeAreaView style={{paddingTop:25,flex: 1, backgroundColor: '#fff'}}>
  <ScrollView
  style={styles.container}
  contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
  showsVerticalScrollIndicator={false}>
    
      <Text style={styles.head}>USER PROFILE</Text>
   <Image
    style={styles.userImg}
    source={require('../assets/n0.png')}
  />
  <Text style={styles.userName}>{name}</Text>
  {/* <Text style={styles.aboutUser}>vigneshdas2000@gmail.com</Text> */}
  <Text style={styles.aboutUser}>{phone}</Text>
  <Text style={styles.aboutUser}>{country}</Text>
  <Text style={styles.aboutUser}>{city}</Text>
  <View style={styles.userBtnWrapper}>
  <TouchableOpacity
          style={styles.userBtn}
          onPress={() => navigation.navigate('Edit')}
          >
          <Text style={styles.userBtnTxt}>Edit Profile</Text>
        </TouchableOpacity>
        
        </View>
  </ScrollView>
</SafeAreaView>
  );
};



const EditProfileScreen=({navigation})=>{
  const [name,setName]=useState('');
  const [phone,setPhone]=useState('');
  const [country,setCountry]=useState('');
  const [city,setCity]=useState('');

  const savename=async()=>{
    try{
    AsyncStorage.setItem('N',name);
    AsyncStorage.setItem('P',phone);
    AsyncStorage.setItem('C',country);
    AsyncStorage.setItem('CI',city);
    }catch(error){
      console.log(error);
    }
  };

  const getname=async()=>{
    try{
      const name01=await AsyncStorage.getItem('N');
      const phone01=await AsyncStorage.getItem('P');
      const country01=await AsyncStorage.getItem('C');
      const city01=await AsyncStorage.getItem('CI');
      setName(name01);
      setPhone(phone01);
      setCountry(country01);
      setCity(city01);
    }catch(error){
      console.log(error);
    }
  };

  useEffect(()=> {
    getname();
},[])

const deleteName=async()=>{
  AsyncStorage.removeItem('N');
  AsyncStorage.removeItem('P');
  AsyncStorage.removeItem('C');
  AsyncStorage.removeItem('CI');
  setName('N/A');
  setPhone('N/A');
  setCountry('N/A');
  setCity('N/A');
};

  return(
    <KeyboardAvoidingView style={{paddingTop:25,flex: 1, backgroundColor: '#fff'}}>
  <ScrollView
  style={styles.container}
  contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
  showsVerticalScrollIndicator={false}>
      <Text style={styles.head}>UPDATE PROFILE</Text>
   <Image
    style={styles.userImg}
    source={require('../assets/n1.png')}
  />
  <TextInput
          placeholder="Enter your Name"
          value={name}
          onChangeText={text=>setName(text)}
          style={styles.input}
          keyboardType="text"
        />
  <TextInput
          placeholder="Enter your Phone No."
          value={phone}
          onChangeText={text=>setPhone(text)}
          style={styles.input}
          keyboardType="text"
        />
  <TextInput
          placeholder="Enter your Country"
          value={country}
          onChangeText={text=>setCountry(text)}
          style={styles.input}
          keyboardType="text"
        />
  <TextInput
          placeholder="Enter your City"
          value={city}
          onChangeText={text=>setCity(text)}
          style={styles.input}
          keyboardType="text"
        />
        <View style={styles.userBtnWrapper}>
  <TouchableOpacity
          style={styles.userBtn}
          onPress={savename}>
          <Text style={styles.userBtnTxt}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.userBtn}
          onPress={deleteName}>
          <Text style={styles.userBtnTxt}>Delete</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.userBtnWrapper}>
  <TouchableOpacity
          style={styles.userBtn}
          onPress={() => {navigation.navigate({
            name:'Profilee',
            params:{paramkey01: name,paramkey02: phone,paramkey03: country,paramkey04: city,},
            merge:true,
          });
          }}>
          <Text style={styles.userBtnTxt}>Back</Text>
        </TouchableOpacity>
        </View>
  </ScrollView>
</KeyboardAvoidingView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  head:{
      fontSize:22,
      fontWeight:'bold',
      padding:10,
      fontFamily:'Times',
    },
    input: {
      height: 40,
      width: 250,
      margin: 5,
      borderWidth: 3,
      borderColor: '#4169e1',
      padding: 5,
      borderRadius: 15,
    },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
    borderColor: 'red',
  },
  userName: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 10,
      marginBottom: 10,
      paddingTop: 20,
      fontFamily: 'Helvetica',
    },
  aboutUser: {
      fontSize: 16,
      fontWeight: '600',
      color: '#666',
      textAlign: 'center',
      marginBottom: 10,
      fontFamily:'monospace',
  },
  userBtnWrapper: {
      flexDirection: 'row',
      justifyContent: 'center',
      width: '100%',
      marginBottom: 10,
      padding:10,
    },
    userBtn: {
      borderColor: '#4169e1',
      borderWidth: 3,
      borderRadius: 3,
      paddingVertical: 8,
      paddingHorizontal: 12,
      marginHorizontal: 5,
      
    },
    userBtnTxt: {
      color: '#4169e1',
    },
});
