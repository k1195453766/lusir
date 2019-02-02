/*
 * @Author: {Wang Kai} 
 * @Date: 2019-01-23 15:36:45 
 * @Last Modified by: Wang Kai
 * @Last Modified time: 2019-01-28 12:00:01
 * @Describe 收益明细 */


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

export default class IncomeDetails extends React.PureComponent {
    //构造方法
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            isLoadMore: false,
            details: []
        };
        this.page = 1;
    }

    static navigationOptions = ({ navigation }) => {

        return {
            headerTitle: '收益明细',
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

    _renderRow = ({ item }) => {
        return (
            <View style={{ width: Dimension.width, justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                <Image
                    source={require('../image/my/vip.jpg')}
                    style={{ width: Dimension.width * 0.8, height: 120 }}
                />
                <View style={{ width: Dimension.width, height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                    <Text style={{ color: color.saffron_yellow, fontSize: 24 }}>{item.cost}元</Text>
                    <TouchableOpacity onPress={this.onPressBuy} style={{ justifyContent: 'center', alignItems: 'center', width: 80, height: 36, backgroundColor: color.saffron_yellow, borderRadius: 6 }}>
                        <Text style={{ fontSize: 14, color: 'white' }}>立刻购买</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: Dimension.width * 0.8, height: 40, justifyContent: 'center', paddingLeft: 10 }}>
                    <Text style={{ color: color.saffron_yellow, fontSize: 12 }}>这个卡是{item.name}</Text>
                </View>
            </View>
        )
    }

    /**
     * 上拉加载更多
     */
    _onLoadMore = () => {
        this.page = this.page + 1;
    }

    _ListEmptyComponent = () => {
        return <View style={{ width: Dimension.width, height: 40, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 16, color: 'gray' }}>暂时还没有收益明细</Text>
        </View>
    }

    _keyExtractor = (item, index) => index.toString();

    _onRefresh = () => {
        this.setState({
            refreshing: true
        })
    }

    _onLoadMore = () => {
        this.setState({
            isLoadMore: true
        })
    }


    render() {
        return (
            <ScrollView>
                <View style={{ flex: 1, backgroundColor: color.white }}>

                    <FlatList
                        ref="_flatlist"
                        style={{ width: Dimension.width }}
                        data={this.state.details} //数据源
                        extraData={this.state.details}
                        renderItem={this._renderRow} //每一行render
                        ItemSeparatorComponent={() => { return (null) }} //分隔线
                        keyExtractor={this._keyExtractor}  //使用json中的title动态绑定key
                        ListEmptyComponent={this._ListEmptyComponent}
                        onRefresh={() => this._onRefresh()}
                        refreshing={this.state.refreshing}
                        //加载更多
                        onEndReached={() => this._onLoadMore()}
                        onEndReachedThreshold={0.2}
                    />

                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    indicator: {
        margin: 10
    },
    indicatorContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },

});