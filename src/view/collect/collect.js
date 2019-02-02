/*
 * @Author: Wang Kai 
 * @Date: 2018-11-22 16:56:57 
 * @Last Modified by: Wang Kai
 * @Last Modified time: 2019-02-02 11:34:43
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
  RefreshControl
} from 'react-native';
import BaseView from '../../Component/BaseView';
import BaseComponent from '../../Component/BaseComponent';
import color from '../../Component/Color';
import Dimension from '../../Component/Dimension';
import ScrollableTabView, { ScrollableTabBar, DefaultTabBar } from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class Collect extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      isRequest: false,
      recommend: [{ 'id': 1 }, { 'id': 2 }, { 'id': 3 }],//热门推荐
      isRefreshing: false,
    };
    this.tablist = ['搞笑', '恐怖', '综艺'];
  }


  onRefresh = () => {
    this.setState({
      //isRefreshing: true
    })
  }

  render() {
    return (
      <View style={styles.master}>
        <ScrollableTabView
          style={{ width: Dimension.width, }}
          tabBarPosition='top'
          initialPage={0}
          tabBarBackgroundColor={'#fff'}
          renderTabBar={() => <DefaultTabBar />}
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
      </View >
    );
  }
}

const styles = StyleSheet.create({
  tabBarText: {
    fontWeight: 'normal',
  },
  master: {
    flex: 1,
  },
});
