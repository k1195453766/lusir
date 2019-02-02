/*
 * @Author: Wang Kai 
 * @Date: 2018-11-22 12:14:44 
 * @Last Modified by: Wang Kai
 * @Last Modified time: 2019-01-21 16:41:50
 */


import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  BackAndroid,
  BackHandler
} from 'react-native';
import BaseView from './src/Component/BaseView';
import BaseComponent from './src/Component/BaseComponent';
import StackNavigates from './src/stackNavigator';
import Toast from 'react-native-root-toast';

export default class App extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      isRequest: false
    }
  }

  componentWillMount() {
    //手机返回按键监听
    //ios中默认Platform.OS === 'ios' 为空，所以这里可以不用添加android的判断
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    };
  };

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    };
  };

  onBackAndroid = () => {
    if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
      //最近2秒内按过back键，可以退出应用。
      return false;
    }
    this.lastBackPressed = Date.now();
    Toast.show('再按一次退出应用');
    return true;
  };

  render() {
    return (
      <StackNavigates />
      // <BaseView style={styles.welcome} isRequest={this.state.isRequest}>
      // </BaseView>
    );
  }
}

console.ignoredYellowBox = ['Warning: BackAndroid is deprecated. Please use BackHandler instead.', 'source.uri should not be an empty string', 'Invalid props.style key'];

console.disableYellowBox = true // 去除所有黄色警告
