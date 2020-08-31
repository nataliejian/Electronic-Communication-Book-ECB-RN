import React, { Component } from "react";
import { StyleSheet, BackHandler} from "react-native";
import { View, Text, Image, TouchableOpacity } from 'react-native-ui-lib';
import { Icon } from 'react-native-elements';
import { Col, Grid, Row } from 'react-native-easy-grid';
export default class main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            class: '',
            name: ''
        }
    }
    
    componentDidMount() {
        fetch('http://192.168.68.112/ECB/studentdata.php', {
            method: 'post',
            header: {
                'Accept': 'application/json',
                'Contect-type': 'application/json',
            },
            body: JSON.stringify({
                NS: getid,
                password: getpwd,
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    class: responseJson[0].class,
                    name: responseJson[0].name
                });
                // alert(JSON.stringify(responseJson))
            })
            .catch((error) => {
                console.error(error);
            });
    }
    Spersonal = () => {
        const { navigate } = this.props.navigation;
        fetch('http://192.168.68.112/ECB/studentdata.php', {
            method: 'post',
            header: {
                'Accept': 'application/json',
                'Contect-type': 'application/json',
            },
            body: JSON.stringify({
                NS: getid,
                password: getpwd,
            })

        }).then((response) => response.json())
            .then((responseJson) => {
                jsonobj = responseJson;
                var tmp = '';
                if (JSON.stringify(jsonobj[0].parent_phone) == 'null') { tmp = 'S_Personal_P'; } else { tmp = 'S_Personal'; }
                navigate(tmp,
                    {
                        id: JSON.stringify(jsonobj[0].NS),
                        name: JSON.stringify(jsonobj[0].name),
                        password: JSON.stringify(jsonobj[0].password),
                        phone: JSON.stringify(jsonobj[0].phone),
                        parent: JSON.stringify(jsonobj[0].parent_phone),
                        class: JSON.stringify(jsonobj[0].class)
                    });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    connectbook = () => {
        const { navigate } = this.props.navigation;
        navigate('S_TCB_Main',
            {
                class: this.state.class,
                NS: getid
            });
    }

    agenda = () => {
        const { navigate } = this.props.navigation;
        navigate('S_agenda',
            {
                class: this.state.class,
            });
    }

    classchat = () => {
        const { navigate } = this.props.navigation;
        navigate('Class_Chat',
            {
                name: this.state.name,
                class: this.state.class
            });
    }

    render() {
        global.getid = this.props.navigation.getParam('id');
        global.getpwd = this.props.navigation.getParam('password');
        return (
            <View style={styles.flexContainer}>
                <Image
                    style={styles.bg}
                    source={{ uri: "http://192.168.68.112/ECB/images/background_login.jpg" }}
                />
                {/* 背景 */}
                <Grid>
                    <Row size={3}>
                        <Col justifyContent='center'>
                            <TouchableOpacity onPress={() => this.agenda()}>
                                <Icon
                                    // reverse
                                    name='calendar'
                                    type='font-awesome'
                                    size={80}
                                    // onPress={function(){ console.log('按到我了') }}
                                    reverseColor='#ffffff'
                                >


                                </Icon>
                                <Text style={styles.font}>行事曆</Text>
                            </TouchableOpacity>

                        </Col>

                        <Col justifyContent='center'>

                            <TouchableOpacity onPress={() => this.Spersonal(getid, getpwd)}>
                                <Icon
                                    name='user-o'
                                    type='font-awesome'
                                    size={80}
                                    reverseColor='#ffffff'>

                                </Icon>
                                <Text style={styles.font1}>個人資訊</Text>
                            </TouchableOpacity>

                        </Col>
                    </Row>
                    <Row size={1}></Row>
                    <Row size={3}>
                        <Row size={3}>
                            <Col >
                                <View center>
                                    <Image style={styles.img}
                                        source={{ uri: "http://192.168.68.112/ECB/images/ecb_l.png" }}
                                    />
                                </View>
                            </Col>
                        </Row></Row>
                    <Row size={3}>
                        <Col justifyContent='center'>
                            <TouchableOpacity onPress={() => this.classchat()} >
                                <Icon
                                    // reverse
                                    name='message'
                                    type='MaterialIcons'
                                    size={80}
                                    // onPress={function(){ console.log('按到我了') }}
                                    reverseColor='#ffffff'>

                                </Icon>
                                <Text style={styles.font}>留言板</Text>
                            </TouchableOpacity>

                        </Col>

                        <Col justifyContent='center'>
                            <TouchableOpacity onPress={() => this.connectbook()}>


                                <Icon
                                    // reverse
                                    name='book'
                                    type='font-awesome'
                                    size={80}
                                    // onPress={function(){ console.log('按到我了') }}
                                    reverseColor='#ffffff'>


                                </Icon>
                                <Text style={styles.font}>聯絡簿</Text>


                            </TouchableOpacity>
                        </Col>
                    </Row>
                </Grid>


            </View>

        );
    }
}
const styles = StyleSheet.create({

    bg: {
        top: 0,
        left: 0,
        position: "absolute",
        width: "100%",
        height: "100%"
    },


    //
    flexContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center'
    },
    // circle:{
    //     borderWidth: 1,
    //     borderRadius:200
    // }
    font: {
        textAlign: 'center',
        // fontWeight: 'bold',
        fontSize: 40,
        color: 'black'
    },
    font1: {
        textAlign: 'center',
        // fontWeight: 'bold',
        fontSize: 33,
        color: 'black'
    },
    img:{
        justifyContent: 'center',
    alignItems: 'center',
    height:170,
    width:'98%'
    },
    //

});
