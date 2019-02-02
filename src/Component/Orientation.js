/*
 * @Author: {Wang Kai} 
 * @Date: 2019-01-21 12:02:22 
 * @Last Modified by: Wang Kai
 * @Last Modified time: 2019-01-21 17:28:46
 * @Describe 屏幕横竖屏监听 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

import Dimension from './src/Component/Dimension';
import Orientation from 'react-native-orientation';

export default class Orientation extends React.PureComponent {

    //判断手机屏幕状态（横屏或者竖屏）
    isOrientation = () => {
        var initial = Orientation.getInitialOrientation();
        if (initial === 'PORTRAIT') {
            //竖屏

        } else {
            //横屏
        }
    }
    // 竖屏
    vertical = () => {
        Orientation.lockToPortrait();
    }

    // 横屏
    across = () => {
        Orientation.lockToLandscape();
    }



}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
