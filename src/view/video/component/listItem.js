import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ImageBackground,
    Linking,
    Image,
    FlatList
} from 'react-native';
import PropTypes from 'prop-types';
import color from '../../../Component/Color';
import config from '../../../Component/Config';

const { height, width } = Dimensions.get('window');
export default class ListItem extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            can: false,
        }
    }
    static propTypes = {

    };
    static defaultProps = {

    };

    componentDidMount() {

    }

    render() {
        const { data, onPress } = this.props;
        return (
            <TouchableOpacity activeOpacity={1} onPress={() => onPress && onPress(data.id)} style={{width:width/2,justifyContent:'center',alignItems:'center',paddingTop:10}}  >
                <View style={styles.itemList}>
                    <View>
                        <ImageBackground
                            resizeMode={'stretch'}
                            //source={{ uri: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2904972646,2757879593&amp;fm=26&amp;gp=0.jpg' }}
                            source={data.type == 1 ? require('../../../images/home/cang.jpg') : require('../../../images/home/niuniu.jpg')}
                            style={{ width: width / 2.2, height: 200, justifyContent: 'center', alignItems: 'center' }}
                        //imageStyle={{ borderRadius: 10 }}
                        />

                        {

                            data.type == 1 ? (
                                <View style={styles.video}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image
                                            resizeMode={'contain'}
                                            source={require('../../../images/home/fire.png')}
                                            style={{ width: 15, height: 15 }}
                                        />
                                        <Text style={styles.statement}>{'98%'}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image
                                            resizeMode={'contain'}
                                            source={require('../../../images/home/time.png')}
                                            style={{ width: 15, height: 15 }}
                                        />
                                        <Text style={styles.statement}>{'02:30:001'}</Text>
                                    </View>
                                </View>
                            ) : (
                                    null
                                )

                        }
                    </View>


                    <Text
                        style={styles.Introduction}
                        numberOfLines={2}
                        >
                        {'【苍老师】1983年11月11日出生于日本东京。日本AV女演员成人模特，兼电视、电影演员。日本女子组合惠比寿麝香葡萄的初代首领，现成员、OG首领。2010年3月毕业并将组合首领之位交托给麻美由真，同年10月复归。'}
                    </Text>

                    {
                        data.type == 1 ? (
                            <View style={[styles.permissions, { backgroundColor: data.permissions == 1 ? '#F683A2' : '#FEA500', }]}>
                                <Text style={{ color: '#FFFFFF' }}>{data.permissions == 1 ? 'VIP' : '限免'}</Text>
                            </View>
                        ) : (
                                null
                            )

                    }



                </View>


            </TouchableOpacity>
        );
    }

}
const styles = StyleSheet.create({
    itemList: {
        width: width/2.2,
        justifyContent:'center',
        alignItems:'center',
        //height:100,
        backgroundColor: '#FFF',


    },
    Introduction: {
        marginTop: 5,
        marginBottom: 5,
    },
    permissions: {
        width: 50,
        height: 27,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        position: 'absolute',
        top: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    video: {
        width: width/2.2,
        height: 30,
        paddingLeft: 7,
        paddingRight: 7,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        position: 'absolute',
        bottom: 0,
        left: 0,
    },
    statement: {
        color: '#FFFFFF',
        fontSize: 12,
        marginLeft: 3
    }

});