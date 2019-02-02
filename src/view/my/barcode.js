/*
 * @Author: {Wang Kai} 
 * @Date: 2019-01-23 15:36:45 
 * @Last Modified by: Wang Kai
 * @Last Modified time: 2019-01-23 18:06:56
 * @Describe 扫一扫 */


import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Alert,
} from 'react-native';
import Barcode from 'react-native-smart-barcode';
import color from '../../Component/Color';
import Dimension from '../../Component/Dimension';

export default class Barcodes extends React.PureComponent {
    //构造方法
    constructor(props) {
        super(props);
        this.state = {
            viewAppear: false,
        };
    }

    static navigationOptions = ({ navigation }) => {

        return {
            headerTitle: '扫码登录',
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

    componentDidMount() {
        //启动定时器
        this.timer = setTimeout(
            () => this.setState({ viewAppear: true }),
            250
        );
    }
    //组件销毁生命周期
    componentWillUnmount() {
        //清楚定时器
        this.timer && clearTimeout(this.timer);
    }

    _onBarCodeRead = (e) => {
        // console.log(`e.nativeEvent.data.type = ${e.nativeEvent.data.type}, e.nativeEvent.data.code = ${e.nativeEvent.data.code}`)
        this._stopScan();
        Alert.alert("二维码", e.nativeEvent.data.code, [
            { text: '确认', onPress: () => this._startScan() },
        ])
    };

    _startScan = (e) => {
        this._barCode.startScan()
    };

    _stopScan = (e) => {
        this._barCode.stopScan()
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.state.viewAppear ?
                    <Barcode style={{ flex: 1, }} ref={component => this._barCode = component}
                        onBarCodeRead={this._onBarCodeRead} />

                    : null
                }
                <View style={{ width: Dimension.width, height: 40, justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 30 }}>
                    <Text style={{ fontSize: 16, color: 'white' }}>将二维码放入框内,即可自动扫描</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});