import React, { Component } from 'react';
import { TabNavigator, createBottomTabNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';
import { Image, StyleSheet } from 'react-native';
import color from './Component/Color';

//展示的页面
import Home from './view/home/home';
import RePayMent from './view/repayment/repayment';
import My from './view/my/my';
import Type from './view/type/type';
import Collect from './view/collect/collect';

// const DrawerNav = createDrawerNavigator({

// 	Home: {
// 		screen: Home
// 	},
// 	RePayMent: {
// 		screen: RePayMent
// 	},
// 	Type: {
// 		screen: Type
// 	},
// 	Collect: {
// 		screen: Collect
// 	},
// 	My: {
// 		screen: My
// 	}
// }, {
// 		drawerWidth: 200, // 抽屉宽
// 		drawerPosition: 'left', // 抽屉在左边还是右边
// 		// contentComponent: CustomDrawerContentComponent,  // 自定义抽屉组件
// 		contentOptions: {
// 			initialRouteName: My, // 默认页面组件
// 			activeTintColor: 'white',  // 选中文字颜色
// 			activeBackgroundColor: '#ff8500', // 选中背景颜色
// 			inactiveTintColor: '#666',  // 未选中文字颜色
// 			inactiveBackgroundColor: '#fff', // 未选中背景颜色
// 			style: {  // 样式

// 			}
// 		}
// 	})



const Tab = createBottomTabNavigator({
	Home: {
		screen: Home, navigationOptions: {
			tabBarLabel: '全部',
			tabBarIcon: ({ tintColor, focused }) => (
				<Image resizeMode='contain'
					source={require('./view/image/tab/av.png')}
					style={[{ height: 24, width: 24 }, { tintColor: tintColor }]}
				/>
			)
		}
	},
	RePayMent: {
		screen: RePayMent, navigationOptions: {
			tabBarLabel: '小视频',
			tabBarIcon: ({ tintColor, focused }) => (
				<Image style={[{ height: 24, width: 24 }, { tintColor: tintColor }]}
					resizeMode='contain'
					source={require('./view/image/tab/smallAV.png')}
				/>
			)
		}
	},
	Type: {
		screen: Type, navigationOptions: {
			tabBarLabel: '分类',
			tabBarIcon: ({ tintColor, focused }) => (
				<Image style={[{ height: 24, width: 24 }, { tintColor: tintColor }]}
					resizeMode='contain'
					source={require('./view/image/tab/type.png')}
				/>
			)
		}
	},
	Collect: {
		screen: Collect, navigationOptions: {
			tabBarLabel: '收藏',
			tabBarIcon: ({ tintColor, focused }) => (
				<Image style={[{ height: 24, width: 24 }, { tintColor: tintColor }]}
					resizeMode='contain'
					source={require('./view/image/tab/collect.png')}
				/>
			)
		}
	},
	My: {
		screen: My, navigationOptions: {
			tabBarLabel: '我的',
			tabBarIcon: ({ tintColor, focused }) => (
				<Image style={[{ height: 24, width: 24, }, { tintColor: tintColor }]}
					resizeMode='contain'
					source={require('./images/tab/my.png')}
				/>
			)
		},
	}
}, {
		tabBarPosition: 'bottom',
		lazy: true, // 是否懒加载
		//是否在更改标签时显示动画
		animationEnabled: true,
		//是否允许在标签之间进行滑动
		swipeEnabled: false,
		//按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
		backBehavior: "none",
		initialRouteName: 'Home',
		tabBarOptions: {
			activeTintColor: color.saffron_yellow,//选中tab时 图片和字体的颜色
			showIcon: true, //android 默认不显示 icon, 需要设置为 true 才会显示
			pressOpacity: 0.8,
			style: {
				height: 45,
				backgroundColor: color.saffron_yellow, //tabBar上方有一条颜色线
				zIndex: 0,
				position: 'relative'
			},
			labelStyle: {
				fontSize: 11, // 文字大小
				paddingVertical: 0,
				marginTop: -4
			},
			iconStyle: {
				marginTop: -3,
			},
			tabStyle: {
				backgroundColor: color.white, // TabBar 背景色
			},
		}
	});


const styles = StyleSheet.create({
	images: {
		width: 20,
		height: 20,
	},
});

export default createAppContainer(Tab);