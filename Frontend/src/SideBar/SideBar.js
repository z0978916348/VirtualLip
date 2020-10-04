import React from "react";
// import {View, Text, StyleSheet} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem
} from '@react-navigation/drawer';
// import React from "react";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppRegistry, Image, StatusBar,StyleSheet } from "react-native";
import {
  Button,
  Text,
  Container,
  List,
  ListItem,
  Content,
  View
} from "native-base";
const routes = ["Home", "PickAPhoto"];

import { Auth } from 'aws-amplify';

async function signOut() {
    alert('期待再相見');
    try {
        await Auth.signOut({ global: true });
    } catch (error) {
        console.log('error signing out: ', error);
    }
}
export function SideBar(props) {
  return (
          <Container>
            <Content>
              <Image
                source={{
                  uri:
                    "https://raw.githubusercontent.com/GeekyAnts/NativeBase-KitchenSink/master/assets/drawer-cover.png"
                }}
                style={{
                  height: 120,
                  width: "100%",
                  alignSelf: "stretch",
                  position: "absolute"
                }}
              />
              <Image
                square
                style={{
                  height: 80,
                  width: 70,
                  position: "absolute",
                  alignSelf: "center",
                  top: 20,
                  borderRadius: 200 / 2
                }}
                source={
                  require('../images/user1.jpg')
                }
              />
              <List
                dataArray={routes}
                contentContainerStyle={{ marginTop: 120 }}
                renderRow={data => {
                  return (
                    <ListItem
                      button
                      onPress={() => props.navigation.navigate(data)}
                    >
                      <Text>{(data=="PickAPhoto")?"Pick A Photo":(data=="PickALipstick")?"Pick A Lipstick":data}</Text>
                    </ListItem>
                  );
                }}
              />
              
              <DrawerItem
                    icon={({color, size}) => (
                        <Icon 
                        name="exit-to-app" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => {signOut()
                      props.navigation.closeDrawer();}}
                />
            </Content>
            
          </Container>
        );
}