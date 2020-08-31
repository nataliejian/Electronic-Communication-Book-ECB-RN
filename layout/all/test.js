import React, { Component } from "react";
import { StyleSheet, Alert, AsyncStorage, ScrollView, TouchableHighlight } from "react-native";
import { View, Text, Image, TouchableOpacity, TextInput, Navigator, Any } from 'react-native-ui-lib';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { Icon } from 'react-native-elements';
export default class main extends React.Component {




    render() {
        return (

            <View style={styles.flexContainer}>
                <Image
                    style={styles.bg}
                    source={{ uri: "http://120.108.111.85/~ECB/images/background_login.jpg" }}
                />
                {/* 背景 */}
                <ScrollView>
                    <Grid >
                        <Row size={1} >
                            <Col size={1}></Col>
                            <Col size={8}>
                                <View style={styles.inputContainer_123} >

                                </View>
                            </Col>
                            <Col size={1}></Col>
                        </Row>
                        <Row size={1} >
                            <Col size={1}></Col>
                            <Col size={8}>
                                <View style={styles.inputContainer_123} >
                                </View>
                            </Col>
                            <Col size={1}></Col>
                        </Row>


                        <Row size={1} >
                            <Col size={1}></Col>
                            <Col size={8}>
                                <View style={styles.inputContainer}>
                                    <Icon
                                        marginLeft={15}
                                        name='numeric'
                                        type='material-community'
                                        color='#336699'
                                        size={30}
                                    ></Icon>
                                    <TextInput style={styles.inputs}
                                        placeholder="教職員編號"
                                        underlineColorAndroid='transparent'//限制輸入框底線為透明
                                        numberofLines={1}//限制一行
                                        onChangeText={t_id => this.setState({ t_id })}
                                        ref={ref => this.textInputname = ref}
                                    />

                                </View>
                            </Col>
                            <Col size={1}></Col>
                        </Row>

                        <Row size={1} ></Row>
                        <Row size={1} >
                            <Col size={1}></Col>
                            <Col size={8}>
                                <View style={styles.inputContainer}>
                                    <Icon marginLeft={15}
                                        name='vcard'
                                        type='font-awesome'
                                        color='#336699'
                                        size={30}
                                    /><TextInput style={styles.inputs}

                                        placeholder="姓名"
                                        underlineColorAndroid='transparent'
                                        numberofLines={1}
                                        onChangeText={t_name => this.setState({ t_name })}
                                        ref={ref => this.textInputname = ref} />

                                </View>
                            </Col>
                            <Col size={1}></Col>
                        </Row>


                        <Row size={1} ></Row>
                        <Row size={1} >
                            <Col size={1}></Col>
                            <Col size={8}>
                                <View style={styles.inputContainer}>
                                    <Icon marginLeft={15}
                                        name='key'
                                        type='octicon'
                                        color='#336699'
                                        size={30}
                                    />
                                    <TextInput style={styles.inputs}
                                        placeholder="Password"
                                        secureTextEntry={true}
                                        numberofLines={1}
                                        underlineColorAndroid='transparent'
                                        onChangeText={t_password => this.setState({ t_password })}
                                        ref={ref => this.textInputname = ref}
                                    />

                                </View>
                            </Col>
                            <Col size={1}></Col>
                        </Row>
                        <Row size={1} ></Row>
                        <Row size={1} >
                            <Col size={1}></Col>
                            <Col size={8}>
                                <View style={styles.inputContainer}>
                                    <Icon marginLeft={20}
                                        name='telephone'
                                        type='foundation'
                                        color='#336699'
                                        size={30}
                                    />
                                    <TextInput style={styles.inputs}
                                        placeholder="電話"
                                        underlineColorAndroid='transparent'
                                        numberofLines={1}
                                        maxLength={10}
                                        //  
                                        keyboardType="phone-pad"//彈出數字輸入
                                        onChangeText={t_phone => this.setState({ t_phone })}
                                        ref={ref => this.textInputname = ref}
                                    />

                                </View>
                            </Col>
                            <Col size={1}></Col>
                        </Row>
                        <Row size={1} ></Row>
                        <Row size={1} >
                            <Col size={1}></Col>
                            <Col size={8} >
                                <View style={styles.inputContainer}>
                                    <Icon marginLeft={15}
                                        name='mortar-board'
                                        type='font-awesome'
                                        color='#336699'
                                        size={26}
                                    />
                                    <TextInput style={styles.inputs}
                                        placeholder="班級"

                                        underlineColorAndroid='transparent'
                                        numberofLines={1}
                                        onChangeText={t_class => this.setState({ t_class })}
                                        ref={ref => this.textInputname = ref} />

                                </View>
                            </Col>
                            <Col size={1}></Col>
                        </Row>
                        <Row size={1} >
                            <Col size={1}></Col>
                            <Col size={8}>
                                <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]}
                                    onPress={() => this.register()}
                                >
                                    <Text style={styles.signUpText}>Sign up</Text>
                                </TouchableHighlight>
                            </Col>
                            <Col size={1}></Col>
                        </Row>
                    </Grid>
                </ScrollView>
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
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    row: {
        width: '100%'
    },
    inputs: {
        height: 50,
        borderBottomColor: '#FFFFFF',
        width: '70%',
        fontSize: 20,
        marginLeft: '5%',
    },
    inputContainer: {
        borderBottomColor: '#FFFFFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: '100%',
        height: 60,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',

    },
    signupButton: {
        backgroundColor: "#99CCCC",
    },
    signUpText: {
        color: 'white',
        fontSize: 40
    },
    buttonContainer: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: '100%',
        borderRadius: 30,
    },
    inputContainer_123: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',

    },
});
