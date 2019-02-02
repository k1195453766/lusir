import React, { Component } from 'react';
import {
    Animated
} from 'react-native';
export default class Videos extends Component{
    constructor(props) {
      super(props);
      this.state = {
        bounceValue: new Animated.Value(0),
      };
    }
 
  componentDidMount() {
     this.state.bounceValue.setValue(1.5);     
    //可选的动画类型有三种：spring,decay,timing;
     Animated.spring(                         
       this.state.bounceValue,    
     //将bounceValue的值动画化，是一个持续变化的过程         
       {
         toValue: 0.8,                       
         friction: 1,                         
       }
     ).start();                              
   }
 
   render(){
     return(
     //可选基本组件一般为Image,Text,View
       <Animated.Image                        
         source={{uri: "https://img3.doubanio.com/view/photo/photo/public/p2396117560.jpg"}}
         style={{
           flex: 1,
     //transform是一个有序的数组(动画按顺序执行)
           transform: [                       
             {scale: this.state.bounceValue},
           ]
         }}
       />
       );
   }
 
 }
