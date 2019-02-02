import React from 'react';
import {
    View,
    Platform,
    StatusBar,
    SafeAreaView,
    Dimensions,
    ActivityIndicator,
    Text,
    Modal
} from 'react-native';
import color from './Color';

const STATUSBAR_HEIGHT = 20;
const STATUSBAR_BACKGROUNDCOLOR = '#FF9C1E';

let screenW = Dimensions.get('window').width; //414
let screenH = Dimensions.get('window').height;  //896
// iPhoneX iPhoneXS
const X_WIDTH = 375;
const X_HEIGHT = 812;

//iPhone XR
const XR_Width = 414;
const XR_Height = 896;

export default class BaseView extends React.PureComponent {

    render() {
        if (Platform.OS === 'ios') {
            return (
                <SafeAreaView style={{ backgroundColor: color.statusBar, flex: 1 }}>
                    {this.props.children}
                    <Modal
                        animationType='fade'            // 淡入淡出
                        transparent={this.props.transparent}              // 透明
                        visible={this.props.isRequest}    // 根据isModal决定是否显示
                    >
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <View>
                                <ActivityIndicator
                                    animating={true}
                                    size='small'
                                    color='gray'
                                    style={{ alignItems: 'center', justifyContent: 'center', padding: 8 }}></ActivityIndicator>
                                <Text>加载中…</Text>
                            </View>
                        </View>
                    </Modal>
                </SafeAreaView>
            )
        }

        if (Platform.OS === "android") {
            return (
                <View style={{ backgroundColor: color.background, flex: 1 }}>
                    <StatusBar hidden={false} backgroundColor={color.statusBar} />
                    {this.props.children}
                    {this.renderIsLoading()}
                </View>
            )
        }
    }

    renderIsLoading() {
        return (
            <Modal
                animationType='fade'            // 淡入淡出
                transparent={this.props.transparent}              // 透明
                visible={this.props.isRequest}    // 根据isModal决定是否显示
                onRequestClose={() => { this.onRequestClose() }}  // android必须实现  //android按物理按键时触发的函数
            >
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View>
                        <ActivityIndicator
                            animating={true}
                            size='small'
                            color='gray'
                            style={{ alignItems: 'center', justifyContent: 'center', padding: 8 }}></ActivityIndicator>
                        <Text>加载中…</Text>
                    </View>
                </View>
            </Modal>
        )
    }
}