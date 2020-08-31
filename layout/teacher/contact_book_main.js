//聯絡簿主頁，導編輯及閱讀
import React, { Component } from 'react';
import { View, Text, Button, Image, TouchableOpacity } from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { Col, Grid, Row } from 'react-native-easy-grid';
export default class Example extends Component {
    // componentDidMount() {
    //     alert(this.props.navigation.state.routeName);
    // }
    edit = () => {
        const { navigate } = this.props.navigation;
        navigate('T_TCB_Edit',
            {
                class: getclass
            });
    }
    read = () => {
        const { navigate } = this.props.navigation;
        navigate('T_TCB_Read',
            {
                class: getclass
            });
    }
    check_read = () => {
        const { navigate } = this.props.navigation;
        navigate('T_TCB_P_Check',
            {
                class: getclass
            });
    }

    render() {
        global.getclass = this.props.navigation.getParam('class');
        return (
            <View style={styles.flexContainer}>
                <Image
                    style={styles.bg}
                    source={{ uri: "http://192.168.68.112/ECB/images/background_login.jpg" }}
                />
                {/* <View paddingH-25 paddingT-120>

                    <View marginT-0 center>
                        <Button onPress={() => this.edit()}
                            style={styles.BtnBG}>
                            <Icon name='edit'
                                type='Image'
                                size={50}></Icon>
                            <Text style={styles.BtnText}> 編 輯 聯 絡 簿</Text>
                        </Button>

                        <Button marginT-150 style={styles.BtnBG}
                            onPress={() => this.read()}>
                            <Icon name='chrome-reader-mode'
                                type='MaterialIcons'
                                size={50}></Icon>
                            <Text style={styles.BtnText}> 學 生 聯 絡 簿</Text>
                        </Button>

                        <Button marginT-150 style={styles.BtnBG}
                        onPress={() => this.check_read()}
                        >
                            <Icon name='open-book'
                                type='entypo'
                                size={50}></Icon>
                            <Text style={styles.BtnText}> 家  長  查  閱</Text>
                        </Button>

                    </View>

                </View> */}
                <Grid>
<Row size={0.2}></Row>
                    <Row  size={1}>
                        <TouchableOpacity
                            style={styles.BtnBG}
                            onPress={() => this.edit()} >
                            <Icon name='edit'
                                type='Image'
                                size={100}></Icon>
                            <Text style={styles.BtnText}> 編輯聯絡簿</Text>
                        </TouchableOpacity>
                    </Row>
                    <Row  size={1}>
                        <TouchableOpacity
                            style={styles.BtnBG}
                            onPress={() => this.read()} >
                            <Icon name='chrome-reader-mode'
                                type='MaterialIcons'
                                size={100}></Icon>
                            <Text style={styles.BtnText}>學生聯絡簿</Text>
                        </TouchableOpacity>
                    </Row>
                    <Row  size={1}>
                        <TouchableOpacity
                            style={styles.BtnBG}
                            onPress={() => this.check_read()} >
                            <Icon name='open-book'
                                type='entypo'
                                size={100}></Icon>
                            <Text style={styles.BtnText}>家長查閱</Text>
                        </TouchableOpacity>
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
        justifyContent: 'space-between'
    },
    bg: {
        top: 0,
        left: 0,
        position: "absolute",
        width: "100%",
        height: "100%"
    },
    BtnText: {
        fontSize: 40,
        color: "black",
        textAlign: 'center',
        // fontWeight: 'bold',

    },

    BtnBG: {
        // backgroundColor: "navajowhite",
        // paddingHorizontal: 30,
        // paddingVertical: 5,
        borderRadius: 10,
        width: '100%'
    },
});
