import React from "react";
import {
  Container,
  Body,
  Text,
  Title
} from "native-base";
import LinearGradient from 'react-native-linear-gradient/index.android.js';
import {Image, Animated} from 'react-native';


export default class logopage extends React.Component {
  constructor(){
    super();
    this.state={
      opacity: new Animated.Value(0)
    }
  }
  render() {
    return (
      <Container style={{flex: 1}}>
        <Animated.View style={{flex:1,backgroundColor:'#FFFFFF',opacity:this.state.opacity}}>
        <LinearGradient 
       		colors={['#FAC699', '#F9C199', '#F8BE99', '#F7BA99', '#F6B799', '#F5B499', '#F4B19A',
     				  	 	 '#F3AB9B', '#F2A89B', '#F2A69B', '#F2A49B', '#F1A19C']} 
       		style={{flex: 1}} 
   				start={{x:0,y:0}} end={{x:1,y:1}}>
          
     				<Body style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
     					<Image source={require('./images/Lipstick.png')} />
            <Title style={{fontSize:14}}>Your Digital Makeup Assistant</Title>
     				</Body>  				
     			</LinearGradient>
        </Animated.View>
     	</Container>  
    );
  }
  
  componentDidMount(){
    Animated.timing(this.state.opacity,{
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    setTimeout(()=>{
      this.props.navigation.navigate("Home");
    }, 2000)
  }
}