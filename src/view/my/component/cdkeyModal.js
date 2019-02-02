/*
 * @Author: {Wang Kai} 
 * @Date: 2019-01-24 14:38:59 
 * @Last Modified by: Wang Kai
 * @Last Modified time: 2019-01-24 15:44:14
 * @Describe 兑换码Modal */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    Modal,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ActivityIndicator,
    PixelRatio,
    FlatList,
    TextInput
} from 'react-native';
import Dimension from '../../../Component/Dimension';
import color from '../../../Component/Color';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ToastShortBottom } from '../../../Component/Toast';

export default class CDKeyModal extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            cdkey: ''
        };
    }

    onRequestClose() {
        this.props.onRequestClose();
    }

    onPressClose = () => {
        this.props.onRequestClose();
    }

    onChangeText = (text) => {
        this.setState({
            cdkey: text
        })
    }

    onPressClose = () => {
        this.props.onRequestClose();
    }

    onPressMake = () => {
        ToastShortBottom('正在请求后台')
    }

    render() {
        let { isLoading } = this.props;
        return (
            <View style={styles.container}>
                {/* 初始化Modal */}
                <Modal
                    animationType='fade'            // 从底部划入
                    transparent={true}              // 透明
                    visible={isLoading}    // 根据isModal决定是否显示
                    onRequestClose={() => { this.onRequestClose() }}  // android必须实现  //android按物理按键时触发的函数
                >
                    <View style={styles.master}>
                        <View style={styles.header}>
                            <View style={{ borderBottomColor: 'gray', borderBottomWidth: 0.5, height: 40, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                <Text style={{ fontSize: 16, color: '#000' }}>输入兑换码</Text>
                                <TouchableOpacity onPress={this.onPressClose} style={{ position: 'absolute', right: 0, width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                                    <Icon
                                        name={'close'}
                                        size={20}
                                        color={'gray'}
                                    />
                                </TouchableOpacity>
                            </View>

                            <View>
                                <TextInput
                                    placeholder={'请输入兑换码,区分大小写'}
                                    onChangeText={(text) => { this.onChangeText }}
                                    style={{
                                        height: 40, borderColor: 'gray',
                                        borderWidth: 1,
                                        margin: 10,
                                        borderRadius: 5,
                                        padding: 10,
                                        alignItems: 'center'
                                    }}
                                />
                            </View>

                            <View style={{ height: 40, borderTopColor: 'gray', borderTopWidth: 0.5, flexDirection: 'row' }}>
                                <TouchableOpacity onPress={this.onPressClose} style={{ flex: 1, borderRightColor: 'gray', borderRightWidth: 0.5, justifyContent: 'center', alignItems: 'center' }} >
                                    <Text style={{ fontSize: 14, color: '#000' }}>取消</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.onPressMake} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 14, color: '#000' }}>确定</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        height: 140,
        width: Dimension.width * 0.8,
        backgroundColor: 'white',
        borderRadius: 6,
        overflow: 'hidden',
    },
    master: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(199,199,199,0.5)',
    },
})