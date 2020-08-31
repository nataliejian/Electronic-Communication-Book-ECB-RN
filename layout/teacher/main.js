import React, { Component } from "react";
import { StyleSheet, Platform, BackHandler,ToastAndroid } from "react-native";
import { View, Text, Image, TouchableOpacity } from 'react-native-ui-lib';
import { Icon } from 'react-native-elements';
import { Col, Grid, Row } from 'react-native-easy-grid';
import moment from 'moment';
import {BackListener} from '../all/backHandler';

export default class main extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            class: '',
            name: '',
            date: moment().format('YYYY-MM-DD HH:mm'),
        }
       
    }
    personal = () => {
        const { navigate } = this.props.navigation;
        fetch('http://192.168.68.112/ECB/teacherdata.php', {
            method: 'post',
            header: {
                'Accept': 'application/json',
                'Contect-type': 'application/json',
            },
            body: JSON.stringify({
                id: getid,
                password: getpwd,
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                navigate('T_Personal',
                    {
                        id: JSON.stringify(responseJson.data[0].id),
                        name: JSON.stringify(responseJson.data[0].name),
                        password: JSON.stringify(responseJson.data[0].password),
                        phone: JSON.stringify(responseJson.data[0].phone),
                        class: JSON.stringify(responseJson.data[0].class)
                    });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    showstudent = () => {
        const { navigate } = this.props.navigation;
        fetch('http://192.168.68.112/ECB/teacherdata.php', {
            method: 'post',
            header: {
                'Accept': 'application/json',
                'Contect-type': 'application/json',
            },
            body: JSON.stringify({
                id: getid,
                password: getpwd,
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                navigate('Showstudent',
                    {
                        id: getid,
                        password: getpwd,
                        class: responseJson.data[0].class
                    });

            })
            .catch((error) => {
                console.error(error);
            });
    }



    connectbook = () => {
        const { navigate } = this.props.navigation;
        fetch('http://192.168.68.112/ECB/teacherdata.php', {
            method: 'post',
            header: {
                'Accept': 'application/json',
                'Contect-type': 'application/json',
            },
            body: JSON.stringify({
                id: getid,
                password: getpwd,
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                navigate('T_TCB_Main',
                {
                    class: responseJson.data[0].class
                });
            })
            .catch((error) => {
                console.error(error);
            });

    }
    agenda = () => {
        const { navigate } = this.props.navigation;
        fetch('http://192.168.68.112/ECB/teacherdata.php', {
            method: 'post',
            header: {
                'Accept': 'application/json',
                'Contect-type': 'application/json',
            },
            body: JSON.stringify({
                id: getid,
                password: getpwd,
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                navigate('T_agenda',
                {
                    class: responseJson.data[0].class
                });
            })
            .catch((error) => {
                console.error(error);
            });

    }

    chatroom = () => {
        const { navigate } = this.props.navigation;
                navigate('T_Select',
                    {
                        id: getid,
                        password: getpwd,
                    });
    }

    render() {
        global.getid = this.props.navigation.getParam('id');
        global.getpwd = this.props.navigation.getParam('password');
        global.getclass = this.props.navigation.getParam('class');
        
        return (
            <View style={styles.flexContainer}>
                <Image
                    style={styles.bg}
                    source={{ uri: "http://192.168.68.112/ECB/images/background_login.jpg" }}
                />
                {/* 背景 */}
                <Grid>
                    <Row>
                        <Col justifyContent='center'>
                            <TouchableOpacity onPress={() => this.agenda()}>
                                <Icon
                                    name='calendar'
                                    type='font-awesome'
                                    size={75}
                                    reverseColor='#ffffff'
                                >
                                </Icon>
                                <Text style={styles.font1}>行 事 曆</Text>
                            </TouchableOpacity>

                        </Col>
                        {/* <Col >

                        </Col> */}
                        <Col justifyContent='center'>

                            <TouchableOpacity onPress={() => this.personal(getid, getpwd)}>
                                <Icon
                                    name='user-o'
                                    type='font-awesome'
                                    size={75}
                                    reverseColor='#ffffff'>
                                </Icon>
                                <Text style={styles.font} >個人資訊 </Text>
                            </TouchableOpacity>

                        </Col>
                    </Row>

                    <Row>
                        <Col size={1} >
                        </Col>
                        <Col size={3} justifyContent='center'>
                            <TouchableOpacity onPress={() => this.connectbook()} >
                                <Icon
                                    name='book'
                                    type='font-awesome'
                                    size={80}
                                    reverseColor='#ffffff'>
                                </Icon>
                                <Text style={styles.font1}>聯 絡 簿</Text>
                            </TouchableOpacity>
                        </Col>

                        <Col size={1}>

                        </Col>
                    </Row>
                    <Row>
                        <Col justifyContent='center'>
                            <TouchableOpacity onPress={() => this.chatroom()} >
                                <Icon
                                    name='message'
                                    type='MaterialIcons'
                                    size={75}
                                    reverseColor='#ffffff'>
                                </Icon>
                                <Text style={styles.font1}>留 言 板</Text>
                            </TouchableOpacity>
                        </Col>
                        {/* <Col >

                        </Col> */}
                        <Col justifyContent='center'>

                            <TouchableOpacity onPress={() => this.showstudent()}>
                                <Icon
                                    name='users'
                                    type='font-awesome'
                                    size={75}
                                    reverseColor='#ffffff'>
                                </Icon>
                                <Text style={styles.font}>學生資訊</Text>
                            </TouchableOpacity>
                        </Col>
                    </Row>
                </Grid>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: "white",
        flex: 1
    },
    bg: {
        top: 0,
        left: 0,
        position: "absolute",
        width: "100%",
        height: "100%"
    },

    flexContainer: {

        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between'
    },

    font: {
        textAlign: 'center',
        // fontWeight: 'bold',
        fontSize: 40,
        color:'black'
    },
    font1: {
        textAlign: 'center',
        // fontWeight: 'bold',
        fontSize: 42,
        color:'black'
    },
    img:{
    justifyContent: 'center',
    alignItems: 'center',
    height:150,
    width:400
    },
    //
});
