import React from "react";
import {
  Button,
  Body,
  Header,
  Title,
  Left,
  Icon as IconNative,
  Right
} from "native-base";
import LinearGradient from 'react-native-linear-gradient/index.android.js';
export default class HeaderLG extends React.Component {
    constructor() {
        super();
    }
    render(){
        return(
            <LinearGradient 
						colors={['#FAC699', '#F9C199', '#F8BE99', '#F7BA99', '#F6B799', '#F5B499', '#F4B19A',
                   '#F3AB9B', '#F2A89B', '#F2A69B', '#F2A49B', '#F1A19C']} 
						start={{x:0,y:0}} end={{x:1,y:1}}>
                <Header noShadow style={{backgroundColor: 'transparent', borderBottomColor: 'transparent'}}>
                    <Left style={{flex: 1}}>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.openDrawer()}
                        >
                            <IconNative name="menu" style={{fontSize: 35}}/>
                        </Button>
                    </Left>
                    <Body style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Title style={{fontSize: 23}}>VirtualLip</Title>
                    </Body>
                    <Right style={{flex: 1}}>
                    </Right>
                </Header>
            </LinearGradient>
        );
    }
}