import React, { Component } from "react";
import { StyleSheet, Alert, AsyncStorage } from "react-native";
import { View, Text, Image, TouchableOpacity, TextInput, Navigator, Any } from 'react-native-ui-lib';
import { Col, Grid, Row } from 'react-native-easy-grid';

export default class main extends React.Component {
    // 
    componentDidMount() {
        var _that = this;
        var keys = ["rol", "Userid", "class1", "Userpassword"];
        AsyncStorage.multiGet(keys, function (errs, result) {
            if (errs) {
                alert('錯誤');
                return;
            }
            _that.setState({
                rol: (result[0][1] != null) ? result[0][1] : '',//if result[0][1]不為空 傳回01 為空傳回''
                Userid: (result[1][1] != null) ? result[1][1] : '',
                class1: (result[2][1] != null) ? result[2][1] : '',
                Userpassword: (result[3][1] != null) ? result[3][1] : ''

            });
        });
    }
    // 

    // static propTypes = {};  
    login = () => {
        var jsonobj = '';
        const { Userid, Userpassword, class1, rol } = this.state;
        // const { Userpassword } = this.state;

        const { navigate } = this.props.navigation;
        fetch('http://192.168.68.112/ECB/checklogin.php', {
            method: 'post',
            header: {
                'Accept': 'application/json',
                'Contect-type': 'application/json',
            },
            body: JSON.stringify({
                id: Userid,
                password: Userpassword,

            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                jsonobj = responseJson;
                if (Userid != null && Userpassword != null) {
                    if (jsonobj != "Wrong") {
                        Alert.alert("歡迎登入"
                        );
                        var rol = JSON.stringify(jsonobj.data[0].role);


                        var keyValuePairs = [['rol', rol], ['Userid', Userid], ['class1', class1], ['Userpassword', Userpassword]]
                        AsyncStorage.multiSet(keyValuePairs, function (errs) {
                            if (errs) {
                                alert('存錯喔');
                                return;
                            }
                        });
                        // test


                        if (rol.match('1')) {
                            navigate('Home_T',
                                {
                                    id: Userid, password: Userpassword,
                                });

                        } else if (rol.match('2')) {
                            navigate('Home_S',
                                {
                                    id: Userid, password: Userpassword,
                                });
                        } else if (rol.match('3')) {
                            navigate('Home_P',
                                {
                                    id: Userid, password: Userpassword,
                                });
                        }

                    } else {

                        Alert.alert("錯誤", "找不到帳號或密碼,請再次確認");
                    }
                } else {
                    Alert.alert("錯誤", "請輸入帳號或密碼");
                }
            }

            )
            .catch((error) => {
                console.error(error);
            });


    }


    register = () => {
        const { navigate } = this.props.navigation;
        navigate('register',
            {
            });
    }
    render() {
        return (

            <View style={styles.flexContainer}>
                <Image
                    style={styles.bg}
                    source={require('../../images/background_login.jpg')}
                />
                {/* 背景 */}
                <Grid >
                    <Row size={3}>
                        <Image style={styles.img}
                            source={require("../../images/ecb.png")} />
                    </Row>
                    <Row backgroundColor='#00fffff' size={1}></Row>
                    <Row backgroundColor='#00fffff' size={1}></Row>
                    <Row backgroundColor='#00fffff' size={1}>
                        <View style={styles.center}>
                            <TextInput
                                style={styles.input}
                                placeholder="username"
                                onChangeText={Userid => this.setState({ Userid })}
                            />
                        </View>
                    </Row>
                    <Row backgroundColor='#00fffff' size={1}>

                    </Row>
                    <Row backgroundColor='#00fffff' size={1}>
                        <View style={styles.center}>
                            <TextInput
                                style={styles.input}
                                placeholder="password"
                                onChangeText={Userpassword => this.setState({ Userpassword })}
                                secureTextEntry
                            />
                        </View>
                    </Row>
                    <Row backgroundColor='#00fffff' size={1}></Row>
                    <Row backgroundColor='#00fffff' size={1}></Row>
                    <Row size={1}>
                        <Col>
                            <TouchableOpacity style={styles.btl}
                                onPress={this.login}>
                                <Text style={styles.bttext}>登入</Text>
                            </TouchableOpacity>
                        </Col>
                        <Col>
                            <TouchableOpacity style={styles.bt} onPress={this.register}>
                                <Text style={styles.bttext}>老師註冊</Text>
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
        width: '100%',
        height: '100%',
        position: "absolute",
    },
    flexContainer: {
        flexDirection: 'row',
        flex: 1,
    },
    img: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 15,
    },
    bt: {
        borderRadius: 50,
        height: 60,
        backgroundColor: '#89CBEB',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btl: {
        borderRadius: 50,
        backgroundColor: '#2d9fd6',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bttext: {
        fontSize: 35,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#ffffff'
    },
    input: {
        textAlign: 'center',
        fontSize: 25,
        width: 400

    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }
});
