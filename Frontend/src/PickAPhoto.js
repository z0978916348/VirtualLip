import React from 'react';
import {Image, TouchableHighlight, View} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import ImgToBase64 from 'react-native-image-base64';
import {
  Container, Text, Button, Left, Right, Header, Body,Title,  Icon as IconNative,
} from "native-base";
import MyLoading from './components/myLoading.js';
import HeaderLG from 'VirtualLip/src/components/header.js';
import { Auth } from 'aws-amplify';
export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      isLoading: false,
      photo: null,
      Base64: "",
      color: "#F5B39A",
      name: "點擊相簿上傳圖片"
    }
  }
  state = {
    photo: null,
    Base64: "",
    color: "#F5B39A",
    name: "分析唇色"
  };

  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({ color: "#F5B39A"});
        this.setState({ photo: response , name: "分析唇色"});
        console.log("Got a photo.");
        ImgToBase64.getBase64String(this.state.photo.uri)
        .then(base64String => {
          this.setState({ Base64: base64String });
        }).catch(err=>{console.log(err)})
      }
    });
  }

  handleUploadPhoto = () => {
    if(this.state.name=="點擊相簿上傳圖片"||this.state.color!="#F5B39A")return;
    console.log("Processing, please wait...")
    this.setState({
      isLoading: true,
      name: "努力為您識別中..."
    })
    // fetch('https://virtual-lip.herokuapp.com/', {
    fetch('https://virtuallip.serveousercontent.com',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        imgsource: this.state.Base64,
        name: ""
      }),
    }).then((res) => {
      this.setState({
        isLoading: false
      })
      return res.json()
    }).then((json) => {
      console.log(json.lipstickColor)
      this.setState({ name: json.lipstickColor.brand+json.lipstickColor.name+json.lipstickColor.series});
      this.setState({ color: json.lipstickColor.color});
      return json
    }).catch(err => {
      
      console.log(err)
      this.handleUploadPhoto;
    });
  }
  // takePicture = async () => {
  //   if (this.camera) {
  //     const options = { quality: 0.5, base64: true };
  //     const data = await this.camera.takePictureAsync(options);
  //     console.log(data.uri);
  //   }
  // };
  render() {
    const { photo } = this.state;
    return (
    <Container>
      <HeaderLG navigation={this.props.navigation}/>
      <MyLoading show={this.state.isLoading}/>
      <View style={{ flex: 2, alignItems: 'center'}}>
        {photo && (
          <Image
            source={{ uri: photo.uri }}
            style={{ width: 300, height: 300 , justifyContent: 'center'}}
          />
        )}
      </View>
      <Container style={{ flex: 1, marginLeft: 40, marginRight: 40}}>
        <Button
            full
            rounded
            light
            style={{backgroundColor: this.state.color, marginBottom: 20}}
            onPress={this.handleUploadPhoto}
          >
          <Text style={{color: 'white'}}>{this.state.name}</Text>
        </Button>
        <TouchableHighlight
          underlayColor='transparent'
          onPress={this.handleChoosePhoto}
          style={{ flex:1}}
        >
        <Image
          source={require("./images/album.png")}
          style={{ width: 70, height: 70}}
        />
        </TouchableHighlight>
      </Container>
    </Container>
    );
  }
  componentDidMount(){
    Auth.currentAuthenticatedUser({
      bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    }).then(user =>{
      console.log(user.username)
      this.setState({username: user.username}
    )}).catch(err =>{
      console.log(err)});
  }
}