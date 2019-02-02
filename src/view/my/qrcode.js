/*
 * @Author: {Wang Kai} 
 * @Date: 2019-01-24 11:34:49 
 * @Last Modified by: Wang Kai
 * @Last Modified time: 2019-01-24 14:22:38
 * @Describe 生成二维码 */

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
    Clipboard
} from 'react-native';
import color from '../../Component/Color';
import Dimension from '../../Component/Dimension';
import { ToastShort } from '../../Component/Toast';

export default class QRCodes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'http://facebook.github.io/react-native/',
        }
    };


    static navigationOptions = ({ navigation }) => {

        return {
            headerTitle: '账号信息',
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

    onPressCopy = () => {
        Clipboard.setString(this.state.text);
        ToastShort('复制成功');
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 16, color: '#000', marginBottom: 20 }}>您的二维码信息:</Text>

                <QRCode
                    value={this.state.text}
                    size={200}
                    bgColor='purple'
                    fgColor='white' />
                <View style={{
                    flexDirection: 'row', height: 40, borderColor: 'gray',
                    borderWidth: 1,
                    margin: 20,
                    borderRadius: 5,
                    padding: 5,
                    alignItems: 'center'
                }}>
                    <Text>当前账号:</Text>
                    <Text style={styles.input}>{this.state.text}</Text>
                </View>
                <View style={{ width: Dimension.width, height: 40, justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                    <TouchableOpacity onPress={this.onPressCopy} style={{ width: 60, height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: color.saffron_yellow, borderRadius: 10 }}>
                        <Text style={{ color: 'white', fontSize: 14 }}>复制</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {


    }
});