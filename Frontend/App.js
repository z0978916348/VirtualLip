// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow strict-local
//  */
// /*
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

import { withAuthenticator } from 'aws-amplify-react-native'


// */
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/HomeScreen/HomeScreen';
import PickALipstick from'./src/PickALipstick';
import {SideBar} from './src/SideBar/SideBar.js';
import logopage from'./src/logopage';
import PickAPhoto from './src/PickAPhoto';
import { createDrawerNavigator } from '@react-navigation/drawer';

//const Stack = createStackNavigator();
const HomeStack = createStackNavigator();
const PickAPhotoStack = createStackNavigator();
const PickALipstickStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeStackScreen = ({navigation})=>(
  <HomeStack.Navigator screenOptions={{
    headerShown: false
    }}>
    <HomeStack.Screen name="logopage" component={logopage} />
    <HomeStack.Screen name="Home" component={HomeScreen} />
    <HomeStack.Screen name="PickALipstick" component={PickALipstick} />
    <HomeStack.Screen name="SideBar" component={SideBar} />
  </HomeStack.Navigator>
);
const PickAPhotoStackScreen = ({navigation})=>(
  <PickAPhotoStack.Navigator screenOptions={{
    headerShown: false
    }}>
    <PickAPhotoStack.Screen name="PickAPhoto" component={PickAPhoto} />
    <PickAPhotoStack.Screen name="Home" component={HomeScreen} />
    <PickAPhotoStack.Screen name="SideBar" component={PickAPhoto} />
  </PickAPhotoStack.Navigator>
);
// const PickALipstickStackScreen = ({navigation})=>(
//   <PickALipstickStack.Navigator screenOptions={{
//     headerShown: false
//     }}>
//     <PickALipstickStack.Screen 
//       name="PickALipstick" 
//       component={PickALipstick}
//       // initialParams={{    
//       //   photo: '../images/logo.png',
//       //   Base64: "",
//       //   color: "#F5B39A",
//       //   name: "目標口紅"
//       // }}
//     />
//   </PickALipstickStack.Navigator>
// );
function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props=><SideBar {...props}/>}>
        <Drawer.Screen name="Home" component={HomeStackScreen} />
        <Drawer.Screen name="PickAPhoto" component={PickAPhotoStackScreen} />
        {/* <Drawer.Screen name="PickALipstick" component={PickALipstickStackScreen}/> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
export default App;



