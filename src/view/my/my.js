/*
 * @Author: {Wang Kai} 
 * @Date: 2018-11-23 15:37:07 
 * @Last Modified by: Wang Kai
 * @Last Modified time: 2019-01-31 17:49:08
 * @Describe 页面描述 :我的页面
 * */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Image,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Clipboard,
    Alert,
    Switch,
    DeviceEventEmitter
} from 'react-native';
import BaseView from '../../Component/BaseView';
import BaseComponent from '../../Component/BaseComponent';
import Dimension from '../../Component/Dimension';
import color from '../../Component/Color';
import { TableView, Section, Cell } from 'react-native-tableview-simple';
import { toastLong } from '../../Component/Toast';
import CDKeyModal from './component/cdkeyModal';
import InviteCodeModal from './component/inviteCodeModal';
import storage from '../../Component/StorageUtils';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class My extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            isRequest: false,  //Loading显示
            transparent: false, //Loading是否透明  false：不透明 true：透明
            count: 0,
            cdkeyLoading: false,
            inviteCodeModal: false,
            isKey: true,
            falseSwitchIsOn: false,   //密码锁
        }
    }

    UNSAFE_componentWillMount() {
        storage.load({
            key: 'lock',
        }).then(ret => {
            if (ret == null) {
                this.setState({
                    falseSwitchIsOn: false
                });
            }
            if (ret.length == 0) {
                this.setState({
                    falseSwitchIsOn: false
                });
            } else {
                this.setState({
                    falseSwitchIsOn: true
                });
            }

        }).catch(err => {
            console.warn(err.message);
            this.setState({
                falseSwitchIsOn: false
            });
        })
    }

    componentDidMount() {
        this.lock = DeviceEventEmitter.addListener('lock', (message) => {
            //收到监听后想做的事情
            this.setState({
                falseSwitchIsOn: message.lock
            })
        })
    }

    onPressWenHao = () => {
        toastLong('每天凌晨00:00重置看片次数,绑定手机和推广可以永久增加次数');
    }

    onPressCopy = () => {
        Clipboard.setString('http://www.baidu.com');

        Alert.alert(
            '提示',
            '邮箱地址已复制到剪切板,建议撸友们保存,方便与官方联系,可用于反馈问题,咨询代理细节,获取最新官网地址等',
            [
                { text: '好的', onPress: () => { } }
            ],
            { cancelable: false }
        )
    }

    //点击扫一扫
    onPressSys = () => {
        this.props.navigation.navigate('Barcodes')
    }

    //点击二维码
    onPressErWeiMa = () => {
        this.props.navigation.navigate('QRCodes');
    }

    //输入邀请码
    inviteCode = () => {
        this.setState({
            inviteCodeModal: true
        })
    }

    //输入兑换码
    CDkey = () => {
        this.setState({
            cdkeyLoading: true
        })
    }

    onRequestClose = () => {
        this.setState({
            cdkeyLoading: false,
            inviteCodeModal: false
        })
    }

    //开通会员
    onPressVIP = () => {
        this.props.navigation.navigate('VIP');
    }
    //提现
    withdraw = () => {
        if (this.state.isKey == false) {
            Alert.alert(
                '提示',
                '尚未设置安全码,请设置后在提现',
                [
                    { text: '取消', onPress: () => { } },
                    { text: '去设置', onPress: () => { this.props.navigation.navigate('SafeCode') } },
                ],
                { cancelable: false }
            )
        }
        this.props.navigation.navigate('Withdraw');
    }
    // 安全码
    safeCode = () => {
        this.props.navigation.navigate('SafeCode')
    }
    // 切换账号
    username = () => {
        this.props.navigation.navigate('ChangeAccount')
    }
    // 找回账号
    returnAccount = () => {
        this.props.navigation.navigate('ReturnAccount')
    }
    // 绑定手机
    bindingPhone = () => {
        this.props.navigation.navigate('BindingPhone')
    }
    // 分享推广
    extension = () => {
        this.props.navigation.navigate('Extension')
    }
    //代理招募
    agent = () => {
        this.props.navigation.navigate('Agent')
    }
    // 播放历史
    history = () => {
        this.props.navigation.navigate('History')
    }
    // 按番号求片
    designation = () => {
        this.props.navigation.navigate('Designation')
    }
    // 下载管理
    download = () => {
        this.props.navigation.navigate('Download')
    }
    // 密码锁
    switch = (value) => {
        this.setState({
            falseSwitchIsOn: value
        })

        storage.save({
            key: 'isSwitch', // Note: Do not use underscore("_") in key!
            data: value
        });

        if (value == true) {
            this.props.navigation.navigate('CodeLock', { falseSwitchIsOn: true });
        } else {
            this.props.navigation.navigate('CodeLock', { falseSwitchIsOn: false });
            // storage.load({
            //     key: 'isSwitch',
            // }).then(ret => {
            //     if (ret == null) {
            //         this.setState({
            //             isSwitch: false
            //         });
            //     }
            //     this.setState({
            //         isSwitch: ret
            //     });
            // }).catch(err => {
            //     console.warn(err.message);
            //     switch (err.name) {
            //         case 'NotFoundError':
            //             // TODO;
            //             break;
            //         case 'ExpiredError':
            //             // TODO
            //             break;
            //     }
            // })
        }
    }

    render() {
        return (
            <ScrollView>
                <BaseView isRequest={this.state.isRequest} transparent={this.state.transparent}>
                    <View style={{ flex: 1, backgroundColor: color.background }}>
                        <View style={styles.headers}>
                            <View style={styles.header}>
                                <Image
                                    source={require('../image/my/sese.png')}
                                    style={{ width: 40, height: 40, marginTop: 10 }}
                                />
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={styles.cishu}>每日看片次数:{this.state.count}</Text>
                                    <TouchableOpacity onPress={this.onPressWenHao}>
                                        <Image
                                            source={require('../image/tab/wenhao1.png')}
                                            style={{ width: 15, height: 15, marginTop: 10, }}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.text1}>点击广告可临时增加当天看片次数,最多提升3次</Text>
                            </View>
                        </View>

                        <View style={{ width: Dimension.width, height: 100, backgroundColor: color.white, flexDirection: 'row' }}>
                            <TouchableOpacity onPress={this.onPressVIP} style={[styles.type, { borderRightColor: color.background, borderRightWidth: 0.1 }]}>
                                <Image
                                    source={require('../image/my/VIP.png')}
                                    style={{ width: 40, height: 40, }}
                                />
                                <Text style={{ fontSize: 14, color: '#515151' }}>购买会员</Text>
                                <Text style={{ fontSize: 10, color: 'gray' }}>无线观看</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.agent} style={[styles.type, { borderRightColor: color.background, borderRightWidth: 0.1 }]}>
                                <Image
                                    source={require('../image/my/daili.png')}
                                    style={{ width: 40, height: 40, }}
                                />
                                <Text style={{ fontSize: 14, color: '#515151' }}>代理招募</Text>
                                <Text style={{ fontSize: 10, color: 'gray' }}>返利高达30%</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.withdraw} style={[styles.type, { borderRightColor: color.background, borderRightWidth: 0.1 }]}>
                                <Image
                                    source={require('../image/my/tixian.png')}
                                    style={{ width: 40, height: 40, }}
                                />
                                <Text style={{ fontSize: 14, color: '#515151' }}>提现</Text>
                                <Text style={{ fontSize: 10, color: 'gray' }}>余额0.00元</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.extension} style={styles.type}>
                                <Image
                                    source={require('../image/my/tuiguang.png')}
                                    style={{ width: 40, height: 40, }}
                                />
                                <Text style={{ fontSize: 14, color: '#515151' }}>分享推广</Text>
                                <Text style={{ fontSize: 10, color: 'gray' }}>已推0人</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress={this.onPressCopy} style={styles.emails}>
                            <View style={styles.emailsview}>
                                <Text style={styles.emailstext}>官方邮箱:www.baidu.com</Text>
                            </View>
                            <View style={styles.copyview}>
                                <Text style={styles.copytext}>复制</Text>
                            </View>
                        </TouchableOpacity>

                        <View style={{ width: Dimension.width, marginTop: 20 }}>
                            <TouchableOpacity onPress={this.username} style={styles.centerview}>
                                <View style={styles.imgview}>
                                    <Image
                                        source={require('../image/my/users.png')}
                                        style={{ width: 20, height: 20 }}
                                    />
                                </View>
                                <View style={styles.username}>
                                    <Text style={styles.text2}>切换账号</Text>
                                </View>
                                <View style={{ width: 80, height: 40, position: 'absolute', right: 40, flexDirection: 'row' }}>
                                    <TouchableOpacity onPress={this.onPressErWeiMa} style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                                        <Image
                                            source={require('../image/my/erweima.png')}
                                            style={{ width: 20, height: 20 }}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={this.onPressSys} style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                                        <Image
                                            source={require('../image/my/sys.png')}
                                            style={{ width: 22, height: 22 }}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.gtview}>
                                    <Image
                                        source={require('../image/my/gt.png')}
                                        style={{ width: 20, height: 20 }}
                                    />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={this.returnAccount} style={[styles.centerview, { borderTopColor: color.background, borderTopWidth: 1 }]}>
                                <View style={styles.imgview}>
                                    <Image
                                        source={require('../image/my/setting.png')}
                                        style={{ width: 20, height: 20 }}
                                    />
                                </View>
                                <View style={styles.username}>
                                    <Text style={styles.text2}>找回账号</Text>
                                </View>
                                <View style={styles.gtview}>
                                    <Image
                                        source={require('../image/my/gt.png')}
                                        style={{ width: 20, height: 20 }}
                                    />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={this.bindingPhone} style={[styles.centerview, { borderTopColor: color.background, borderTopWidth: 1 }]}>
                                <View style={styles.imgview}>
                                    <Image
                                        source={require('../image/my/phone.png')}
                                        style={{ width: 20, height: 20 }}
                                    />
                                </View>
                                <View style={styles.username}>
                                    <Text style={styles.text2}>解绑手机</Text>
                                </View>
                                <View style={styles.gtview}>
                                    <Image
                                        source={require('../image/my/gt.png')}
                                        style={{ width: 20, height: 20 }}
                                    />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={this.safeCode} style={[styles.centerview, { borderTopColor: color.background, borderTopWidth: 1 }]}>
                                <View style={styles.imgview}>
                                    <Image
                                        source={require('../image/my/yaoshi.png')}
                                        style={{ width: 20, height: 20 }}
                                    />
                                </View>
                                <View style={styles.username}>
                                    <Text style={styles.text2}>安全码设置</Text>
                                </View>
                                <View style={styles.gtview}>
                                    <Image
                                        source={require('../image/my/gt.png')}
                                        style={{ width: 20, height: 20 }}
                                    />
                                </View>
                            </TouchableOpacity>

                        </View>

                        <View style={{ width: Dimension.width, marginTop: 20 }}>
                            <TouchableOpacity onPress={this.designation} style={styles.centerview}>
                                <View style={styles.imgview}>
                                    <Image
                                        source={require('../image/my/kandian.png')}
                                        style={{ width: 20, height: 20 }}
                                    />
                                </View>
                                <View style={styles.username}>
                                    <Text style={styles.text2}>AV番号求片</Text>
                                </View>
                                <View style={styles.gtview}>
                                    <Image
                                        source={require('../image/my/gt.png')}
                                        style={{ width: 20, height: 20 }}
                                    />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={this.history} style={[styles.centerview, { borderTopColor: color.background, borderTopWidth: 1 }]}>
                                <View style={styles.imgview}>
                                    <Image
                                        source={require('../image/my/history.png')}
                                        style={{ width: 20, height: 20 }}
                                    />
                                </View>
                                <View style={styles.username}>
                                    <Text style={styles.text2}>播放历史</Text>
                                </View>
                                <View style={styles.gtview}>
                                    <Image
                                        source={require('../image/my/gt.png')}
                                        style={{ width: 20, height: 20 }}
                                    />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={this.download} style={[styles.centerview, { borderTopColor: color.background, borderTopWidth: 1 }]}>
                                <View style={styles.imgview}>
                                    <Image
                                        source={require('../image/my/donwload.png')}
                                        style={{ width: 23, height: 23 }}
                                    />
                                </View>
                                <View style={styles.username}>
                                    <Text style={styles.text2}>下载管理</Text>
                                </View>
                                <View style={styles.gtview}>
                                    <Image
                                        source={require('../image/my/gt.png')}
                                        style={{ width: 20, height: 20 }}
                                    />
                                </View>
                            </TouchableOpacity>

                            <View style={[styles.centerview, { borderTopColor: color.background, borderTopWidth: 1 }]}>
                                <View style={styles.imgview}>
                                    <Image
                                        source={require('../image/my/psd.png')}
                                        style={{ width: 20, height: 20 }}
                                    />
                                </View>
                                <View style={styles.username}>
                                    <Text style={styles.text2}>密码锁</Text>
                                </View>
                                <View style={[styles.gtview, { marginRight: 10 }]}>
                                    <Switch
                                        onValueChange={(value) => this.switch(value)}
                                        style={{ marginBottom: 10, marginTop: 10 }}
                                        value={this.state.falseSwitchIsOn}
                                        trackColor={color.saffron_yellow}
                                    />
                                </View>
                            </View>

                        </View>

                        <View style={{ width: Dimension.width, marginTop: 20 }}>
                            <TouchableOpacity onPress={this.inviteCode} style={styles.centerview}>
                                <View style={styles.imgview}>
                                    <Image
                                        source={require('../image/my/yaoqingma.png')}
                                        style={{ width: 20, height: 20 }}
                                    />
                                </View>
                                <View style={styles.username}>
                                    <Text style={styles.text2}>输入邀请码</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={this.CDkey} style={[styles.centerview, { borderTopColor: color.background, borderTopWidth: 1 }]}>
                                <View style={styles.imgview}>
                                    <Image
                                        source={require('../image/my/duihuanma.png')}
                                        style={{ width: 20, height: 20 }}
                                    />
                                </View>
                                <View style={[{ flexDirection: 'row', width: Dimension.width - 40, height: 40, alignItems: 'center' }]}>
                                    <Text style={styles.text2}>输入兑换码</Text>
                                    <View style={{ position: 'absolute', right: 10 }}>
                                        <Text style={{ color: color.saffron_yellow, fontSize: 12 }}>参与官方活动赢取会员福利</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>

                            <View style={[styles.centerview, { borderTopColor: color.background, borderTopWidth: 1 }]}>
                                <View style={styles.imgview}>
                                    <Image
                                        source={require('../image/my/kefu.png')}
                                        style={{ width: 23, height: 23 }}
                                    />
                                </View>
                                <View style={styles.username}>
                                    <Text style={styles.text2}>在线客服</Text>
                                </View>
                            </View>

                            <View style={[styles.centerview, { borderTopColor: color.background, borderTopWidth: 1, marginBottom: 20 }]}>
                                <View style={styles.imgview}>
                                    <Image
                                        source={require('../image/my/version.png')}
                                        style={{ width: 20, height: 20 }}
                                    />
                                </View>
                                <View style={styles.username}>
                                    <Text style={styles.text2}>当前版本:1.0.1</Text>
                                </View>
                            </View>

                        </View>
                    </View>
                </BaseView>
                <CDKeyModal isLoading={this.state.cdkeyLoading} onRequestClose={this.onRequestClose} />
                <InviteCodeModal isLoading={this.state.inviteCodeModal} onRequestClose={this.onRequestClose} />
            </ScrollView >
        );
    }
}

const styles = StyleSheet.create({
    gtview: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 0
    },
    imgview: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    centerview: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: color.white
    },
    emailstext: {
        fontSize: 14,
        color: '#515151'
    },
    emailsview: {
        flex: 1,
        paddingLeft: 10,
        justifyContent: 'center'
    },
    copyview: {
        width: 60,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    copytext: {
        fontSize: 14,
        color: color.saffron_yellow
    },
    emails: {
        width: Dimension.width,
        height: 40,
        backgroundColor: color.white,
        marginTop: 20,
        flexDirection: 'row'
    },
    type: {
        width: Dimension.width / 4,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'

    },
    text1: {
        fontSize: 14,
        color: color.white,
        marginTop: 10,
    },
    cishu: {
        fontSize: 16,
        color: color.white,
        marginTop: 10,
        marginRight: 10
    },
    header: {
        width: Dimension.width,
        height: 160,
        backgroundColor: color.saffron_yellow,
        borderBottomLeftRadius: 60,
        borderBottomRightRadius: 60,
        overflow: 'hidden',
        alignItems: 'center'
    },
    headers: {
        width: Dimension.width,
        height: 160,
        backgroundColor: color.white,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});
