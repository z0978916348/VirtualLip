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

  render() {
    const { photo } = this.state;
    return (
    <Container>
      <HeaderLG navigation={this.props.navigation}/>
        <Container>
        <Image
          source={require("./images/unweb.png")}
          style={{
            height: 400,
                  width: "100%",
                  alignSelf: "stretch",
                  position: "absolute"
          }}
        />
        </Container>
    </Container>
    );
  }
}