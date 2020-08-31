//顯示聯絡簿，點選編寫連絡後跳至該頁
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, } from 'react-native-ui-lib';
import { StyleSheet, FlatList, RefreshControl, BackHandler} from 'react-native';
import ActionButton from 'react-native-action-button';
import Swipeout from 'react-native-swipeout'
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
            date: moment().format('YYYY-MM-DD')
        }
    }
    
    /*Fetch Data*/
    componentDidMount() {
        fetch('http://192.168.68.112/ECB/contact_book_all.php', {
            method: 'post',
            header: {
                'Accept': 'application/json',
                'Contect-type': 'application/json',
            },
            body: JSON.stringify({
                date: this.state.date,
                class: getclass
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
    keyExtractor = (item) => item.contactbook_id;

    /*FlatList*/
    renderItem = ({ item, index }) => {
        /*Swipeout Setting*/
        const swipeoutSetting = {
            autoClose: true,
            close: item.contactbook_id !== this.state.activeRow,
            onClose: (secId, rowId, direction) => {
                if (item.contactbook_id === this.state.activeRow && typeof direction !== 'undefined') {
                    this.setState(
                        {
                            activeRow: null,
                        }
                    );
                }
            },
            onOpen: (secId, rowId, direction) => {
                this.setState(
                    {
                        activeRow: item.contactbook_id,
                    }
                );
            },
            right: [
                /*Edit Setting*/
                {
                    onPress: () => {
                        const { navigate } = this.props.navigation;
                        navigate('T_TCB_Modify',
                            {
                                contactbook_id: JSON.parse(this.state.activeRow)
                            });
                    },
                    text: 'Edit', backgroundColor: '#66cdaa', TextStyle: style = styles.text
                },
                /*Delete Setting*/
                {
                    onPress: () => {
                        fetch('http://120.108.111.85/ECB/contact_book_remove.php', {
                            method: 'post',
                            header: {
                                'Accept': 'application/json',
                                'Contect-type': 'application/json',
                            },
                            body: JSON.stringify({
                                contactbook_id: JSON.parse(this.state.activeRow)
                            })
                        })
                            .then((response) => response.json())
                            .then((responseJson) => {
                                responseJson == "success" ? this.handleRefresh() : alert("Failed");
                            })
                            .catch((error) => {
                                console.error(error);
                            });
                    },
                    text: 'Delete', type: 'delete', backgroundColor: '#f08080',
                },
            ],
            backgroundColor: 'transparent',
            //清單背景透明
        };
        return (

            <Swipeout {...swipeoutSetting}>

                <TouchableOpacity style={{ flex: 1, justifyContent: 'center' }}
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
            </Swipeout>

        )
    }

    /*Flatlist bottom*/
    renderSeparator = () => {
        return (
            <View
                style={{ height: 2, width: '100%', backgroundColor: 'black' }} />
        )
    }
    /*Flatlist refresh */
    handleRefresh = () => {
        fetch('http://192.168.68.112/ECB/contact_book_all.php', {
            method: 'post',
            header: {
                'Accept': 'application/json',
                'Contect-type': 'application/json',
            },
            body: JSON.stringify({
                date: this.state.date,
                class: getclass
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
    add = () => {
        const { navigate } = this.props.navigation;
        navigate('T_TCB_Add',
            {
                class: getclass
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
    render() {
        global.getclass = this.props.navigation.getParam('class');
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

                        </Col>


                    </Row>
                    <Row size={6}>
                        <Col size={7.5}>
                            <Text style={{ fontSize: 35, textAlign: 'center', color: 'black' }}>作業內容</Text>
                        </Col>

                    </Row>
                    <Row size={80}>
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


                <ActionButton
                    buttonColor="rgba(255, 160, 122,5)"
                    onPress={this.add}
                    size={85}
                    buttonText="+"
                    buttonTextStyle={styles.bttext}
                >
                </ActionButton>

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
        fontSize: 25,
        fontFamily: 'sans-serif-condensed',
        color: 'black'
    },
    //    這邊改字
    date: {
        width: '100%',
    }
});