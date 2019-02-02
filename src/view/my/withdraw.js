/*
 * @Author: {Wang Kai} 
 * @Date: 2019-01-25 16:11:29 
 * @Last Modified by: Wang Kai
 * @Last Modified time: 2019-01-28 12:25:22
 * @Describe 提现 */

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
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Withdraw extends React.PureComponent {
    //构造方法
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            bankcode: '',
            money: '',
            safecode: '',
        };
    }

    static navigationOptions = ({ navigation }) => {

        return {
            headerTitle: '提现',
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

    setUserName = (text) => {
        this.setState({
            username: text
        })
    }

    setBankCode = (text) => {
        this.setState({
            bankcode: text
        })
    }

    setMoney = (text) => {
        this.setState({
            money: text
        })
    }

    setSafeCode = (text) => {
        this.setState({
            safecode: text
        })
    }
    // 提现
    tixian = () => {
        if (this.state.username == '' || this.state.username.trim() == '') {
            ToastShort('请输入收款人姓名');
            return;
        }
        if (this.state.bankcode == '' || this.state.bankcode.trim() == '') {
            ToastShort('请输入收款账号');
            return;
        }
        if (this.state.money == '' || this.state.money.trim() == '') {
            ToastShort('请输入提现金额');
            return;
        }
        if (this.state.safecode == '' || this.state.safecode.trim() == '') {
            ToastShort('请输入安全码');
            return;
        }


    }
    // 收益明细
    detail = () => {
        this.props.navigation.navigate('IncomeDetails');
    }
    // 提现记录
    record = () => {
        this.props.navigation.navigate('WithdrawalsRecord');
    }


    render() {
        return (
            <ScrollView
                style={{ width: '100%', height: '100%', backgroundColor: color.background }}
                keyboardShouldPersistTaps={'handled'}
            >
                <View style={{ width: '100%', height: '100%' }}>

                    <View style={{ width: '100%', backgroundColor: color.saffron_yellow }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                            <Image
                                source={require('../image/my/wallet.png')}
                                style={{ width: 40, height: 40 }}
                            />
                            <Text style={{ fontSize: 14, color: 'white', marginTop: 10 }}>总业绩:0.00元     余额:0.00元</Text>

                            <View style={{ width: '100%', height: 60, flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ width: '25%', height: 40, justifyContent: 'center', alignItems: 'center', borderRightColor: 'white', borderRightWidth: 0.5 }}>
                                    <Text style={styles.tuiguang}>1级推广</Text>
                                    <Text style={styles.tuiguang}>1</Text>
                                </View>
                                <View style={{ width: '25%', height: 40, justifyContent: 'center', alignItems: 'center', borderRightColor: 'white', borderRightWidth: 0.5 }}>
                                    <Text style={styles.tuiguang}>2级推广</Text>
                                    <Text style={styles.tuiguang}>0</Text>
                                </View>
                                <View style={{ width: '25%', height: 40, justifyContent: 'center', alignItems: 'center', borderRightColor: 'white', borderRightWidth: 0.5 }}>
                                    <Text style={styles.tuiguang}>3级推广</Text>
                                    <Text style={styles.tuiguang}>0</Text>
                                </View>
                                <View style={{ width: '25%', height: 40, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={styles.tuiguang}>4级推广</Text>
                                    <Text style={styles.tuiguang}>0</Text>
                                </View>
                            </View>

                            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 5 }}>

                                <TouchableOpacity onPress={this.detail} style={{ width: 80, height: 36, justifyContent: 'center', alignItems: 'center', borderRadius: 5, backgroundColor: color.white }}>
                                    <Text style={{ color: color.saffron_yellow, fontSize: 12 }}>收益明细</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.record} style={{ width: 80, height: 36, justifyContent: 'center', alignItems: 'center', borderRadius: 5, backgroundColor: color.white, marginLeft: 10 }}>
                                    <Text style={{ color: color.saffron_yellow, fontSize: 12 }}>提现记录</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', width: '100%', height: 40, alignItems: 'center', backgroundColor: 'white', justifyContent: 'space-between', padding: 10 }}>
                        <Text>提现方式</Text>
                        <View>
                            <Text>银行卡</Text>
                        </View>
                    </View>

                    <View style={{ borderTopColor: 'gray', borderTopWidth: 0.5, flexDirection: 'row', width: '100%', height: 40, alignItems: 'center', backgroundColor: 'white', justifyContent: 'space-between', padding: 10 }}>
                        <Text>提现手续费</Text>
                        <View>
                            <Text>5%</Text>
                        </View>
                    </View>

                    <View style={{ borderTopColor: 'gray', borderTopWidth: 0.5, flexDirection: 'row', width: '100%', height: 40, alignItems: 'center', backgroundColor: 'white', justifyContent: 'space-between', padding: 10 }}>
                        <Text>收款人姓名</Text>
                        <View>
                            <TextInput style={[styles.safecode]}
                                placeholder="请输入收款人姓名"
                                keyboardType='default'// 默认键盘类型
                                underlineColorAndroid="transparent"
                                clearButtonMode='while-editing'
                                selectionColor='#EEB422'
                                onChangeText={(text) => this.setUserName(text)}
                            />
                        </View>
                    </View>

                    <View style={{ borderTopColor: 'gray', borderTopWidth: 0.5, flexDirection: 'row', width: '100%', height: 40, alignItems: 'center', backgroundColor: 'white', justifyContent: 'space-between', padding: 10 }}>
                        <Text>银行卡账号</Text>
                        <View>
                            <TextInput style={styles.safecode}
                                placeholder="请输入收款账号"
                                keyboardType='default'// 默认键盘类型
                                underlineColorAndroid="transparent"
                                clearButtonMode='while-editing'
                                selectionColor='#EEB422'
                                onChangeText={(text) => this.setBankCode(text)}
                            />
                        </View>
                    </View>


                    <View style={{ borderTopColor: 'gray', borderTopWidth: 0.5, flexDirection: 'row', width: '100%', height: 40, alignItems: 'center', backgroundColor: 'white', justifyContent: 'space-between', padding: 10 }}>
                        <Text>提现金额</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TextInput style={styles.safecode}
                                placeholder="请输入提现金额"
                                keyboardType='default'// 默认键盘类型
                                underlineColorAndroid="transparent"
                                clearButtonMode='while-editing'
                                selectionColor='#EEB422'
                                onChangeText={(text) => this.setMoney(text)}
                            />
                            <Text>元</Text>
                        </View>
                    </View>

                    <View style={{ borderTopColor: 'gray', borderTopWidth: 0.5, flexDirection: 'row', width: '100%', height: 40, alignItems: 'center', backgroundColor: 'white', justifyContent: 'space-between', padding: 10, }}>
                        <Text>安全码</Text>
                        <View>
                            <TextInput style={styles.safecode}
                                placeholder="请输入安全码"
                                keyboardType='default'// 默认键盘类型
                                underlineColorAndroid="transparent"
                                clearButtonMode='while-editing'
                                selectionColor='#EEB422'
                                onChangeText={(text) => this.setSafeCode(text)}
                            />
                        </View>
                    </View>

                    <View style={{ width: '100%', paddingTop: 20, justifyContent: 'flex-end', alignItems: 'center', backgroundColor: color.background }}>
                        <TouchableOpacity onPress={this.tixian} style={{ width: Dimension.width * 0.8, height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: color.saffron_yellow, borderRadius: 5 }}>
                            <Text style={{ fontSize: 16, color: 'white' }}>提交申请</Text>
                        </TouchableOpacity>

                        <View style={{ width: Dimension.width * 0.8, marginTop: 10 }}>
                            <Text style={{ fontSize: 10, color: 'gray' }}>#余额来源:当别人(新用户)通过您的推广码链接下载打开APP后(或者输入您的邀请码)即可建立邀请关系,每次当他购买会员都会返利给你</Text>
                        </View>
                    </View>


                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    safecode: {
        height: 40,
        textAlign: "right"
    },
    tuiguang: {
        fontSize: 10,
        color: 'white',
    },
    indicator: {
        margin: 10
    },
    indicatorContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },

});