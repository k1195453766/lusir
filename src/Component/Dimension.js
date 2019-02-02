/**
 * 公共组件
 * 
 * 获取屏幕宽高
 */

'use strict'
import {
    Dimensions
} from 'react-native';

var Dimension = {
    width: Dimensions.get("window").width,
    height: Dimensions.get('window').height
};

export default Dimension;
