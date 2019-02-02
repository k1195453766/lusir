/*
 * @Author: Wang Kai 
 * @Date: 2018-11-22 16:56:57 
 * @Last Modified by: Wang Kai
 * @Last Modified time: 2019-02-02 11:16:17
 */



import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import BaseView from '../../Component/BaseView';
import BaseComponent from '../../Component/BaseComponent';
import color from '../../Component/Color';
import Dimension from '../../Component/Dimension';
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class RePayMent extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            isRequest: false
        }
        this.tablist = ['最新', '内地', '热门', '港澳', '台湾']
    }

    onPressSearch = () => {
        this.props.navigation.navigate('SearchAV')
    }

    render() {
        return (
            <View style={styles.master}>
                <ScrollableTabView
                    style={{ width: Dimension.width - 40, }}
                    tabBarPosition='top'
                    initialPage={0}
                    tabBarBackgroundColor={'#fff'}
                    renderTabBar={() => <ScrollableTabBar />}
                    tabBarInactiveTextColor={'rgb(105,105,105)'}
                    tabBarActiveTextColor={color.saffron_yellow}
                    tabBarUnderlineStyle={{ backgroundColor: color.saffron_yellow, }}
                    tabBarTextStyle={styles.tabBarText}
                >
                    {
                        this.tablist.map((data, key) => {
                            return (
                                <Text tabLabel={data}>{data}</Text>
                            )
                        })
                    }

                </ScrollableTabView>
                <TouchableOpacity onPress={this.onPressSearch} style={{ width: 40, height: 50, position: 'absolute', right: 0, top: 0, justifyContent: 'center', alignItems: 'center', borderLeftColor: color.background, borderLeftWidth: 1, borderBottomColor: color.background, borderBottomWidth: 1 }}>
                    <Icon
                        name={'search'}
                        size={20}
                        color={'gray'}
                    />
                </TouchableOpacity>
                {/* <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={this.state.isRefreshing}
                  onRefresh={this.onRefresh.bind(this)}  //(()=>this.onRefresh)或者通过bind来绑定this引用来调用方法
                  progressBackgroundColor={color.statusBar}
                  tintColor={color.statusBar}
                  iostitle={this.state.isRefreshing ? '刷新中...' : '下拉刷新'}
                />
              }
            >
            </ScrollView> */}
            </View >
        );
    }
}

const styles = StyleSheet.create({
    tabBarText: {
        fontWeight: 'normal',
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    master: {
        flex: 1,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
