//顯示聯絡簿，點選編寫連絡後跳至該頁
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, } from 'react-native-ui-lib';
import { StyleSheet, FlatList, RefreshControl, Alert } from 'react-native';
import { CheckBox } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Col, Grid, Row } from 'react-native-easy-grid';
import moment from 'moment';
import DatePicker from 'react-native-datepicker';

export default class Example extends Component {
    constructor() {
        super()
        this.state = {
            dataSource: [],
            isLoading: true,
            activeRow: null,
            deleteKey: null,
            refreshing: true,
            date: moment().format('YYYY-MM-DD'),
            checked: false,
        }
    }
    /*Fetch Data*/
    componentDidMount() {
        fetch('http://192.168.68.112/ECB/contact_book_check_student.php', {
            method: 'post',
            header: {
                'Accept': 'application/json',
                'Contect-type': 'application/json',
            },
            body: JSON.stringify({
                date: this.state.date,
                class: getclass,
                NS: getNS
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    dataSource: responseJson,
                    isLoading: false,
                    refreshing: false,
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }
    /*Flatlist key*/
    keyExtractor = (item) => item.c_id;

    /*FlatList*/
    renderItem = ({ item, index }) => {
        return (
            <Row>

                <Col size={0.2}></Col>
                <Col size={6.8} style={styles.rowcenter}>
                    <TouchableOpacity style={styles.rowcenter}
                        disabled={true} //使按鈕不能點選
                    >

                        <Text style={styles.text}>
                            {'\n'}{'\t'}{item.context}
                        </Text>
                        <View right>
                            <Text style={styles.textdead} >
                                最後期限:{item.deadline}
                            </Text></View>
                    </TouchableOpacity>
                </Col>
                <Col size={1}></Col>
                <Col size={3} style={styles.rowcenter}>
                    {
                        item.finish == 0 ?
                            <CheckBox style={styles.checkbox}
                                containerStyle={{ backgroundColor: 'transparent', borderColor: 'transparent' }}
                                // title='尚未完成'
                                // checkedIcon='dot-circle-o'
                                // uncheckedIcon='circle-o'
                                size={62}

                                checked={false} onIconPress={() => this.checked(item.finish, item.c_id)
                                }
                                onPress={() => this.checked(item.finish, item.c_id)}
                            />

                            :
                            <CheckBox style={styles.checkbox}
                                containerStyle={{ backgroundColor: 'transparent', borderColor: 'transparent' }}
                                // title='已經完成'
                                checked={true}
                                // checkedIcon='dot-circle-o'
                                // uncheckedIcon='circle-o'
                                // checkedColor='red'
                                size={62}
                                onIconPress={() => this.checked(item.finish, item.c_id)}
                                onPress={() => this.checked(item.finish, item.c_id)} />
                    }

                </Col>
            </Row>
        )
    }

    /*Flatlist bottom*/
    renderSeparator = () => {
        return (
            <View
                style={{ height: 2, width: '100%', backgroundColor: 'black' }}
            />
        )
    }

    /*Flatlist refresh */
    handleRefresh = () => {
        fetch('http://192.168.68.112/ECB/contact_book_check_student.php', {
            method: 'post',
            header: {
                'Accept': 'application/json',
                'Contect-type': 'application/json',
            },
            body: JSON.stringify({
                date: this.state.date,
                class: getclass,
                NS: getNS
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    dataSource: responseJson,
                    isLoading: false,
                    refreshing: false,
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }
    /*Button Listener*/
    checked = (finish, c_id) => {
        var updated = 0
        finish == 0 ? updated = 1 : updated = 0;

        fetch('http://192.168.68.112/ECB/contact_book_check_updated.php', {
            method: 'post',
            header: {
                'Accept': 'application/json',
                'Contect-type': 'application/json',
            },
            body: JSON.stringify({
                date: this.state.date,
                class: getclass,
                c_id: c_id,
                NS: getNS,
                updated: updated
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson == 'success') {
                    this.setState({
                        refreshing: true
                    });
                    this.handleRefresh();
                }
            })
            .catch((error) => {
                console.error(error);
            });


    }
    async back() {

        this.setState({
            date: (moment(this.state.date).subtract(1, 'days')).format('YYYY-MM-DD'),
        });
        await this.setState({
            refreshing: true
        });
        await this.handleRefresh();
    }

    async forward() {

        this.setState({
            date: (moment(this.state.date).add(1, 'days')).format('YYYY-MM-DD')
        });
        await this.setState({
            refreshing: true
        });
        await this.handleRefresh();
    }
    alert = () => {
        Alert.alert('通知', '已經是今天了');
    }
    render() {
        global.getclass = this.props.navigation.getParam('class');
        global.getNS = this.props.navigation.getParam('NS');
        return (
            <View style={styles.flexContainer}>
                <Image
                    style={styles.bg}
                    source={{ uri: "http://192.168.68.112/ECB/images/background_login.jpg" }}
                />
                <Grid>
                    <Row size={5}>
                        <Col size={10}>

                            <TouchableOpacity onPress={() => this.back()}
                            >
                                <Icon
                                    name='arrow-left'
                                    type='EvilIcons'
                                    size={40}
                                    reverseColor='#ffffff'
                                    color='black'
                                >
                                </Icon>
                            </TouchableOpacity>
                        </Col>
                        <Col size={80}>

                            <DatePicker
                                showIcon={false}
                                date={this.state.date}
                                mode="date"
                                format="YYYY-MM-DD"
                                maxDate={this.state.date}//最大就今天
                                style={styles.date}

                                customStyles={{
                                    dateText: {
                                        fontSize: 25,
                                        color: 'black'
                                    }
                                }}
                                onDateChange={(date) => {
                                    this.setState({
                                        date: date,
                                        refreshing: true
                                    });
                                    this.handleRefresh();
                                }}
                            />
                        </Col>
                        <Col size={10}>
                            {
                                this.state.date == moment().format('YYYY-MM-DD') ?

                                    <TouchableOpacity
                                        // disabled={true}
                                        onPress={() => this.alert()}
                                    >
                                        <Icon
                                            name='arrow-right'
                                            type='EvilIcons'
                                            size={40}
                                            reverseColor='#ffffff'
                                            color='black'
                                        >
                                        </Icon>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity onPress={() => this.forward()}>
                                        <Icon
                                            name='arrow-right'
                                            type='EvilIcons'
                                            size={40}
                                            reverseColor='#ffffff'
                                            color='black'
                                        >
                                        </Icon>
                                    </TouchableOpacity>


                            }


                        </Col>
                    </Row>
                    <Row size={6}>
                        <Col size={7.5}>
                            <Text style={{ fontSize: 35, textAlign: 'center', color: 'black' }}>作業內容</Text>
                        </Col>
                        <Col size={2}>
                            <Text style={{ fontSize: 35, color: 'black' }}>完成</Text>
                        </Col>
                        <Col size={0.5}></Col>
                    </Row>

                    <Row size={70}>
                        <FlatList
                            data={this.state.dataSource}
                            renderItem={this.renderItem}
                            ItemSeparatorComponent={this.renderSeparator}
                            keyExtractor={this.keyExtractor}
                            extraData={this.state.activeRow}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this.handleRefresh}
                                />
                            }
                        />
                    </Row>
                </Grid>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    flexContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center'
    },
    bg: {
        top: 0,
        left: 0,
        position: "absolute",
        width: "100%",
        height: "100%",

    },
    bttext: {
        fontSize: 45,
    },
    text: {
        fontSize: 30,
        fontFamily: 'sans-serif-condensed'
        , color: 'black'
    },
    textdead: {
        fontSize: 20,
        fontFamily: 'sans-serif-condensed'
        , color: 'black'
    },
    //    這邊改字
    date: {
        width: '100%',
    },
    // 垂直置中套用
    rowcenter: {
        // justifyContent: 'center'
    },
    checkbox: {
        fontSize: 40,
    },
    container123: {
        backgroundColor: 'transparent',
    }
});