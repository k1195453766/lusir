/*
 * @Author: {Wang Kai} 
 * @Date: 2018-11-28 10:49:03 
 * @Last Modified by: Wang Kai
 * @Last Modified time: 2018-12-06 09:18:21
 * @Describe 注册界面 */


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
    TextInput
} from 'react-native';
import BaseView from '../../Component/BaseView';
import BaseComponent from '../../Component/BaseComponent';
import color from '../../Component/Color';
import Dimension from '../../Component/Dimension';
import { toastShort } from '../../Component/Toast';


export default class Register extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            isRequest: false,
            isRefreshing: false,
            isOpen: false,
            secureTextEntry: true,
            isCode: false,
            time: 60,
            phone: '',
            code: '',
            pwd: ''
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            // headerTitle: '注册',
            // //导航栏的title的style
            // headerTitleStyle: {
            //     color: color.tabText,
            //     //居中显示
            //     alignSelf: 'center',
            //     fontSize: 16,
            // },
            // //是否允许右滑返回，在iOS上默认为true，在Android上默认为false
            // gesturesEnabled: true,
            // headerStyle: { backgroundColor: color.statusBar, height: 40 },
            header: null
        };
    }

    componentWillMount() {
        this.timer && clearInterval(this.timer);
    }


    login() {
        alert('注册')
    }

    eyeOnPress = () => {
        this.setState({
            isOpen: !this.state.isOpen,
            secureTextEntry: !this.state.secureTextEntry
        })
    }

    onCode = () => {
        if (this.state.phone == '' || this.state.phone.length != 11) {
            toastShort('请输入手机号');
            return;
        }
        this.interval();
        this.setState({
            isCode: true
        })
    }

    /**
     * 倒计时
     */
    interval = () => {
        this.timer = setInterval(() => {
            var times = this.state.time;
            if (times == 0) {
                this.setState({
                    time: 60,
                    isCode: false
                })
                this.timer && clearInterval(this.timer);
            } else {
                this.setState({
                    time: times - 1,
                })
            }
        }, 1000)
    }

    editPhone = (text) => {
        this.setState({
            phone: text
        })
    }

    editCode = (text) => {
        this.setState({
            code: text
        })
    }

    editPassword = (text) => {
        this.setState({
            pwd: text
        })
    }

    register = () => {
        if (this.state.phone == '' || this.state.phone.trim() == '') {
            toastShort('请输入手机号');
            return;
        }
        if (this.state.code == '' || this.state.code.trim() == '') {
            toastShort('请输入验证码');
            return;
        }
        if (this.state.pwd == '' || this.state.pwd.trim() == '') {
            toastShort('请输入密码');
            return;
        }

        alert('注册')
    }

    back = () => {
        this.props.navigation.pop();
    }

    render() {
        return (

            <BaseView style={styles.welcome} isRequest={this.state.isRequest}>
                <ImageBackground
                    style={{ width: Dimension.width, height: Dimension.height }}
                    source={require('../../images/payment/register-background.png')}
                    resizeMode='cover'
                >
                    <View style={{ width: Dimension.width, height: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 10 }}>
                        <TouchableOpacity onPress={this.back}>
                            <Image
                                style={{ width: 20, height: 20 }}
                                source={require('../../images/payment/nav-back.png')}
                                resizeMode='cover'
                            />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 16, color: 'white' }}>注册</Text>
                        <Text style={{ fontSize: 16, color: 'white' }}>    </Text>
                    </View>
                    <View style={styles.photo}>
                        <TouchableOpacity style={{ width: 80, height: 80, overflow: 'hidden', borderRadius: 40 }}>
                            <Image
                                style={{ width: 80, height: 80 }}
                                source={require('../../images/payment/login-touxiang.png')}
                                resizeMode='cover'
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={{ alignItems: 'center' }}>
                        <View style={[styles.name]}>
                            <View style={{ width: 60, height: 40, backgroundColor: color.statusBar, justifyContent: 'center', alignItems: 'center' }}>
                                <Image
                                    source={require('../../images/login/phone.png')}
                                    style={{ width: 20, height: 20 }}
                                />
                            </View>
                            <TextInput
                                style={{ height: 40, width: 200, marginLeft: 10 }}
                                placeholder='请输入手机号'
                                keyboardType='default' // 默认键盘类型
                                autoCapitalize='none' // 取消首字母大写
                                keyboardAppearance='light' // 键盘演示
                                returnKeyType='done'  // 代替 returnKeyType
                                secureTextEntry={false} // 输入内容显示黑色圆点
                                clearButtonMode='while-editing' // 输入框右边 x 按钮
                                underlineColorAndroid="transparent"
                                selectionColor={color.statusBar}
                                numberOfLines={1}
                                onChangeText={(text) => this.editPhone(text)}
                            />
                        </View>

                        <View style={[styles.code]}>
                            <TextInput
                                style={{ height: 40, width: 200, marginLeft: 10 }}
                                placeholder='请输入验证码'
                                keyboardType='default' // 默认键盘类型
                                autoCapitalize='none' // 取消首字母大写
                                keyboardAppearance='light' // 键盘演示
                                returnKeyType='done'  // 代替 returnKeyType
                                secureTextEntry={false} // 输入内容显示黑色圆点
                                clearButtonMode='while-editing' // 输入框右边 x 按钮
                                underlineColorAndroid="transparent"
                                selectionColor={color.statusBar}
                                numberOfLines={1}
                                onChangeText={(text) => this.editCode(text)}
                            />
                            {this.state.isCode == false ? (
                                <TouchableOpacity onPress={this.onCode} style={{ width: 70, height: 40, backgroundColor: color.statusBar, justifyContent: 'center', alignItems: 'center', position: 'absolute', right: 0 }}>
                                    <Text style={{ fontSize: 10, color: color.white }}>获取验证码({this.state.time})</Text>
                                </TouchableOpacity>
                            ) : (
                                    <View style={{ width: 70, height: 40, backgroundColor: 'gray', justifyContent: 'center', alignItems: 'center', position: 'absolute', right: 0 }}>
                                        <Text style={{ fontSize: 10, color: color.white }}>重新发送({this.state.time})</Text>
                                    </View>
                                )}

                        </View>

                        <View style={[styles.password]}>
                            <View style={{ width: 60, height: 40, backgroundColor: color.statusBar, justifyContent: 'center', alignItems: 'center' }}>
                                <Image
                                    source={require('../../images/login/password.png')}
                                    style={{ width: 20, height: 20 }}
                                />
                            </View>
                            <TextInput
                                style={{ height: 40, width: 200, marginLeft: 10 }}
                                placeholder='请输入密码'
                                keyboardType='default' // 默认键盘类型
                                autoCapitalize='none' // 取消首字母大写
                                keyboardAppearance='light' // 键盘演示
                                returnKeyType='done'  // 代替 returnKeyType
                                secureTextEntry={this.state.secureTextEntry} // 输入内容显示黑色圆点
                                clearButtonMode='while-editing' // 输入框右边 x 按钮
                                underlineColorAndroid="transparent"
                                selectionColor={color.statusBar}
                                numberOfLines={1}
                                onChangeText={(text) => this.editPassword(text)}
                            />
                            <TouchableOpacity activeOpacity={1} onPress={this.eyeOnPress} style={{ width: 30, height: 30, position: 'absolute', right: 10, justifyContent: 'center', alignItems: 'center' }}>
                                {this.state.isOpen == true ? (
                                    <Image
                                        source={require('../../images/login/eyeOpen.png')}
                                        style={{ width: 20, height: 20 }}
                                    />
                                ) : (
                                        <Image
                                            source={require('../../images/login/eyeClose.png')}
                                            style={{ width: 20, height: 20 }}
                                        />
                                    )}

                            </TouchableOpacity>
                        </View>
                        <View style={styles.buttonStyle}>
                            <TouchableOpacity onPress={() => this.register()} style={[styles.button]} activeOpacity={0.5}>
                                <Text style={{ color: 'white', fontSize: 14 }}>注册</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>


            </BaseView >
        );
    }
}

const styles = StyleSheet.create({
    photo: {
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimension.width,
        height: Dimension.height / 2 - 80
    },
    button: {
        width: Dimension.width * 0.8,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: color.statusBar,
    },
    buttonStyle: {
        width: Dimension.width,
        height: 40,
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    password: {
        width: Dimension.width * 0.8,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: color.statusBar,
        borderWidth: 0.5,
        borderRadius: 20,
        marginTop: 10,
        overflow: 'hidden'
    },
    code: {
        width: Dimension.width * 0.8,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: color.statusBar,
        borderWidth: 0.5,
        borderRadius: 20,
        marginTop: 10,
        overflow: 'hidden'
    },
    name: {
        width: Dimension.width * 0.8,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: color.statusBar,
        borderWidth: 0.5,
        borderRadius: 20,
        marginTop: 30,
        overflow: 'hidden'
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

});
