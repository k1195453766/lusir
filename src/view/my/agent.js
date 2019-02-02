/*
 * @Author: {Wang Kai} 
 * @Date: 2019-01-24 11:34:49 
 * @Last Modified by: Wang Kai
 * @Last Modified time: 2019-02-02 11:53:41
 * @Describe 代理招募 */

'use strict';

import React, { Component } from 'react'
import QRCode from 'react-native-qrcode';

import {
    AppRegistry,
    StyleSheet,
    View,
    TextInput,
    Text,
    TouchableOpacity,
    Clipboard,
    WebView,
    ActivityIndicator
} from 'react-native';
import color from '../../Component/Color';
import Dimension from '../../Component/Dimension';
import { ToastShort } from '../../Component/Toast';

export default class Agent extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {

        }
    };


    static navigationOptions = ({ navigation }) => {

        return {
            headerTitle: '代理招募',
            //导航栏的title的style
            headerTitleStyle: {
                color: color.white,
                //居中显示
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 16,
            },
            //是否允许右滑返回，在iOS上默认为true，在Android上默认为false
            gesturesEnabled: true,
            headerStyle: { backgroundColor: color.saffron_yellow, height: 40 },
        };
    }

    renderLoading = () => {
        return (
            <View style={styles.indicatorContainer}>
                <ActivityIndicator
                    style={styles.indicator}
                    size={'large'}
                    color={color.saffron_yellow}
                    animating={true}
                />
                <Text>正在加载页面</Text>
            </View>)
    }

    render() {
        return (
            <View style={styles.container}>
                <WebView
                    source={{ uri: `https://www.baidu.com` }}
                    renderLoading={this.renderLoading}
                    startInLoadingState={true}
                />
            </View>
        );
    };
}

const styles = StyleSheet.create({
    indicatorContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    indicator: {
        margin: 10
    },
    container: {
        flex: 1,
    },
});