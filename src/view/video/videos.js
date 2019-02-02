/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Alert,
    AppRegistry,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    Dimensions,
    Slider,
    StatusBar,
    ScrollView,
    Animated,
    FlatList
} from 'react-native';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation';
import color from '../../Component/Color';
import Model from "./component/model";
import StarList from "./component/starList";
import ListItem from './component/listItem';
import RNFS from 'react-native-fs';
import { ToastShort } from '../../Component/Toast';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class Videos extends React.PureComponent {

    constructor(props) {
        super(props);
        this.player = null
        this.state = {
            rate: 1,
            volume: 1,
            muted: false,
            resizeMode: 'contain',
            duration: 0.0,
            slideValue: 0.00,
            currentTime: 0,
            controls: false,
            paused: false,//控制播放器是否暂停。
            ignoreSilentSwitch: null,
            isBuffering: false,
            flag: true,//是否全面屏，
            switch: true,
            popup: false,
            bounceValue: new Animated.Value(0),
            data: [{ id: 0, type: 0 }, { id: 1, type: 1, permissions: 1 }, { id: 2, type: 1, permissions: 2 }, { id: 3, type: 1 }],
            progressNum: 0,
            isSound: false


        };
        this.onLoad = this.onLoad.bind(this);
        this.onProgress = this.onProgress.bind(this);
        this.onBuffer = this.onBuffer.bind(this);


    }

    componentWillMount() {
        const init = Orientation.getInitialOrientation();
        this.setState({
            init,
            orientation: init,
            specificOrientation: init,
        });

        this.timer = setTimeout(() => {
            this.setState({
                switch: !this.state.switch
            });
            this.timer && clearTimeout(this.timer);
        }, 5000);



    }

    componentDidMount() {

        Orientation.addOrientationListener(this._updateOrientation);
        Orientation.addSpecificOrientationListener(this._updateSpecificOrientation);


        this.state.bounceValue.setValue(1.5);
        //可选的动画类型有三种：spring,decay,timing;
        Animated.spring(
            this.state.bounceValue,
            //将bounceValue的值动画化，是一个持续变化的过程         
            {
                toValue: 0.8,
                friction: 1,
            }
        ).start();
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
        Orientation.removeOrientationListener(this._updateOrientation);
        Orientation.removeSpecificOrientationListener(this._updateSpecificOrientation);
    }

    _getOrientation() {
        Orientation.getOrientation((err, orientation) => {
            Alert.alert(`Orientation is ${orientation}`);
        });
    }

    _getSpecificOrientation() {
        Orientation.getSpecificOrientation((err, orientation) => {
            Alert.alert(`Specific orientation is ${orientation}`);
        });
    }

    _updateOrientation = (orientation) => this.setState({ orientation });
    _updateSpecificOrientation = (specificOrientation) => this.setState({ specificOrientation });

    //以上为横向
    onEnd(data) {
        this.player.seek(0)
    }

    onLoad(data) {
        //console.log('打印视频长度');
        //console.log(data);
        //视频总长度
        this.setState({ duration: data.duration });
    }

    onProgress(data) {
        //console.log('播放进度');
        //console.log(data);

        if (this.state.currentTime) {

        }
        //播放进度
        this.setState({ currentTime: data.currentTime });
    }

    onBuffer = ({ isBuffering }) => {
        this.setState({ isBuffering });
    }

    getCurrentTimePercentage() {
        if (this.state.currentTime > 0) {
            return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
        } else {
            return 0;
        }
    }

    /**
     * 切换播放，展厅功能
     */
    switch = () => {

        this.setState({
            switch: !this.state.switch
        });

        this.timer = setTimeout(() => {
            this.setState({
                switch: !this.state.switch
            });
            this.timer && clearTimeout(this.timer);
        }, 5000);

    }

    onValueChange = (value) => {
        this.timer && clearTimeout(this.timer);
        this.setState({
            currentTime: value,
            switch: true
        })

    }

    onSlidingComplete = (value) => {
        this.player.seek(value);
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.setState({
                switch: !this.state.switch
            });
            this.timer && clearTimeout(this.timer);
        }, 5000);
    }

    /**
    * 不够位数补0
    */
    PrefixZero = (num, n) => {
        return (Array(n).join(0) + num).slice(-n);
    }

    /**
     * 将数字换成时分秒
     */
    formatSeconds = (value) => {
        var secondTime = parseInt(value);// 秒
        var minuteTime = 0;// 分
        var hourTime = 0;// 小时
        if (secondTime > 59) {//如果秒数大于60，将秒数转换成整数
            //获取分钟，除以60取整数，得到整数分钟
            minuteTime = parseInt(secondTime / 60);
            //获取秒数，秒数取佘，得到整数秒数
            secondTime = parseInt(secondTime % 60);
            //如果分钟大于60，将分钟转换成小时
            if (minuteTime > 59) {
                //获取小时，获取分钟除以60，得到整数小时
                hourTime = parseInt(minuteTime / 60);
                //获取小时后取佘的分，获取分钟除以60取佘的分
                minuteTime = parseInt(minuteTime % 60);
            }
        }

        //( "0000000000000000" + num ).substr( -length );
        var result = "00:00:" + ("0000000000000000" + parseInt(secondTime)).substr(-2);

        if (minuteTime > 0) {
            result = "00:" + ("0000000000000000" + parseInt(minuteTime)).substr(-2) + ":" + ("0000000000000000" + parseInt(secondTime)).substr(-2);
        }
        if (hourTime > 0) {
            result = ("0000000000000000" + parseInt(hourTime)).substr(-2) + ":" + ("0000000000000000" + parseInt(minuteTime)).substr(-2) + ":" + ("0000000000000000" + parseInt(secondTime)).substr(-2);
        }
        return result;
    }




    controlModel = (beSure, data) => {
        this.setState({
            popup: false
        });
    }


    onPress = (id) => {
        //alert(id);
        //this.props.navigation.navigate('Videos');
    }

    renderItem = ({ item }) => {

        return (
            <ListItem
                data={item}
                onPress={this.onPress}
            />
        );
    }
    // 下载视频
    download = () => {
        ToastShort('点击了下载')
        // 视频
        const downloadDest = `${RNFS.DocumentDirectoryPath}/${((Math.random() * 1000) | 0)}.mp4`;
        const formUrl = 'https://gslb.miaopai.com/stream/9Q5ADAp2v5NHtQIeQT7t461VkNPxvC2T.mp4?vend=miaopai&';

        const options = {
            fromUrl: formUrl,
            toFile: downloadDest,
            background: true,
            begin: (res) => {
                console.log('begin', res);
                console.log('contentLength:', res.contentLength / 1024 / 1024, 'M');
            },
            progress: (res) => {

                let pro = res.bytesWritten / res.contentLength;
                console.log(pro)
                this.setState({
                    progressNum: pro,
                });
            }
        };

        try {
            const ret = RNFS.downloadFile(options);
            ret.promise.then(res => {
                console.log('file://' + downloadDest)
                console.log(res)


                if (res.statusCode === 200) {
                    alert('下载完成,请前往下载管理查看');
                } else {
                    alert('下载失败');
                    //download failed
                }

            }).catch(err => {
                console.log('err', err);
            });
        }
        catch (e) {
            console.log(error);
        }
    }

    isQuanPing = () => {
        if (this.state.flag) {
            this.setState({
                flag: false
            });
            Orientation.lockToLandscapeRight()
        } else if (!this.state.flag) {
            this.setState({
                flag: true
            });
            Orientation.lockToPortrait()
        }
    }

    onPressSound = () => {
        this.setState({
            muted: !this.state.muted
        })
    }

    renderNativeSkin() {
        let { item } = this.props.navigation.state.params;
        const videoStyle = styles.fullScreen;
        const { init, orientation, specificOrientation } = this.state;
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor='#F683A2'
                    barStyle="light-content"//白色文字   
                />
                <View>
                    <TouchableOpacity
                        activeOpacity={1}
                        //onPress={() => { this.setState({ paused: !this.state.paused }) }}
                        onPress={this.switch}

                        style={{ width: '100%', height: this.state.flag ? 210 : '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
                        {
                            this.state.switch ?
                                (
                                    <View style={styles.set}>
                                        <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.goBack()}>
                                            <Image source={require('../../images/video/back.png')} style={{ width: 25, height: 25, marginRight: 10 }} />
                                        </TouchableOpacity>
                                        <View style={styles.setRight}>
                                            <TouchableOpacity onPress={this.download} style={styles.square}>
                                                <Image source={require('../../images/video/download.png')} style={{ width: 15, height: 15 }} />
                                            </TouchableOpacity>
                                            <TouchableOpacity activeOpacity={1} onPress={() => this.setState({ popup: true })}>
                                                <View style={styles.square}>
                                                    <Image source={require('../../images/video/set.png')} style={{ width: 20, height: 20 }} />
                                                </View>
                                            </TouchableOpacity>

                                        </View>
                                    </View>

                                ) : (
                                    null
                                )
                        }
                        {
                            this.state.switch ?
                                (
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: 80, height: 50 }}>
                                        <TouchableOpacity style={{ transform: [{ rotateZ: '180deg' }] }} activeOpacity={1} onPress={() => this.setState({ paused: !this.state.paused })}>
                                            <Image source={require('../../images/video/sanjiao3.png')} style={styles.next} />
                                            <Image source={require('../../images/video/sanjiao3.png')} style={[styles.next, { position: 'absolute', left: 8, top: 0 }]} />
                                        </TouchableOpacity>
                                        <TouchableOpacity activeOpacity={1} onPress={() => this.setState({ paused: !this.state.paused })}>
                                            {
                                                this.state.paused ? (
                                                    <Image source={require('../image/video/sanjiaoyou.png')} style={{ width: 35, height: 35 }} />
                                                ) : (
                                                        <Image source={require('../image/video/start.png')} style={{ width: 35, height: 35 }} />
                                                    )
                                            }

                                        </TouchableOpacity>
                                        <TouchableOpacity activeOpacity={1} onPress={() => this.setState({ paused: !this.state.paused })}>
                                            <Image source={require('../../images/video/sanjiao3.png')} style={styles.next} />
                                            <Image source={require('../../images/video/sanjiao3.png')} style={[styles.next, { position: 'absolute', left: 8, top: 0 }]} />
                                        </TouchableOpacity>
                                    </View>
                                ) : (
                                    null
                                )
                        }
                        {
                            item == null ? (
                                <Video
                                    ref={ref => this.player = ref}
                                    //source={{ uri: `file://${item.path}` }}//加载本地//我用的是本地视频
                                    source={{ uri: 'http://vdse.bdstatic.com//0ce574b077682f7525f666fd9700f088?authorization=bce-auth-v1/fb297a5cc0fb434c971b8fa103e8dd7b/2017-05-11T09:02:31Z/-1//d2ed31351b2f374a92f888d18bfeaf7e7ad7594a2dc2a1e18ca5f91384a20a22' }}//加载网络
                                    style={!this.state.flag ? styles.fullScreen : styles.fullScreen2}
                                    //style={styles.fullScreen}
                                    rate={this.state.rate}//rate 播放速率  快 慢  正常
                                    paused={this.state.paused} //控制播放器是否暂停。
                                    volume={this.state.volume}//调整音量
                                    muted={this.state.muted}//控制音频是否静音。muted :柔和的
                                    ignoreSilentSwitch={this.state.ignoreSilentSwitch}
                                    //resizeMode={this.state.resizeMode}//视频尺寸设置
                                    resizeMode="contain"//确定当帧与原始视频尺寸不匹配时如何调整视频大小。
                                    onLoad={this.onLoad}//当视频加载完的回调
                                    onBuffer={this.onBuffer}// 远程视频缓冲时的回调
                                    onProgress={this.onProgress}
                                    onEnd={(data) => this.onEnd(data)}// 播放完成后的回调
                                    repeat={false}//确定在到达结尾时是否重复播放视频。
                                    controls={this.state.controls}
                                />
                            ) : (
                                    <Video
                                        ref={ref => this.player = ref}
                                        source={{ uri: `file://${item.path}` }}//加载本地//我用的是本地视频
                                        //source={{ uri: 'http://vdse.bdstatic.com//0ce574b077682f7525f666fd9700f088?authorization=bce-auth-v1/fb297a5cc0fb434c971b8fa103e8dd7b/2017-05-11T09:02:31Z/-1//d2ed31351b2f374a92f888d18bfeaf7e7ad7594a2dc2a1e18ca5f91384a20a22' }}//加载网络
                                        style={!this.state.flag ? styles.fullScreen : styles.fullScreen2}
                                        //style={styles.fullScreen}
                                        rate={this.state.rate}//rate 播放速率  快 慢  正常
                                        paused={this.state.paused} //控制播放器是否暂停。
                                        volume={this.state.volume}//调整音量
                                        muted={this.state.muted}//控制音频是否静音。muted :柔和的
                                        ignoreSilentSwitch={this.state.ignoreSilentSwitch}
                                        //resizeMode={this.state.resizeMode}//视频尺寸设置
                                        resizeMode="contain"//确定当帧与原始视频尺寸不匹配时如何调整视频大小。
                                        onLoad={this.onLoad}//当视频加载完的回调
                                        onBuffer={this.onBuffer}// 远程视频缓冲时的回调
                                        onProgress={this.onProgress}
                                        onEnd={(data) => this.onEnd(data)}// 播放完成后的回调
                                        repeat={false}//确定在到达结尾时是否重复播放视频。
                                        controls={this.state.controls}
                                    />
                                )
                        }

                        {
                            this.state.switch ?
                                (
                                    <View style={{ width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.6)', height: 40, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingLeft: width * 0.05, paddingRight: width * 0.05, position: 'absolute', bottom: 0, left: 0 }}>
                                        <View>
                                            <Text style={{ color: '#FFFFFF', fontSize: 10 }}>{this.formatSeconds((this.state.currentTime / 2).toFixed(0))}</Text>
                                        </View>
                                        <Slider
                                            style={styles.slider}
                                            value={this.state.currentTime}
                                            minimumValue={0}
                                            maximumValue={this.state.duration}//用视频总长度表示滑块的总长度
                                            minimumTrackTintColor='#F683A2'
                                            maximumTrackTintColor='gray'
                                            thumbTintColor='#F683A2'
                                            step={1}
                                            onValueChange={value => {
                                                this.onValueChange(value)
                                            }}
                                            //onSlidingComplete={value => this.player.seek(value)}
                                            onSlidingComplete={value => this.onSlidingComplete(value)}
                                        />
                                        <TouchableOpacity
                                            onPress={this.onPressSound}
                                        >
                                            {
                                                this.state.muted ? (
                                                    <Image source={require('../image/video/noSound.png')} style={{ width: 23, height: 23, marginRight: 10 }} />
                                                ) : (
                                                        <Image source={require('../../images/video/horn.png')} style={{ width: 25, height: 25, marginRight: 10 }} />
                                                    )
                                            }

                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={this.isQuanPing}>
                                            <Image
                                                source={require('../image/video/quanping.png')}
                                                style={{ width: 18, height: 18 }}
                                            />
                                        </TouchableOpacity>

                                    </View>
                                ) : (
                                    null
                                )
                        }
                    </TouchableOpacity>
                </View>

                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    style={{ width: width }}
                >
                    <View style={{ width: width }}>
                        <View style={{ width: width, height: 10, backgroundColor: '#F0F0F0' }}>
                        </View>
                        <StarList
                        />
                        <View style={{ width: width, height: 10, backgroundColor: '#F0F0F0' }}>
                        </View>
                        <View style={styles.film}>
                            <Text style={{ paddingLeft: 10, paddingTop: 10 }}>相关影片</Text>
                            <FlatList
                                keyExtractor={item => item.id}
                                ref={(flatList) => this._flatList = flatList}
                                data={this.state.data}
                                renderItem={this.renderItem}
                                horizontal={false}
                                numColumns={2}
                            >
                            </FlatList>
                        </View>

                    </View>
                </ScrollView>

                <Model
                    onPress={this.controlModel}
                    modalVisible={this.state.popup}
                    title={'添加商品价格与库存'}
                />

            </View>
        );
    }
    render() {
        return this.renderNativeSkin();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    fullScreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: -1,
    },
    fullScreen2: {
        width: width,
        height: 210,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: -1,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    buttonContainer: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    button: {
        padding: 5,
        margin: 5,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 3,
        backgroundColor: 'grey',
    },
    slider: {
        flex: 1,
        width: '70%',
    },
    buttons: {
        width: width,
        height: 40,
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10

    },
    set: {
        position: 'absolute',
        left: 0,
        top: 20,
        width: '100%',
        height: 30,
        paddingLeft: '1%',
        paddingRight: '3%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },

    next: {
        width: 17,
        height: 17,
    },
    setRight: {
        flexDirection: 'row'

    },
    square: {
        width: 25,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        borderWidth: 3,
        borderColor: color.saffron_yellow,
        borderRadius: 3

    },




    film: {

    }
});
