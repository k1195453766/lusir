import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Image,
    Button,
    ToastAndroid,
    BackHandler,
    Platform,
    InteractionManager,
    StatusBar
} from 'react-native';

import { StackActions, NavigationActions } from 'react-navigation';

import {
    IndicatorViewPager,
    PagerTitleIndicator,
    PagerDotIndicator
} from 'rn-viewpager';//引入必要依赖组件，其余组件自行引入

//import * as WeChat from 'react-native-wechat';

var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;
var { height, width } = Dimensions.get('window');

var Geolocation = require('Geolocation');
import config from './Component/Config';
import Dimension from './Component/Dimension';
import ClearLocak from './clearLock';

export default class ViewPager extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            time: 3,
            viewImag: null,
            isSwitch: false,
            inputPwd: "",
            imputPwd2: '',
            msg: "请输入密码",
            msgs: '',
            code: false,
            lock: '',
        }

        var timer = null;
    };

    static navigationOptions = {
        header: null
    };

    //获取首页数据

    //InteractionManager.runAfterInteractions(() => {})


    UNSAFE_componentWillMount() {
        storage.load({
            key: 'lock',
        }).then(ret => {
            if (ret == null) {
                this.setState({
                    lock: ''
                });
            }
            this.setState({
                lock: ret
            });
            if (ret.length == 0) {
                this.runTime();
            }
        }).catch(err => {
            console.warn(err.message);
            this.runTime();
        })
    }

    runTime = () => {
        this.timer = setInterval(() => {
            // this.props.navigation.navigate('Login');//3秒后进入底部导航主页
            var times = this.state.time;
            if (times == 0) {
                this.timer && clearInterval(this.timer);
                // 重置路由
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'Tab' })
                    ]
                });
                this.props.navigation.dispatch(resetAction);
                //this.props.navigation.navigate('Tab');//3秒后进入底部导航主页
            } else {
                this.setState({
                    time: times - 1,
                })
            }
        }, 1000)
    }




    componentDidMount() {
        //建议在应用启动时初始化，初始化之前无法使用此模块的其他方法。WeChat模块只需要初始化一次。
        // wechat.registerApp('wxb2d376855d7af78e')
        // try {
        //     WeChat.registerApp('wxb2d376855d7af78e');//从微信开放平台申请
        // } catch (e) {
        //     console.error(e);
        // }
    };

    componentWillUnmount() {
        this.timer && clearInterval(this.timer);
        this.timer2 && clearTimeout(this.timer2);
        // if (Platform.OS === 'android') {
        //     BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
        // };
    };

    // onBackAndroid = () => {
    //     if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
    //         //最近2秒内按过back键，可以退出应用。
    //         return false;
    //     }
    //     this.lastBackPressed = Date.now();
    //     Toast.show('再按一次退出应用');
    //     return true;
    // };

    //点击‘开启应用’ 跳过引导页
    onPress = () => {
        this.timer && clearInterval(this.timer);
        // 重置路由
        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({
                    routeName: 'Tab'
                })
            ]
        });
        this.props.navigation.dispatch(resetAction);
    }

    //刷新密码状态
    renderPwd() {
        var vi = [];
        var inputPwd = this.state.inputPwd;
        for (var i = 0; i < 6; i++) {
            if (i <= inputPwd.length - 1) {
                vi.push(<View key={i} style={styles.blackPoint}></View>);
            } else {
                vi.push(<View key={i} style={styles.whitePoint}></View>);
            }
        }
        return vi;
    }

    // renderView() {
    //     if (this.state.locked) {
    //         return (
    //             <TouchableOpacity onPress={() => this.showPwdView()}>
    //                 <Text style={{ fontSize: 20 }}>点击解锁</Text>
    //             </TouchableOpacity>
    //         );
    //     } else {
    //         return (
    //             <Text style={{ fontSize: 20 }}>已解锁</Text>
    //         );
    //     }
    // }

    pressNum(num) {
        var pwd = this.state.inputPwd;
        this.setState({
            inputPwd: pwd + "" + num,
        });
        this.renderPwd();
        setTimeout(() => {
            var inputPwd = this.state.inputPwd;
            if (pwd.length == 5) {
                if (this.state.lock == inputPwd) {
                    const resetAction = StackActions.reset({
                        index: 0,
                        actions: [
                            NavigationActions.navigate({ routeName: 'Tab' })
                        ]
                    });
                    this.props.navigation.dispatch(resetAction);
                } else {
                    this.setState({
                        msg: '密码不正确'
                    })

                    this.timer2 = setTimeout(() => {
                        this.setState({
                            msg: '请再次输入密码',
                            inputPwd: ''
                        });
                    }, 1000);
                }
            }
        }, 10);
    }

    deleteNum() {
        var pwd = this.state.inputPwd;
        pwd = pwd.substring(0, pwd.length - 1);
        this.setState({
            inputPwd: pwd,
        });
        this.renderPwd();
    }

    cancel() {
        //this.props.navigation.pop();
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.lock.length > 0 ? (
                        <View style={{ width: '100%', height: '100%' }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2A3740', paddingLeft: 30, paddingRight: 30 }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                                    <Text style={{ fontSize: 16, color: '#fff' }}>{this.state.msg}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 60 }}>
                                    {this.renderPwd()}
                                </View>
                                <View style={{ width: width - 60, }}>
                                    <View style={styles.row}>
                                        <NumComp num="1" pressNum={() => this.pressNum(1)} />
                                        <NumComp num="2" pressNum={() => this.pressNum(2)} />
                                        <NumComp num="3" pressNum={() => this.pressNum(3)} />
                                    </View>
                                    <View style={styles.row}>
                                        <NumComp num="4" pressNum={() => this.pressNum(4)} />
                                        <NumComp num="5" pressNum={() => this.pressNum(5)} />
                                        <NumComp num="6" pressNum={() => this.pressNum(6)} />
                                    </View>
                                    <View style={styles.row}>
                                        <NumComp num="7" pressNum={() => this.pressNum(7)} />
                                        <NumComp num="8" pressNum={() => this.pressNum(8)} />
                                        <NumComp num="9" pressNum={() => this.pressNum(9)} />
                                    </View>
                                    <View style={styles.row}>
                                        <NumComp num="取消" textStyle={{ fontSize: 16 }} style={{ borderWidth: 0 }} pressNum={() => this.cancel()} />
                                        <NumComp num="0" pressNum={() => this.pressNum(0)} />
                                        <NumComp num="删除" textStyle={{ fontSize: 16 }} style={{ borderWidth: 0 }} pressNum={() => this.deleteNum()} />
                                    </View>
                                </View>
                            </View>
                        </View>
                    ) : (
                            <View style={styles.container}>
                                <View style={styles.buttontop}>
                                    <TouchableOpacity style={{ padding: 10 }} activeOpacity={1}>
                                        <Text style={{ color: '#ffffff', fontSize: 15 }}>跳过{this.state.time}</Text>
                                    </TouchableOpacity>
                                </View>
                                <IndicatorViewPager
                                    style={{ flex: 1 }}//必须
                                >
                                    <View>
                                        {this.state.viewImag == null ? (
                                            <Image source={require('./view/image/home/firstimg.png')} style={styles.page} />
                                        ) : (
                                                <Image source={require('./view/image/home/firstimg.png')} style={styles.page} />
                                            )}
                                        <View style={styles.bottomView}>
                                            <View style={styles.button}>
                                                <Button title="开启应用" theme={'dark'} raised={true} onPress={() => this.onPress()} />
                                            </View>
                                            {/* <BottonUtils activeOpacity={1} buttonStyle={styles.buttonStyle} onPress={() => this.onPress()} title={"开启应用"} />*/}
                                        </View>
                                    </View>
                                </IndicatorViewPager>

                            </View >
                        )
                }
            </View>
        )
    }
}

