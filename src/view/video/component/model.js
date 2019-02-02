/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Modal,
    Dimensions,
    TouchableOpacity,
    TouchableHighlight,
    StyleSheet,
    Animated,
    View,
    Text
} from 'react-native';
import PropTypes from 'prop-types';
import Toast from 'react-native-root-toast';


const { height, width } = Dimensions.get('window');
export default class Model extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            bounceValue: new Animated.Value(0),
        }

    };

    static propTypes = {
        modalVisible: PropTypes.bool,

    };
    static defaultProps = {
        modalVisible: false,
    };

    componentDidMount() {
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




    render() {
        const { title, onPress } = this.props;
        return (
            <Modal
                animationType={"none"}
                transparent={true}
                visible={this.props.modalVisible}
                onRequestClose={() => onPress && onPress(false)}
            >
                <TouchableOpacity style={{ flex: 1 }} onPress={() => onPress && onPress(false)}>
                    <View style={styles.container}>


                        <Animated.View
                            style={{
                                borderRadius: 5,
                                backgroundColor: '#fff',
                                padding: 20,
                                paddingBottom: 10,
                                transform: [
                                    { scale: this.state.bounceValue },
                                ]
                            }}
                        >
                            <View style={styles.prompt}>
                                <Text style={styles.title}>{title}</Text>
                            </View>
                        </Animated.View>
                    </View>
                </TouchableOpacity>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',//Modal范围内第一个组件定义以y轴为主轴。
        alignItems: 'center',
        padding: 40,
        backgroundColor: 'rgba(0, 0, 0, 0.2)'
    },
    innerContainer: {
        borderRadius: 5,
        backgroundColor: '#fff',
        padding: 20,
        paddingBottom: 10,
    },
    prompt: {
        width: width * 0.6,
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 5,
    },
    title: {
        color: 'black',
        fontSize: 16,
    },






});

