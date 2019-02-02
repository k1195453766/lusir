/*
 * @Author: Wang Kai 
 * @Date: 2018-11-22 16:56:57 
 * @Last Modified by: Wang Kai
 * @Last Modified time: 2019-01-22 16:50:50
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    FlatList,
    Image,
    ScrollView,
    RefreshControl,
    Button,
    TouchableOpacity,
    TextInput
} from 'react-native';
import BaseView from '../../Component/BaseView';
import BaseComponent from '../../Component/BaseComponent';
import color from '../../Component/Color';
import Dimension from '../../Component/Dimension';
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ToastShort } from '../../Component/Toast';
//import MyTabBar from '../../Component/MyTabBar';

const underlineWidth = 20;
const underlineLeft = (Dimensions.get('window').width / 6 - underlineWidth) / 2;

export default class SearchAV extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            isRequest: false,
            recommend: [{ 'id': 1 }, { 'id': 2 }, { 'id': 3 }],//热门推荐
            isRefreshing: false,
            search: '',
            isLoading: false,   //页面加载Loading
            isSearch: false,    //
            refreshing: false,  //下拉刷新
            queryList: [],
            transparent: false, //Loading是否透明  false：不透明 true：透明
        }
    }

    static navigationOptions = {
        header: null
    };

    componentDidMount() {
        this.timer = setTimeout(() => {
            this.setState({
                isLoading: false,
                isRefreshing: false,
                refreshing: false
            })
        }, 2000)
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    onPressSearch = () => {
        this.props.navigation.pop();
    }

    onChangeText = (text) => {
        this.setState({
            search: text
        })
    }

    onSearch = () => {
        this.refs.search.blur();
        if (this.state.search == '' || this.state.search.trim() == '') {
            ToastShort('请输入查询内容');
            return;
        }

        this.queryVedio();

        this.setState({
            isSearch: true,
            isLoading: true
        })
    }

    queryVedio = () => {
        this.timer = setTimeout(() => {
            this.setState({
                isLoading: false,
                isRefreshing: false,
            })
        }, 2000)
        // let url = ``;
        // fetch(url, {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/x-www-form-urlencoded'
        //     },
        //     credentials: "include",
        // }).then((response) => response.json())
        //     .then((result) => {
        //         if (result.error == false) {
        //             this.props.navigation.navigate('Pay', { paydata: result.msg, orderInfo: item.id }); //跳转支付页面
        //         } else {
        //             Toast.show(result.msg);
        //         }
        //     })
    }

    _ListEmptyComponent = () => {
        return (
            <View style={{ width: Dimension.width, alignItems: 'center' }}>
                <Text style={styles.text1}>{config.baseName}没有找到数据</Text>
                <Text style={styles.text2}>如果您知道番号,点击此处前往求片</Text>
            </View>
        )
    }

    _ItemSeparatorComponent = () => {
        return <View style={{ width: Dimension.width, height: 5, backgroundColor: color.background }}></ View>
    }

    //下拉刷新
    _onRefresh() {
        if (!this.state.refreshing) {
            this.setState({
                refreshing: true
            })
            this.queryVedio();
        }
    }

    _renderItem = () => {
        return (
            <View style={{ width: Dimension.width, alignItems: 'center' }}>
                <Text>12314123</Text>
            </View>
        )
    }

    onFocus = () => {
        this.setState({
            isSearch: false
        })
    }

    render() {
        return (
            <BaseView style={styles.master} isRequest={this.state.isLoading} transparent={this.state.transparent}>
                <View style={{ width: Dimension.width, height: 50, borderBottomColor: 'gray', borderBottomWidth: 0.5 }}>
                    <TextInput
                        ref='search'
                        style={styles.search}
                        placeholder="请输入查询内容"
                        keyboardType='default'
                        underlineColorAndroid="transparent"
                        secureTextEntry={false}
                        clearButtonMode='while-editing'
                        autoFocus={true}
                        onFocus={this.onFocus}
                        onChangeText={(text) => this.onChangeText(text)}
                    />
                </View>
                <TouchableOpacity onPress={this.onPressSearch} style={{ width: 40, height: 50, position: 'absolute', right: 0, top: 0, justifyContent: 'center', alignItems: 'center', borderLeftColor: color.background, borderLeftWidth: 1, borderBottomColor: 'gray', borderBottomWidth: 0.5 }}>
                    <Icon
                        name={'search'}
                        size={20}
                        color={color.saffron_yellow}
                    />
                </TouchableOpacity>
                {
                    this.state.isSearch == false ? (
                        <View style={{ flex: 1, backgroundColor: color.background, alignItems: 'center', padding: 20 }}>
                            <Text style={{ fontSize: 12, color: 'gray' }}>{config.baseName}帮你找片,可以按番号·视频名字·演员名字等来查询</Text>
                            <Text style={{ fontSize: 12, color: color.saffron_yellow, marginTop: 10 }}>点击右上角搜索图标离开搜索页</Text>

                            <TouchableOpacity onPress={this.onSearch} style={{ width: Dimension.width * 0.8, height: 40, backgroundColor: color.saffron_yellow, borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                                <Text style={styles.text_search}>点此处搜索</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                            <View style={{ flex: 1, backgroundColor: color.background }}>
                                <FlatList
                                    ref="_flatlist"
                                    onRefresh={() => this._onRefresh()}
                                    refreshing={this.state.refreshing}
                                    data={this.state.queryList}
                                    extraData={this.state.queryList}
                                    keyExtractor={this._keyExtractor}
                                    renderItem={this._renderItem}
                                    ListEmptyComponent={this._ListEmptyComponent}
                                    ItemSeparatorComponent={this._ItemSeparatorComponent}
                                    //加载更多
                                    onEndReached={() => this._onLoadMore()}
                                    onEndReachedThreshold={0.1}
                                />
                            </View>
                        )
                }




            </BaseView>
        );
    }
}

const styles = StyleSheet.create({
    text1: {
        fontSize: 14,
        color: '#000',
        marginTop: 20
    },
    text2: {
        fontSize: 14,
        color: color.saffron_yellow,
        fontWeight: 'bold',
        marginTop: 10,
    },
    text_search: {
        color: color.white,
        fontSize: 12
    },
    search: {
        width: Dimension.width - 40,
        height: 50,
        paddingLeft: 20,
    },
    master: {
        flex: 1,
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
