// 老師查看家長檢閱狀態
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native-ui-lib';
import { StyleSheet, FlatList, RefreshControl, } from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';

export default class main extends React.Component {
    constructor() {
        super()
        this.state = {
            dataSource: [],
            isLoading: true,
            activeRow: null,
            deleteKey: null,
            refreshing: true,
        };
    }

    /*Fetch Data*/
    componentDidMount() {
        fetch('http://192.168.68.112/ECB/judge_student.php', {
            method: 'post',
            header: {
                'Accept': 'application/json',
                'Contect-type': 'application/json',
            },
            body: JSON.stringify({
                phone: getphone
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
    keyExtractor = (item) => item.NS;

    /*FlatList Item*/
    renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                style={{ flex: 0, justifyContent: 'center' }}
                onPress={()=>this.choose(item.NS, item.name, item.class)}
            >
  
                <Row>
                    <Col size={2}></Col>
                    <Col size={32}>
                        <Text style={styles.text}>
                            {item.name}
                        </Text>
                    </Col>
                    <Col size={16}>
                        <Text style={styles.text}>
                            {item.class}
                        </Text> 
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
        fetch('http://192.168.68.112/ECB/judge_student.php ', {
            method: 'post',
            header: {
                'Accept': 'application/json',
                'Contect-type': 'application/json',
            },
            body: JSON.stringify({
                phone: getphone
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

    choose= (NS, student_name, getclass) => {
        const { navigate } = this.props.navigation;
        navigate('P_TCB_Main',
                {
                    phone:getphone,
                    NS: NS,
                    student_name: student_name,
                    class: getclass,
                });
    }

    render() {
        global.getphone = this.props.navigation.getParam('phone');
        return (
            <View style={styles.flexContainer}>
                <Image
                    style={styles.bg}
                    source={{ uri: "http://192.168.68.112/ECB/images/background_login.jpg" }}
                />
                <Grid>
                <Row size={0.1} style={{backgroundColor:'steelblue'}}></Row>
                    <Row size={5} style={{backgroundColor:'steelblue'}}>
                            <Col size={3}></Col>
                            <Col size={15}>
                                <Text style={styles.text_color}>
                                   學生名字
                                </Text>
                            </Col>
                            <Col size={7}></Col>
                            <Col size={23}>
                                <Text style={styles.text_color}>
                                   學生班級
                                </Text>
                            </Col>
                        </Row>

                        <Row size={75}>
                        <Col size={0.1}></Col>
                        <Col size={9.8}><FlatList
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
                            /></Col> 
                                    <Col size={0.1}></Col>
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
        fontFamily: 'sans-serif-condensed',
        justifyContent:'center',
        color:'black'

    },
    text_color: {
        fontSize: 30,
        fontFamily: 'sans-serif-condensed',
        justifyContent:'center',
        textAlign:'center',
        color:'white'
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
})
