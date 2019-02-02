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
            collection: this.props.data.collection,
        }
    }
    static propTypes = {

    };
    static defaultProps = {

    };

    componentWillMount() {


    }

    componentDidMount() {

    }

    switch = (id) => {
        this.setState({
            collection:!this.state.collection
        });
    }

    render() {
        const { data, onPress } = this.props;
        return (
            <TouchableOpacity activeOpacity={1} onPress={() => onPress && onPress(data.id)}>
                <View style={styles.itemList}>
                    <ImageBackground
                        resizeMode={'cover'}//contain
                        //source={{ uri: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2904972646,2757879593&amp;fm=26&amp;gp=0.jpg' }}
                        source={require('../../../images/type/headCang.jpg')}
                        style={{ width: width / 5.5, height: width / 5.5, justifyContent: 'center', alignItems: 'center' }}
                        imageStyle={{ borderRadius: width / 5.5 }}
                    />
                    <Text style={{ paddingTop: 5, paddingBottom: 5 }}>{data.name}</Text>
                    <TouchableOpacity activeOpacity={1} onPress={() => this.switch(data.id)}>
                        <View style={[styles.scutcheon, { backgroundColor: this.state.collection == 1 ? color.saffron_yellow : '#FFFFFF' }]}>
                            <Text style={{ color: this.state.collection == 1 ? '#ffffff' : color.saffron_yellow, fontSize: 12 }}>{this.state.collection == 1 ? '已收藏' : '收藏'}</Text>
                        </View>
                    </TouchableOpacity>
                </View>


            </TouchableOpacity>
        );
    }

}
const styles = StyleSheet.create({
    itemList: {
        width: width * 0.99 / 4,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10
    },

    scutcheon: {

        borderWidth: 1,
        borderColor: color.saffron_yellow,
        borderRadius: 10,
        width: 60,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },


});