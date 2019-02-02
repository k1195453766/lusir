/*
 * @Author: {Wang Kai} 
 * @Date: 2019-01-23 15:36:45 
 * @Last Modified by: Wang Kai
 * @Last Modified time: 2019-02-01 17:13:02
 * @Describe 按番号求片 */

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
    SwipeableListView,
    TouchableHighlight
} from 'react-native';
import color from '../../Component/Color';
import Dimension from '../../Component/Dimension';
import { ToastShort } from '../../Component/Toast';
import RNFS from 'react-native-fs';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';

const CITY_NAMES = ['北京', '上海', '广州', '杭州', '苏州'];
export default class Download extends React.PureComponent {
    //构造方法
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            isLoadMore: false,
            filelist: [],
        };
        this.page = 1;
    }

    static navigationOptions = ({ navigation }) => {

        return {
            headerTitle: '下载管理',
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

        RNFS.readDir(RNFS.DocumentDirectoryPath).then((result) => {
            //RNFS.readFile(downloadDest)
            //.then((text) => {
            //read complete
            let list = [];
            result.forEach(i => {
                if (i.path.substr(i.path.length - 3) == 'mp4') {
                    list.push(i);
                }
            })
            this.setState({
                filelist: list
            })

        }).catch((reason) => {
            //Error: Invalid continuation byte
            ToastShort('加载失败,请稍后再试')
            console.log(reason);
        });

        // RNFS.readFile(path, 'utf8')
        //     .then((result) => {
        //         ToastShort('正确')
        //         console.log(result);

        //         this.setState({
        //             readTxtResult: result,
        //         })
        //     })
        //     .catch((err) => {
        //         ToastShort('错错了')
        //         console.log(err.message);
        //     });
    }

    getMoreList = () => {
        RNFS.readDir(RNFS.DocumentDirectoryPath).then((result) => {
            let list = [];
            result.forEach(i => {
                if (i.path.substr(i.path.length - 3) == 'mp4') {
                    list.push(i);
                }
            })
            this.setState({
                filelist: list,
                refreshing: false
            })

        }).catch((reason) => {
            //Error: Invalid continuation byte
            ToastShort('加载失败,请稍后再试')
            this.setState({
                refreshing: false
            })
        });

    };

    onPressItem = (item) => {
        this.props.navigation.navigate('Videos', { item: item });
    }

    setScrollEnabled = () => {

    }

    _renderRow = ({ item }) => {

        return (
            <SwipeRow
                rightOpenValue={-60}
                stopLeftSwipe={1}
                onRowPress={this.onPressItem}
                setScrollEnabled={this.setScrollEnabled}
            >
                <View style={styles.standaloneRowBack}>
                    <Text style={styles.backTextWhite}></Text>
                    <TouchableOpacity onPress={() => this.delete(item)} style={{ width: 60, height: 50, justifyContent: 'center', alignItems: 'center', position: 'absolute', right: 0 }} >
                        <Text style={styles.backTextWhite}>删除</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.standaloneRowFront}>
                    <Text>{item.name}</Text>
                </View>
            </SwipeRow>
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
            <Text style={{ fontSize: 16, color: 'gray' }}>暂时还没有下载记录</Text>
        </View>
    }

    _keyExtractor = (item, index) => index.toString();

    _onRefresh = () => {
        this.setState({
            refreshing: true
        })

        this.getMoreList();
    }

    _onLoadMore = () => {
        this.setState({
            isLoadMore: true
        })
    }

    getQuickActions = () => {
        return <View style={styles.quickAContent}>
            <TouchableHighlight
                onPress={() => alert("确认删除？")}
            >
                <View style={styles.quick}>
                    <Text style={styles.delete}>删除</Text>
                </View>
            </TouchableHighlight>
        </View>
    };

    delete = (item) => {
        RNFS.unlink(item.path)
            .then(() => {
                this.getMoreList();
            })
            // `unlink` will throw an error, if the item to unlink does not exist
            .catch((err) => {
                ToastShort(err.message)
            });
    }

    itemSeparatorComponent = () => {
        return <View style={{ height: 0.5, backgroundColor: 'gray' }} />;
    }

    render() {
        return (
            <ScrollView>
                <View style={{ flex: 1, backgroundColor: color.background }}>
                    <FlatList
                        ref="_flatlist"
                        style={{ width: Dimension.width }}
                        data={this.state.filelist} //数据源
                        extraData={this.state.filelist}
                        renderItem={this._renderRow} //每一行render
                        ItemSeparatorComponent={this.itemSeparatorComponent} //分隔线
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
    standaloneRowFront: {
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center',
        height: 50,
    },
    standaloneRowBack: {
        alignItems: 'center',
        backgroundColor: color.background,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75
    },
    backRightBtnLeft: {
        backgroundColor: 'blue',
        right: 75
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0
    },
    backTextWhite: {
        color: color.saffron_yellow
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    quick: {
        backgroundColor: "#ff1d49",
        flex: 1,
        alignItems: 'flex-end',//水平靠右
        justifyContent: 'center',//上下居中
        width: 100,
        borderRadius: 5,
        elevation: 5,//漂浮的效果

    },
    delete: {
        color: "#d8fffa",
        marginRight: 30
    },
    //侧滑菜单的样式
    quickAContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: 15,
        marginBottom: 10,
    },
    indicator: {
        margin: 10
    },
    indicatorContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },

});