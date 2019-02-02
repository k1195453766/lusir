/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    ScrollView,
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
import ListItem from "../../type/component/listItem";

const { height, width } = Dimensions.get('window');
export default class StarList extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            data: [{ id: 0, name: '苍老师', collection: 0 }, { id: 1, name: '苍老师', collection: 1 }, { id: 2, name: '苍老师' }, { id: 3, name: '苍老师' }, { id: 4, name: '苍老师' }, { id: 5, name: '苍老师', collection: 0 }, { id: 6, name: '苍老师', collection: 1 }, { id: 7, name: '苍老师' }, { id: 8, name: '苍老师' }, { id: 9, name: '苍老师' }, { id: 10, name: '苍老师', collection: 0 }, { id: 11, name: '苍老师', collection: 1 }, { id: 12, name: '苍老师' }, { id: 13, name: '苍老师' }, { id: 14, name: '苍老师' }],
        }

    };

    static propTypes = {

    };
    static defaultProps = {

    };

    componentDidMount() {

    }

    onPress = (id) => {

    }


    render() {
        return (

            <View>
                <Text style={{paddingLeft:10,paddingTop:10}}>演出女优</Text>
                <ScrollView style={styles.scrollViewStyle}
                    horizontal={true}
                    //  禁用水平滚动条
                    showsHorizontalScrollIndicator={false}
                //  自动分页限ios
                //pagingEnabled={true}
                >
                    <View style={styles.letterView}>
                        {
                            this.state.data.map((data, key) => (
                                <ListItem
                                    key={key}
                                    data={data}
                                    onPress={this.onPress}
                                />

                            ))
                        }
                    </View>

                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    scrollViewStyle: {
        width: width
    },
    letterView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },





});

