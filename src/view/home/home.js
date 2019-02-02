/*
 * @Author: Wang Kai 
 * @Date: 2018-11-22 16:56:57 
 * @Last Modified by: Wang Kai
 * @Last Modified time: 2019-02-02 11:15:58
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
  TouchableOpacity
} from 'react-native';
import BaseView from '../../Component/BaseView';
import BaseComponent from '../../Component/BaseComponent';
import color from '../../Component/Color';
import Dimension from '../../Component/Dimension';
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome';
//import MyTabBar from '../../Component/MyTabBar';
import AV from './aV';

const underlineWidth = 20;
const underlineLeft = (Dimensions.get('window').width / 6 - underlineWidth) / 2;

export default class Home extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      isRequest: false,
      recommend: [{ 'id': 1 }, { 'id': 2 }, { 'id': 3 }],//热门推荐
      isRefreshing: false,
    }
    this.tablist = ['最新', '内地', '热门', '港澳', '台湾']
  }




  onRefresh = () => {
    this.setState({
      //isRefreshing: true
    })
  }

  onPressSearch = () => {
    this.props.navigation.navigate('SearchAV')
    //this.props.navigation.toggleDrawer();
  }

  render() {
    return (
      <View style={styles.master}>
        <ScrollableTabView
          style={{ width: Dimension.width, }}
          tabBarPosition='top'
          initialPage={0}
          tabBarBackgroundColor={'#fff'}
          renderTabBar={() => <ScrollableTabBar style={{ width: Dimension.width - 40, }} />}
          tabBarInactiveTextColor={'rgb(105,105,105)'}
          tabBarActiveTextColor={color.saffron_yellow}
          tabBarUnderlineStyle={{ backgroundColor: color.saffron_yellow, }}
          tabBarTextStyle={styles.tabBarText}
        >
          {
            this.tablist.map((data, key) => {
              return (
                <AV key={key} tabLabel={data} navigate={this.props.navigate} addListener={this.props.navigation.addListener} navigate={this.props.navigation.navigate} />

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
      </View >
    );
  }
}

const styles = StyleSheet.create({
  tabBarText: {
    fontWeight: 'normal',
  },
  tabBar: {
    height: 42,
    borderColor: 'rgb(252,252,252)',
    borderBottomWidth: 1,
    marginBottom: 15,
  },
  tabBarUnderline: {
    backgroundColor: color.saffron_yellow,
    width: underlineWidth,
    height: 2,
    left: underlineLeft,
    alignSelf: 'center',
  },
  header: {
    width: Dimension.width,

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
