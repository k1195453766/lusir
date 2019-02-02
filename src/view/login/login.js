/*
 * @Author: {Wang Kai} 
 * @Date: 2018-11-28 10:49:03 
 * @Last Modified by: Wang Kai
 * @Last Modified time: 2019-01-21 16:40:12
 * @Describe 登录界面 */


import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    FlatList,
    Image,
    ScrollView,
    RefreshControl,
    ImageBackground,
    TouchableOpacity,
    TextInput,
    Platform,
    Alert
} from 'react-native';
import BaseView from '../../Component/BaseView';
import BaseComponent from '../../Component/BaseComponent';
import color from '../../Component/Color';
import Dimension from '../../Component/Dimension';
import { toastShort } from '../../Component/Toast';

export default class Login extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            isRequest: false,
            isRefreshing: false,
            username: '',
            password: ''
        }
    }

    static navigationOptions = ({ navigation }) => {

        return {
            header: null
        };
    }

    forgetPassword = () => {
        this.props.navigation.navigate('FindPassword')
    }

    login() {
        // if (this.state.username == '' || this.state.username.trim() == '') {
        //     toastShort('请输入用户名');
        //     return;
        // }
        // if (this.state.password == '' || this.state.password.trim() == '') {
        //     toastShort('请输入密码');
        //     return;
        // }

        // if (this.state.username == 'admin' && this.state == '888888') {
        //     this.props.navigation.navigate('Tab')
        // }

        this.props.navigation.navigate('Tab')
    }

    onRegister = () => {
        this.props.navigation.navigate('Register')
    }

    username = (text) => {
        this.setState({
            username: text
        })
    }

    password = (text) => {
        this.setState({
            password: text
        })
    }

    render() {
        return (

            <BaseView style={styles.welcome} isRequest={this.state.isRequest}>
                <ImageBackground
                    style={{ width: Dimension.width, height: Dimension.height }}
                    source={require('../../images/payment/login-background.png')}
                    resizeMode='cover'
                >
                    <View style={styles.header}>
                        <Text style={styles.login}>登陆</Text>
                    </View>
                    <View style={styles.photo}>
                        <View style={{ width: 80, height: 80, overflow: 'hidden', borderRadius: 40 }}>
                            <Image
                                style={{ width: 80, height: 80 }}
                                source={require('../../images/payment/login-touxiang.png')}
                                resizeMode='cover'
                            />
                        </View>
                    </View>

                    <View>
                        <View style={styles.centerView2}>
                            <TextInput style={styles.theText3}
                                keyboardType='default'
                                placeholder="请输入账号"
                                clearButtonMode='while-editing'
                                underlineColorAndroid="transparent"
                                autoFocus={true}
                                onChangeText={(text) => this.username(text)}
                            ></TextInput>
                        </View>

                        <View style={styles.centerView2}>
                            <TextInput style={styles.theText3}
                                keyboardType='default'
                                placeholder="请输入密码"
                                clearButtonMode='while-editing'
                                underlineColorAndroid="transparent"
                                secureTextEntry={true}
                                onChangeText={(text) => this.password(text)}
                            ></TextInput>
                        </View>
                        <Text style={{ fontSize: 10, color: color.statusBar, position: 'relative', left: 20, top: 2 }} onPress={this.forgetPassword}>忘记密码</Text>
                        <View style={styles.buttonStyle}>
                            <TouchableOpacity onPress={() => this.login()} style={[styles.button]} activeOpacity={0.5}>
                                <Text style={{ color: 'white' }}>登录</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.register}>
                            <Text onPress={this.onRegister} style={{ fontSize: 10, color: 'gray' }}>没有账号?<Text style={{ fontSize: 10, color: color.statusBar }}>立刻注册</Text></Text>
                        </View>
                    </View>

                </ImageBackground>

            </BaseView >
        );
    }
}

const styles = StyleSheet.create({
    register: {
        width: Dimension.width,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    photo: {
        width: Dimension.width,
        height: Dimension.height / 2 - 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    login: {
        fontSize: 16,
        color: color.white
    },
    header: {
        width: Dimension.width,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerView2: {
        height: 40,
        marginTop: 20,
        width: Dimension.width * 0.9,
        borderBottomWidth: 1,
        borderBottomColor: '#000000',
        marginLeft: 20
    },
    theText3: {
        fontSize: 12,
        width: Dimension.width * 0.9,
        top: 5
    },
    buttonStyle: {
        alignItems: 'center',
        marginTop: 20
    },
    button: {
        width: Dimension.width * 0.9,
        height: 40,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.statusBar,
        marginTop: 10
    },
});
