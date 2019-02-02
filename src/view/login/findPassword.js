/*
 * @Author: {Wang Kai} 
 * @Date: 2018-12-04 12:15:19 
 * @Last Modified by: Wang Kai
 * @Last Modified time: 2018-12-04 13:47:53
 * @Describe 找回密码 */


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


export default class FindPassword extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            isRequest: false,
            phone: '',
            code: '',
            newPassword: '',
            time: 60,
            isCode: false
        }
    }

    static navigationOptions = ({ navigation }) => {

        return {
            headerTitle: '找回密码',
            //导航栏的title的style
            headerTitleStyle: {
                color: color.tabText,
                //居中显示
                alignSelf: 'center',
                fontSize: 16,
            },
            //是否允许右滑返回，在iOS上默认为true，在Android上默认为false
            gesturesEnabled: true,
            headerStyle: { backgroundColor: color.statusBar, height: 40 },
        };
    }

    phone = (text) => {
        this.setState({
            phone: text
        })
    }

    code = (text) => {
        this.setState({
            code: text
        })
    }

    newPassword = (text) => {
        this.setState({
            newPassword: text
        })
    }

    editpassword = () => {
        if (this.state.phone == '' || this.state.phone.trim() == '') {
            toastShort('请输入手机号');
            return;
        }
        if (this.state.code == '' || this.state.code.trim() == '') {
            toastShort('请输入验证码');
            return;
        }
        if (this.state.newPassword == '' || this.state.newPassword.trim() == '') {
            toastShort('请输入新密码');
            return;
        }

        toastShort('确认修改密码')
    }

    getCode = () => {
        if (this.state.phone == '' || this.state.phone.trim() == '') {
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

    render() {
        return (

            <BaseView style={styles.welcome} isRequest={this.state.isRequest}>


                <View>
                    <View style={styles.centerView2}>
                        <TextInput style={styles.theText3}
                            keyboardType='default'
                            placeholder="请输入手机号"
                            clearButtonMode='while-editing'
                            underlineColorAndroid="transparent"
                            autoFocus={true}
                            onChangeText={(text) => this.phone(text)}
                        ></TextInput>
                    </View>

                    <View style={[styles.centerViewcode, { flexDirection: 'row', alignItems: 'center' }]}>
                        <TextInput style={styles.theTextcode}
                            keyboardType='default'
                            placeholder="请输入验证码"
                            clearButtonMode='while-editing'
                            underlineColorAndroid="transparent"
                            onChangeText={(text) => this.code(text)}
                        ></TextInput>
                        {this.state.isCode == false ? (
                            <TouchableOpacity onPress={this.getCode} style={{ width: 80, height: 30, backgroundColor: color.statusBar, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 12, color: 'white' }}>验证码({this.state.time})</Text>
                            </TouchableOpacity>
                        ) : (
                                <TouchableOpacity style={{ width: 80, height: 30, backgroundColor: 'gray', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 12, color: 'white' }}>重新获取({this.state.time})</Text>
                                </TouchableOpacity>
                            )}
                    </View>

                    <View style={styles.centerView2}>
                        <TextInput style={styles.theText3}
                            keyboardType='default'
                            placeholder="请输入新密码"
                            clearButtonMode='while-editing'
                            underlineColorAndroid="transparent"
                            secureTextEntry={true}
                            onChangeText={(text) => this.newPassword(text)}
                        >
                        </TextInput>
                    </View>
                    <View style={styles.buttonStyle}>
                        <TouchableOpacity onPress={() => this.editpassword()} style={[styles.button]} activeOpacity={0.5}>
                            <Text style={{ color: 'white' }}>提交</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </BaseView>
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
    centerViewcode: {
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
    theTextcode: {
        fontSize: 12,
        width: Dimension.width * 0.9 - 100,
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