class NumComp extends React.Component {
    render() {
        return (
            <View style={[styles.gridView,]}>
                <TouchableOpacity activeOpacity={0.1} onPress={this.props.pressNum}>
                    <View style={[styles.cycle, this.props.style]}>
                        <Text style={[styles.numText, this.props.textStyle]}>{this.props.num}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

//样式
var styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        height: 60,
        marginTop: 10,
        marginBottom: 10,
    },
    whitePoint: {
        width: 10,
        height: 10,
        borderRadius: 5,
        borderColor: '#fff',
        borderWidth: 1,
        margin: 5,
    },
    blackPoint: {
        width: 10,
        height: 10,
        borderRadius: 5,
        borderColor: '#fff',
        borderWidth: 1,
        margin: 5,
        backgroundColor: 'white',
    },
    gridView: {
        flex: 1,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cycle: {
        height: 60,
        width: 60,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 30,
        borderColor: '#fff',
        borderWidth: StyleSheet.hairlineWidth,
        backgroundColor: '#2A3740',
        justifyContent: 'center',
        alignItems: 'center',
    },
    numText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
    },
    page: {
        flex: 1,
        width: deviceWidth,
        height: deviceHeight
    },
    button: {
        flexDirection: 'row',
        width: 200,
        height: 40
    },
    buttontop: {
        position: 'absolute',
        top: -1,
        right: -1,
        zIndex: 255
    },
    bottomView: {
        width: Dimension.width,
        height: 40,
        position: 'absolute',
        bottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonStyle: {
        width: 150,
        height: 40,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    }
});