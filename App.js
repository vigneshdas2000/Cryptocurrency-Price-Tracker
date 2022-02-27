import React,{useEffect, useState,useRef} from 'react';
import { KeyboardAvoidingView, FlatList,Image,View,SafeAreaView, Text, StyleSheet, TextInput, Button,Pressable,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp} from "firebase/app";
import { signInWithPopup,getAuth, createUserWithEmailAndPassword ,signInWithEmailAndPassword,onAuthStateChanged,GoogleAuthProvider} from "firebase/auth";
import Navi from "./components/Navi";
import Ionicons from 'react-native-vector-icons/Ionicons';

const firebaseConfig = {
  apiKey: "AIzaSyAcYCXzGM5vFHWs_21xnomopIYkARmgn_0",
  authDomain: "myapp-a40bf.firebaseapp.com",
  projectId: "myapp-a40bf",
  storageBucket: "myapp-a40bf.appspot.com",
  messagingSenderId: "740956398922",
  appId: "1:740956398922:web:8c7ffaedc0ad92ab444db3"
};
initializeApp(firebaseConfig);

const auth = getAuth();
const Stack = createNativeStackNavigator();
const provider = new GoogleAuthProvider();

const App=()=>{
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
        <Stack.Screen options={{headerShown: false}} name="Signup" component={SignupScreen} />
        <Stack.Screen options={{headerShown: false}} name="Dashboard" component={DashboardScreen} />        
      </Stack.Navigator>
    </NavigationContainer>
  );
} 


const LoginScreen=()=>{

  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const navigation = useNavigation();

  useEffect(()=>{
    const logout=onAuthStateChanged(auth, (user)=>{
      if (user){
        navigation.navigate("Dashboard")
      }
    })
  })
  const handleLogin = ()=>{
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredentials =>{
        const user = userCredentials.user;
      })
      .catch(error => alert(error.message))
  }
  const SignInWithFirebase=()=>{
    signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
  });
  }
  return(
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      
      <Image
        style={styles.tinyLogo01}
        source={require('./assets/logo.png')}/>
        <Text style={styles.cchead}>Let's Build Crypto Folio</Text>
        
      <Text style={styles.head}>Login </Text>
        <TextInput
          placeholder="Enter your Email"
          value={email}
          onChangeText={text=>setEmail(text)}
          style={styles.input}
          keyboardType="text"
        />

      <TextInput
          placeholder="Enter your Password"
          value={password}
          onChangeText={text=>setPassword(text)}
          style={styles.input}
          keyboardType="text"
          secureTextEntry
        />
      <TouchableOpacity
        style={[styles.button, styles.buttonOpen]}
        onPress={handleLogin}
        
      >
        <Text >Log In</Text>
      </TouchableOpacity>
      <Text style={{paddingBottom:10}}>Or</Text>
      <TouchableOpacity
        onPress={SignInWithFirebase}
        
      >
        <Image
        style={styles.tinyLogo}
        source={require('./assets/google.png')}/>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button]}
        onPress={() => navigation.navigate('Signup')}
      >
        <Text style={[styles.cc]}>new user?SignUp Instead</Text>
      </TouchableOpacity>
      
    </KeyboardAvoidingView>
  )
}


const SignupScreen=()=>{

  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const navigation = useNavigation();
  useEffect(()=>{
    const logout=onAuthStateChanged(auth, (user)=>{
      if (user){
        navigation.navigate("Dashboard")
      }
    })
  })
  const handleSignup = ()=>{
    createUserWithEmailAndPassword(auth,email,password)
      .then(userCredentials =>{
        const user = userCredentials.user;
      })
      .catch(error => alert(error.message))
  }

  const SignInWithFirebase=()=>{
    signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.email;
  });
  }
  
  return(
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      
       <Image
        style={styles.tinyLogo01}
        source={require('./assets/logo.png')}/>
        <Text style={styles.cchead}>Let's Build Crypto Folio</Text>
        
      <Text style={styles.head}>Signup</Text>
        <TextInput
          placeholder="Enter your Email"
          value={email}
          onChangeText={text=>setEmail(text)}
          style={styles.input}
          keyboardType="text"
        />
      <TextInput
          placeholder="Enter your Password"
          value={password}
          onChangeText={text=>setPassword(text)}
          style={styles.input}
          keyboardType="text"
          secureTextEntry
        />
      <TouchableOpacity
        style={[styles.button, styles.buttonOpen]}
        onPress={handleSignup}
      >
          <Text style={{textAlign:'center'}}>Sign Up</Text>
      </TouchableOpacity>
      <Text style={{paddingBottom:10}}>Or</Text>
      <TouchableOpacity
        
        onPress={SignInWithFirebase}
      >
          <Image
        style={styles.tinyLogo}
        source={require('./assets/google.png')}/>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button]}
        onPress={() => navigation.navigate('Login')}
      >
          <Text style={[styles.cc]}>Login Instead</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}



const DashboardScreen=()=>{
    const navigation = useNavigation();
    const handleLogout=()=>{
      auth.signOut()
          .then(()=>{
            navigation.replace("Login")
          })
          .catch(error=>alert(error.message))
    }
    return (
        
      <><View style={{backgroundColor:"#4169e1",flexDirection:'row'}}>
            
            <Image
        style={styles.tinyLogo02}
        source={require('./assets/logo.png')}/>
        {/* <Text style={[styles.ccdash]}>{auth.currentUser?.email}</Text> */}
            <TouchableOpacity
                style={{marginLeft:'auto'}} 
                onPress={handleLogout}
            >
                <Ionicons name="log-out-sharp" size={40} color="red"/>
            </TouchableOpacity>
            </View>
        
        <Navi/></>
    );
  } 






const styles=StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#fff"
  },
  head:{
    fontSize:40,
    fontWeight:'bold',
    padding:10,
    fontFamily:'serif'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: 'white',
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
  buttonout: {
    width:50,
    height:50,
    backgroundColor: "#fff",
    justifyContent: 'center',
  },
  buttono:{
    alignItems: 'center',
    padding: 3,
    elevation: 2,
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    justifyContent: 'center',
  },
  cc:{
    color:"#4169e1",
    fontSize:18,
    fontWeight:20,
  },
  ccdash:{
    color:"#fff",
    fontSize:15,
    fontWeight:'bold',
    alignItems: 'center',
    fontFamily: 'Helvetica',
    paddingTop:18,
    paddingLeft:45,
  },
  cchead:{
    color:"#4169e1",
    fontSize:20,
    fontWeight:35,
  },
  buttonOpen: {
    borderWidth:3,
    width:100,
    backgroundColor: "#4169e1",
    margin: 10,
    justifyContent: 'center',
  },
  titleWrapper:{
    marginTop: 20,
    padding:16,
  },
  largeTitle:{
    fontSize: 24,
    fontWeight: 'bold',
  },
  divider:{
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#808080',
    marginHorizontal: 16,
    marginTop:16,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  tinyLogo01:{
    width: 90,
    height: 70,
    
  },
  tinyLogo02:{
    width:65,
    height:40,
  },
});
export default App;