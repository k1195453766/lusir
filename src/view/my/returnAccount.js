/*
 * @Author: {Wang Kai} 
 * @Date: 2019-01-23 15:36:45 
 * @Last Modified by: Wang Kai
 * @Last Modified time: 2019-01-26 11:22:21
 * @Describe 重置安全码 */


import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Alert,
    FlatList,
    ActivityIndicator,
    ScrollView,
    Image,
    TouchableOpacity,
    TextInput
} from 'react-native';
import color from '../../Component/Color';
import Dimension from '../../Component/Dimension';
import { ToastShort } from '../../Component/Toast';

export default class ReturnAccount extends React.PureComponent {
    //构造方法
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            code: '',
        };
    }

    static navigationOptions = ({ navigation }) => {

        reset = () => {
            navigation.navigation('Reset')
        }

        return {
            headerTitle: '找回账号',
            headerLayoutPreset: 'center',
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

    UNSAFE_componentWillMount() {

    }

    setPhone = (text) => {
        this.setState({
            phone: text
        })
    }

    setCode = (text) => {
        this.setState({
            code: text
        })
    }

    //提交
    submit = () => {
        if (this.state.phone == '' || this.state.phone.trim() || this.state.phone.length != 11) {
            ToastShort('手机号输入不正确');
            return;
        }

        if (this.state.code == '' || this.state.code.trim() == '') {
            ToastShort('验证码输入不正确');
            return;
        }


    }

    // 获取验证码
    getCode = () => {
        if (this.state.phone == '' || this.state.phone.trim() || this.state.phone.length != 11) {
            ToastShort('手机号输入不正确');
            return;
        }
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: color.background }}>
                <View style={{ width: Dimension.width, height: 40, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }}>
                    <View style={{ width: 80, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 12, color: 'gray' }}>手机号</Text>
                    </View>
                    <TextInput style={styles.safecode}
                        placeholder="请输入电话号码"
                        keyboardType='default'// 默认键盘类型
                        underlineColorAndroid="transparent"
                        clearButtonMode='while-editing'
                        selectionColor='#EEB422'
                        onChangeText={(text) => this.setPhone(text)}
                    />
                </View>

                <View style={{ width: Dimension.width, height: 40, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', paddingLeft: 10, borderTopColor: color.background, borderTopWidth: 0.5 }}>
                    <View style={{ width: 80, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 12, color: 'gray' }}>验证码</Text>
                    </View>
                    <TextInput style={styles.code}
                        placeholder="请输入验证码"
                        keyboardType='default'// 默认键盘类型
                        underlineColorAndroid="transparent"
                        clearButtonMode='while-editing'
                        selectionColor='#EEB422'
                        onChangeText={(text) => this.setCode(text)}
                    />
                    <View style={{ width: 80, height: 40, justifyContent: 'center', alignItems: 'center', position: 'absolute', right: 0 }}>
                        <TouchableOpacity onPress={this.getCode} style={{ width: 60, height: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 4, backgroundColor: color.saffron_yellow }}>
                            <Text style={{ fontSize: 10, color: 'white' }}>获取验证码</Text>
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={{ width: Dimension.width, marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={this.submit} style={{ width: Dimension.width * 0.8, height: 40, backgroundColor: color.saffron_yellow, justifyContent: 'center', alignItems: 'center', borderRadius: 6 }}>
                        <Text style={{ fontSize: 14, color: 'white' }}>提交</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    code: {
        width: 100,
        height: 40,
        position: 'absolute',
        right: 0,
        marginRight: 80,
    },
    safecode: {
        width: 140,
        height: 40,
        position: 'absolute',
        right: 0,
        backgroundColor: 'white'
    }

});