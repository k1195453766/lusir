/**
 * 自定义button组件
 */

import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    PixelRatio,
} from 'react-native';
import Dimension from './Dimension';

export default class BottonUtils extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    };

    //使用时：enable是必须存在的
    static propTypes = {

    };
    //设置默认值
    static defaultProps = {
        title: '确定',
        activeOpacity: 0.5
    }

    botton = () => {
        this.props.onPress()
    }

    render() {
        return (

            <TouchableOpacity onPress={() => this.botton()} style={this.props.buttonStyle = undefined ? styles.button : this.props.buttonStyle} activeOpacity={this.props.activeOpacity == undefined ? defaultProps.activeOpacity : this.props.activeOpacity}>
                <Text style={{ color: 'white' }}>{this.props.title == undefined ? defaultProps.title : this.props.title}</Text>
            </TouchableOpacity>

        )
    }
}

let styles = StyleSheet.create({
    button: {
        height: 40,
        width: Dimension.width * 0.9,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EEB422',
        marginTop: 10
    }
})