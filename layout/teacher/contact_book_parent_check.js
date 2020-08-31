// 老師查看家長檢閱狀態
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native-ui-lib';
import { StyleSheet, FlatList, RefreshControl, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Col, Grid, Row } from 'react-native-easy-grid';
import moment from 'moment';
import DatePicker from 'react-native-datepicker';

export default class main extends React.Component {
    constructor() {
        super()
        this.state = {
            dataSource: [],
            isLoading: true,
            activeRow: null,
            deleteKey: null,
            refreshing: true,
            date: moment().format('YYYY-MM-DD'),
        };
    }

    /*Fetch Data*/
    componentDidMount() {
        fetch('http://192.168.68.112/ECB/contact_book_check_parent.php', {
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
                //alert(JSON.stringify(responseJson))
            })
            .catch((error) => {
                console.error(error);
            });
    }
    /*Flatlist key*/
    keyExtractor = (item) => item.contactbook_id;

    /*FlatList Item*/
    renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                style={{ flex: 0, justifyContent: 'center' }}
            // onPress={}
            >

                <Row>
                    <Col size={2}></Col>
                    <Col size={76.5}>
                        <Text style={styles.text}>
                            {item.name}
                        </Text>
                    </Col>
                    <Col size={22}>
                        {item.finish == 0 ? <Text style={styles.not_finish}>未簽閱 </Text> : <Text style={styles.finish}>已簽閱 </Text>}
                    </Col>
                </Row>

            </TouchableOpacity>
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
        fetch('http://192.168.68.112/ECB/contact_book_check_parent.php ', {
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
    /*Date Controller*/

    /*Date Button*/
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
                                        color:'black'
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

                    <Row size={5} style={{ backgroundColor: 'steelblue' }}>
                        <Col size={1}></Col>
                        <Col size={15}>
                            <Text style={styles.text_color} >
                                學生名字
                            </Text>
                        </Col>
                        <Col size={20}></Col>
                        <Col size={15}>
                            <Text style={styles.text_color}>
                                狀態
                            </Text>
                        </Col>
                    </Row>

                    <Row size={75}>
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
  
    text: {
        fontSize: 25,
        fontFamily: 'sans-serif-condensed',
        color:'black'


    },
    //    這邊改字
    date: {
        width: '100%',
    },
    finish: {
        color: 'green',
        //fontWeight: 'bold',
        fontSize: 25,
        fontFamily: 'sans-serif-condensed'
    },
    not_finish: {
        color: 'red',
        //fontWeight: 'bold',
        fontSize: 25,
        fontFamily: 'sans-serif-condensed',

    },
     text_color: {
        fontSize: 30,
        fontFamily: 'sans-serif-condensed',
        color: 'white',
        justifyContent: 'center',
        textAlign: 'center',
    },
})
