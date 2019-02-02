/*
 * @Author: {Wang Kai} 
 * @Date: 2019-01-23 15:36:45 
 * @Last Modified by: Wang Kai
 * @Last Modified time: 2019-01-26 16:50:04
 * @Describe 分享推广 */


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
    TextInput,
    ImageBackground,
    Share
} from 'react-native';
import color from '../../Component/Color';
import Dimension from '../../Component/Dimension';
import { ToastShort } from '../../Component/Toast';
import QRCode from 'react-native-qrcode';

export default class Extension extends React.PureComponent {
    //构造方法
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            code: '',
            invit: 'zkzi'
        };
    }

    static navigationOptions = ({ navigation }) => {

        return {
            headerTitle: '分享推广',
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

    toshare = async () => {
        try {
            const result = await Share.share({
                message:
                    'React Native | A framework for building native apps using React',
            })

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    }


    render() {
        return (
            <ImageBackground
                source={require('../image/my/background.jpg')}
                style={{ flex: 1 }}
            >
                <ScrollView>
                    <View style={{ width: Dimension.width, height: Dimension.height, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, color: 'white', marginTop: 20 }}>开启快乐之旅</Text>

                        <View style={{ width: 160, height: 160, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', marginTop: 10, borderRadius: 6 }}>
                            <QRCode
                                value={this.state.invit}
                                size={140}
                                bgColor='#000'
                                fgColor='white' />
                        </View>

                        <Text style={{ fontSize: 14, color: 'white', marginTop: 15 }}>我的邀请码:zkzi</Text>
                        <Text style={{ fontSize: 14, color: 'white', marginTop: 10 }}>截图分享二维码或者点击分享推广链接发送给好友</Text>
                        <Text style={{ fontSize: 14, color: 'white', padding: 10 }}>好友（新用户）下载成功即可增加你的每日看片次数,好友充值你还能获得充值返利</Text>

                        <TouchableOpacity onPress={this.toshare} style={{ width: 100, height: 36, justifyContent: 'center', alignItems: 'center', backgroundColor: color.saffron_yellow, marginTop: 15, borderRadius: 6 }}>
                            <Text style={{ fontSize: 14, color: 'white' }}>分享推广链接</Text>
                        </TouchableOpacity>

                        <Text style={{ fontSize: 14, color: 'white', marginTop: 10 }}>====友情提示====</Text>
                        <View style={{ width: Dimension.width * 0.7, }}>
                            <Text style={{ fontSize: 12, color: 'white', marginTop: 10 }}>1.请妥善保管自己的账号和推广码</Text>
                            <Text style={{ fontSize: 12, color: 'white', marginTop: 10 }}>2.若出现好友下载成功后,推广次数未增加的情况,请让好友在‘我的’界面通过输入您的邀请码来建立邀请关系</Text>
                        </View>

                        <Text style={{ fontSize: 14, color: 'white', marginTop: 10 }}>====推广福利====</Text>
                        <View style={{ width: Dimension.width * 0.7, }}>
                            <Text style={{ fontSize: 12, color: 'white', marginTop: 10 }}>1.推广成功1人,每天有3次看片次数</Text>
                            <Text style={{ fontSize: 12, color: 'white', marginTop: 10 }}>2.推广成功3人,每天有10次看片机会</Text>
                            <Text style={{ fontSize: 12, color: 'white', marginTop: 10 }}>3.推广成功10人,没看都可以无限次观看</Text>
                        </View>
                    </View>

                </ScrollView>
            </ImageBackground>




        )
    }
}

const styles = StyleSheet.create({


});