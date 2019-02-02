
/*
 * @Author: {Wang Kai} 
 * @Date: 2019-01-23 15:36:45 
 * @Last Modified by: Wang Kai
 * @Last Modified time: 2019-01-30 12:10:08
 * @Describe 密码锁 */

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
    TouchableOpacity
} from 'react-native';
import color from '../../Component/Color';
import Dimension from '../../Component/Dimension';
import { ToastShort } from '../../Component/Toast';
export default class NumComp extends React.Component {
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
