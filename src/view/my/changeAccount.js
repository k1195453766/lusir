/*
 * @Author: {Wang Kai} 
 * @Date: 2019-01-24 11:34:49 
 * @Last Modified by: Wang Kai
 * @Last Modified time: 2019-01-26 11:19:53
 * @Describe 切换账号 */

'use strict';

import React, { Component } from 'react'

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

export default class ChangeAccount extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            newacount: '',
            safecode: '',
        }
    };


    static navigationOptions = ({ navigation }) => {

        return {
            headerTitle: '切换账号',
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
    // 新账号
    setNewAcount = (text) => {
        this.setState({
            newacount: text
        })
    }
    // 安全码
    setSaftCode = (text) => {
        this.setState({
            safecode: text
        })
    }
    // 确定
    onPressCopy = () => {
        if (this.state.newacount == '' || this.state.newacount.trim() == '') {
            ToastShort('请输入新账号');
            return;
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ width: Dimension.width, marginTop: 30 }}>
                    <Text style={{ fontSize: 16, color: '#000', }}>当前账号:</Text>
                    <Text style={{ fontSize: 16, color: '#000', }}>agskeiowtansgnksdfaiwdag</Text>
                </View>

                <View style={{ width: Dimension.width, justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                    <Text style={{ fontSize: 16, color: '#000', }}>输入新账号立刻切换</Text>
                    <View style={{
                        flexDirection: 'row', height: 40, borderColor: color.saffron_yellow,
                        borderWidth: 1,
                        margin: 10,
                        borderRadius: 5,
                        padding: 5,
                        alignItems: 'center',
                    }}>
                        <TextInput style={styles.safecode}
                            placeholder="输入新账号"
                            keyboardType='default'// 默认键盘类型
                            underlineColorAndroid="transparent"
                            clearButtonMode='while-editing'
                            selectionColor='#EEB422'
                            onChangeText={(text) => this.setNewAcount(text)}
                        />
                    </View>

                    <View style={{
                        flexDirection: 'row', height: 40, borderColor: color.saffron_yellow,
                        borderWidth: 1,
                        margin: 10,
                        borderRadius: 5,
                        padding: 5,
                        alignItems: 'center',
                    }}>
                        <TextInput style={styles.safecode}
                            placeholder="如未设置安全码请勿填写"
                            keyboardType='default'// 默认键盘类型
                            underlineColorAndroid="transparent"
                            clearButtonMode='while-editing'
                            selectionColor='#EEB422'
                            onChangeText={(text) => this.setSaftCode(text)}
                        />
                    </View>
                </View>
                <View style={{ width: Dimension.width, height: 40, justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                    <TouchableOpacity onPress={this.onPressCopy} style={{ width: 100, height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: color.saffron_yellow, borderRadius: 10 }}>
                        <Text style={{ color: 'white', fontSize: 14 }}>确定</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    safecode: {
        width: Dimension.width * 0.8,
        height: 40
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',

    },
    input: {


    }
});