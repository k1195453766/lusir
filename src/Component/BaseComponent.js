/*
 * @Author: Wang Kai 
 * @Date: 2018-11-21 18:29:37 
 * @Last Modified by: Wang Kai
 * @Last Modified time: 2019-01-21 19:35:05
 */
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    StatusBar,
    PixelRatio,
    ActivityIndicator
} from 'react-native';
import Orientation from 'react-native-orientation';
import Dimension from './Dimension';

export default class BaseComponent extends React.PureComponent {

    //判断手机屏幕状态（横屏或者竖屏）
    isOrientation = () => {
        var initial = Orientation.getInitialOrientation();
        if (initial === 'PORTRAIT') {
            //竖屏

        } else {
            //横屏
        }
    }
    // 强制竖屏
    vertical = () => {
        Orientation.lockToPortrait();
    }

    // 强制横屏
    across = () => {
        Orientation.lockToLandscape();
    }

    //页面请求开始加载页面Loading
    beginRequest() {
        this.setState({
            isRequest: true,
        });
    }
    //页面请求结束 取消Loading
    endRequest() {
        this.setState({
            isRequest: false,
        });
    }
}
