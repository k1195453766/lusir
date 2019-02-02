
// /*
//  * @Author: {Wang Kai} 
//  * @Date: 2019-01-22 11:41:56 
//  * @Last Modified by: Wang Kai
//  * @Last Modified time: 2019-01-22 12:00:17
//  * @Describe mytabbar */

// import React, { Component } from 'react';
// import {
//     View,
//     Text,
//     StyleSheet,
//     Image,
//     TextInput,
//     StatusBar,
//     PixelRatio,
//     ActivityIndicator,
//     ScrollView
// } from 'react-native';
// import Orientation from 'react-native-orientation';
// import Dimension from './Dimension';

// // MyTabBar.propTypes = {
// //     goToPage: React.PropTypes.func, // 跳转到对应tab的方法
// //     activeTab: React.PropTypes.number, // 当前被选中的tab下标
// //     tabs: React.PropTypes.array, // 所有tabs集合
// //     tabNames: React.PropTypes.array, // 保存Tab名称
// //     tabIconNames: React.PropTypes.array, // 保存Tab图标
// // }
// export default class MyTabBar extends React.PureComponent {
//     constructor(props) {
//         super(props);
//         this.state = {

//         }
//     }

//     // propTypes = {
//     //     goToPage: React.PropTypes.func, // 跳转到对应tab的方法
//     //     activeTab: React.PropTypes.number, // 当前被选中的tab下标
//     //     tabs: React.PropTypes.array, // 所有tabs集合
//     //     tabNames: React.PropTypes.array, // 保存Tab名称
//     //     tabIconNames: React.PropTypes.array, // 保存Tab图标
//     // }



//     renderTabOption(tab, i) {
//         let color = this.props.activeTab == i ? "#6B8E23" : "#ADADAD"; // 判断i是否是当前选中的tab，设置不同的颜色
//         return (
//             <TouchableOpacity onPress={() => this.props.goToPage(i)} style={styles.tab}>
//                 <View style={styles.tabItem}>
//                     <Image
//                         source={require('../view/image/tab/collect.png')}
//                         style={{ width: 30, height: 30 }}
//                     />
//                     <Text style={{ color: color }}>
//                         {this.props.tabNames[i]}
//                     </Text>
//                 </View>
//             </TouchableOpacity>
//         );
//     }

//     render() {
//         let 
//         return (
//             <ScrollView>
//                 <View style={styles.tabs}>
//                     {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
//                 </View>
//             </ScrollView>
//         );
//     }


// }
