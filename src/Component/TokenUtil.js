/**
 * 自定义button组件
 */

import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    TouchableOpacity,

} from 'react-native';
import color from './Color';


export default class TokenUtil extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            checked: false
        }
    };

    //使用时：enable是必须存在的
    static propTypes = {
    };
    //设置默认值
    static defaultProps = {
        title: '确定'
    }

    botton = () => {      
        //this.props.onPress(guiGeArr);//测试完放开
    }

    UNSAFE_componentWillMount() {
    }

    componentWillUpdate() {
    }

    render() {
        const { data,onPress } = this.props;
        return (

            <TouchableOpacity onPress={() => onPress&&onPress(data.id)} style={[styles.button, { backgroundColor: this.state.checked ? '#EEB422' : '#FFFFFF' }]} activeOpacity={1}>
                <Text style={{ color: color.saffron_yellow}} >{data.name == undefined ? defaultProps.title : data.name}</Text>
            </TouchableOpacity>

        )
    }
}

let styles = StyleSheet.create({
    button: {
        height: 30,
        borderWidth: 1,
        borderColor: color.saffron_yellow,
        borderRadius: 15,
        paddingLeft: 8,
        paddingRight: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        marginRight: 10,
        marginBottom: 10,
    }

})