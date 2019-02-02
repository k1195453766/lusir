import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    BackHandler,
    Platform,
    PixelRatio
} from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';

//展示的页面
import Home from './view/home/home';
import RePayMent from './view/repayment/repayment';
import My from './view/my/my';
import Tab from './tab';
import ViewPager from './viewpager';
import SearchAV from './view/home/searchav';
import Videos from './view/video/videos';
import Barcodes from './view/my/barcode';
import QRCodes from './view/my/qrcode';
import VIP from './view/my/vip';
import SafeCode from './view/my/safeCode';
import Reset from './view/my/reset';
import ChangeAccount from './view/my/changeAccount';
import ReturnAccount from './view/my/returnAccount';
import BindingPhone from './view/my/bindingPhone';
import Extension from './view/my/extension';
import Agent from './view/my/agent';
import Withdraw from './view/my/withdraw';
import IncomeDetails from './view/my/incomeDetails';
import WithdrawalsRecord from './view/my/withdrawalsRecord';
import History from './view/my/history';
import Designation from './view/my/designation';
import Download from './view/my/download';
import CodeLock from './view/my/codeLock';

var aaa = () => {
    storage.load({
        key: 'isSwitch',
    }).then(ret => {
        alert(ret)
        if (ret == null) {
            return false
        } else if (ret == false) {
            return false
            // this.setState({
            //     isSwitch: false
            // })
        } else {
            return true
            // this.setState({
            //     isSwitch: true
            // })
        }

    }).catch(err => {
        console.warn(err.message);
        switch (err.name) {
            case 'NotFoundError':
                // TODO;
                break;
            case 'ExpiredError':
                // TODO
                break;
        }
    })
}

var StackNavigates = createStackNavigator({
    Home: { screen: Home },
    RePayMent: { screen: RePayMent },
    Videos: {
        screen: Videos,
        navigationOptions: {
            header: null
        }
    },
    My: { screen: My },
    Tab: {
        screen: Tab,
        navigationOptions: {
            header: null
        }
    },
    SearchAV: { screen: SearchAV },
    Barcodes: { screen: Barcodes },
    QRCodes: { screen: QRCodes },
    VIP: { screen: VIP },
    SafeCode: { screen: SafeCode },
    Reset: { screen: Reset },
    ChangeAccount: { screen: ChangeAccount },
    ReturnAccount: { screen: ReturnAccount },
    BindingPhone: { screen: BindingPhone },
    Extension: { screen: Extension },
    Agent: { screen: Agent },
    Withdraw: { screen: Withdraw },
    IncomeDetails: { screen: IncomeDetails },
    WithdrawalsRecord: { screen: WithdrawalsRecord },
    History: { screen: History },
    Designation: { screen: Designation },
    Download: { screen: Download },
    CodeLock: { screen: CodeLock },
    ViewPager: { screen: ViewPager },
}, {
        initialRouteName: aaa ? 'ViewPager' : 'Tab',
    });

// class StackNavigate extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             isSwitch: false
//         }
//     }

//     componentWillMount() {
//         storage.load({
//             key: 'isSwitch',
//         }).then(ret => {
//             if (ret == null) {
//                 return false
//             } else if (ret == false) {
//                 this.setState({
//                     isSwitch: false
//                 })
//             } else {
//                 this.setState({
//                     isSwitch: true
//                 })
//             }

//         }).catch(err => {
//             console.warn(err.message);
//             switch (err.name) {
//                 case 'NotFoundError':
//                     // TODO;
//                     break;
//                 case 'ExpiredError':
//                     // TODO
//                     break;
//             }
//         })
//     };

//     //     componentWillUnmount() {
//     //         if (Platform.OS === 'android') {
//     //             BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
//     //         };
//     //     };

//     //     onBackAndroid = () => {
//     //         if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
//     //             //最近2秒内按过back键，可以退出应用。
//     //             return false;
//     //         }
//     //         this.lastBackPressed = Date.now();
//     //         Toast.show('再按一次退出应用');
//     //         return true;

//     //     };
//     render() {
//         return (
//             <StackNavigates isSwitch={this.state.isSwitch} />
//         )
//     }
// }

export default createAppContainer(StackNavigates);