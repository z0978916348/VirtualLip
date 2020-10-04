import React from 'react';
import {
  Button,
  Text,
  Container,
  Body,
  Content,
  Header,
  Title,
  Left,
  Icon as IconNative,
  Right,
  ListItem,
} from 'native-base';
import {View, FlatList, Image, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import HeaderLG from 'VirtualLip/src/components/header.js';

import Amplify, {Auth} from 'aws-amplify';
import awsconfig from 'VirtualLip/aws-exports';
Amplify.configure(awsconfig);

import {withAuthenticator} from 'aws-amplify-react-native';
class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      data: [],
      refreshing: false
    };
  }
  handleRefresh = () => {
    this.setState({refreshing: true});
    fetch('https://virtuallip.serveousercontent.com/history', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
      }),
    }).then((res) => {
      return res.json()
    }).then((jsonIn) => {
      this.setState({data:JSON.parse(jsonIn)});
      this.setState({refreshing: false});
      return json
    }).catch(err => {
      console.log(err)
    });
  };
  renderItem = ({item}) => {
    return (
      <ListItem noBorder>
        <Body>
          <Button
            full
            rounded
            light
            style={{
              height: 60,
              marginTop: -10,
              backgroundColor: '#FFFFFF',
              borderColor: item.color,
              borderWidth: 3,
              elevation: 8,
            }} //, borderTopWidth:0, borderWidth: 3, borderRadius: 3}}
            onPress={() =>{
              Tar = this.state.name;
              this.props.navigation.navigate('PickALipstick', {
              tarLipstick: item.lipstick_name,
              tarColor: item.color,
              photo:"./images/unweb.png"
            })}}>
            <Left  style={{flex: 0.5, marginLeft: 15}}>
              <Icon name="circle" size={20} style={{color: item.color}} />
            </Left>
            <Body style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text>{item.lipstick_name}</Text>
            </Body>
           
            <Right  style={{flex: 0.5}}></Right>
          </Button>
        </Body>
      </ListItem>
    );
  };

  render() {
    let lines = require('VirtualLip/src/images/lines.png');
    return (
      <Container>
        <HeaderLG navigation={this.props.navigation} />
        <Container style={{paddingLeft: 55, paddingRight: 55, flex: 1.5}}>
          <Text
            style={{
              fontSize: 24,
              textAlign: 'left',
              marginTop: 8,
              marginBottom: 8,
            }}>
            歡迎, {this.state.username}
          </Text>
          <Text style={{fontSize: 16, color: 'gray'}}>邂逅屬於你的唇色</Text>
          <Container
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 30,
            }}>
            <TouchableHighlight
              style={{height: 140}}
              underlayColor="transparent"
              onPress={() => this.props.navigation.navigate('PickAPhoto')}>
              <Image
                source={require('VirtualLip/src/images/camera.png')}
                style={{height: 140, width: 125, marginLeft: 3, marginRight: 7}}
              />
            </TouchableHighlight>
            <TouchableHighlight
              style={{height: 140}}
              underlayColor="transparent"
              >
              <Image
                source={require('VirtualLip/src/images/lipstick_button.png')}
                style={{height: 140, width: 125, marginLeft: 7, marginRight: 3}}
              />
            </TouchableHighlight>
          </Container>
        </Container>
        <Container style={{paddingLeft: 15, paddingRight: 15, flex: 2}}>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            <Text style={{paddingLeft: 40, fontSize: 24, textAlign: 'left'}}>
              {this.state.username}的美麗唇膏紀錄
            </Text>
            <Button transparent light onPress={this.handleRefresh}>
              <IconNative name="ios-refresh" />
            </Button>
          </View>
          <Content style={{paddingLeft: 15, paddingRight: 15, flex: 2}}>
            <FlatList
              data={this.state.data}
              renderItem={this.renderItem}
              keyExtractor={item => item.lipstick_name}
              refreshing={this.state.refreshing}
              onRefresh={this.handleRefresh}
              extraData={this.state.data}
            />
          </Content>
        </Container>
      </Container>
    );
  }
  componentDidMount() {
    Auth.currentAuthenticatedUser({
      bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    }).then(user => {
      console.log(user.username)
      this.setState({ username: user.username }
      )
    }).then(() => {
      this.handleRefresh();
    }).catch(err => {
      console.log(err)
    });

  }
}
export default withAuthenticator(HomeScreen);