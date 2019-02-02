/*
 * @Author: {Wang Kai} 
 * @Date: 2019-01-23 15:36:45 
 * @Last Modified by: Wang Kai
 * @Last Modified time: 2019-01-25 17:10:19
 * @Describe 安全码设置 */


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

export default class SatfeCode extends React.PureComponent {
    //构造方法
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    static navigationOptions = ({ navigation }) => {

        reset = () => {
            navigation.navigate('Reset')
        }

        return {
            headerTitle: '安全码设置',
            //导航栏的title的style
            headerTitleStyle: {
                color: color.white,
                //居中显示
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 16,
            },
            headerRight: <TouchableOpacity onPress={this.reset} style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'white' }}>重置</Text>
            </TouchableOpacity>,
            //是否允许右滑返回，在iOS上默认为true，在Android上默认为false
            gesturesEnabled: true,
            headerStyle: { backgroundColor: color.saffron_yellow, height: 40 },
        };
    }

    UNSAFE_componentWillMount() {

    }

    setSafeCode = (text) => {
        this.setState({
            safecode: text
        })
    }

    //提交
    submit = () => {
        Alert.alert(
            '提示',
            '请妥善管理你的安全码,不要泄露给他人,确认设置?',
            [
                { text: '取消', onPress: () => { } },
                { text: '确定', onPress: () => { } },
            ],
            { cancelable: false }
        )
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: color.background }}>
                <TextInput style={styles.safecode}
                    placeholder="请输入安全码,由6-16数字组成"
                    keyboardType='default'// 默认键盘类型
                    underlineColorAndroid="transparent"
                    clearButtonMode='while-editing'
                    selectionColor='#EEB422'
                    onChangeText={(text) => this.setSafeCode(text)}
                />

                <View style={{ width: Dimension.width, marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={this.submit} style={{ width: Dimension.width * 0.8, height: 40, backgroundColor: color.saffron_yellow, justifyContent: 'center', alignItems: 'center', borderRadius: 6 }}>
                        <Text style={{ fontSize: 14, color: 'white' }}>提交</Text>
                    </TouchableOpacity>

                    <View style={{ marginTop: 10, width: Dimension.width * 0.8 }}>
                        <Text style={{ fontSize: 10, color: 'red' }}>#安全码用途:提现时需要输入安全码才能完成操作,所以请妥善保管也不要泄露给其他人</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    safecode: {
        width: Dimension.width,
        height: 40,
        paddingLeft: 10,
        backgroundColor: 'white'
    }

});