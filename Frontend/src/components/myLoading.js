import React from 'react';
import {View, Animated, Image} from 'react-native';

export default class MyLoading extends React.Component {
    constructor(props){
        super(props);
        this.loadingSpin = new Animated.Value(0);
    }
    SpinAnimation(){
        this.loadingSpin.setValue(0);
        Animated.sequence([
            Animated.timing(
                this.loadingSpin,
                {
                    toValue:1,
                    duration: 800,
                    useNativeDriver: true, 
                }
            )
        ]).start(()=>this.SpinAnimation());
    }
    componentDidMount(){
        this.SpinAnimation();
    }
    render(){
        const spin = this.loadingSpin.interpolate({
            inputRange: [0, 1],
            outputRange:['0deg','360deg']
        });
        return (<View style={{opacity: (this.props.show)?1:0}}>
            {/* <Animated.Text style={{opacity: this.loadingSpin}}>Loading...</Animated.Text> */}
            <Animated.Image source={require('VirtualLip/src/images/spinner.png')} style={{transform:[{rotate: spin}],alignSelf:'center',width: 70, height: 70, marginBottom: 10, marginTop:10}} />
        </View>);
    }
}