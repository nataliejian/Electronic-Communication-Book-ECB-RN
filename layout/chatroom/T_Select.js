import React, { Component } from 'react';
import { View, Text, Button, Image, TouchableOpacity } from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Col, Grid, Row } from 'react-native-easy-grid';

export default class Example extends Component {
    state = {
        classroomid: null,
        showLoading: false
    };

    componentWillMount() {
        this.setState({ showLoading: true });
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
                this.setState({
                    class: responseJson.data[0].class,
                    name: responseJson.data[0].name
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    liststudent = () => {
        const { navigate } = this.props.navigation;
        navigate('T_List_Stu',
            {
                name: this.state.name,
                class: this.state.class
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
        if (this.state.showLoading === true) {
            return (

                <View style={styles.flexContainer}>
                    <Image
                        style={styles.bg}
                        source={{ uri: "http://192.168.68.112/ECB/images/background_login.jpg" }}
                    />
                    <Grid>
                        <Row size={0.2} />
                        <Row size={1}>
                            <TouchableOpacity
                                onPress={this.liststudent}
                                style={styles.BtnBG}
                            >
                                <View center>
                                    <Icon name='contacts'
                                        size={100}
                                        color='black'></Icon>
                                </View>

                                <Text style={styles.BtnText}>聯絡家長</Text>
                            </TouchableOpacity>
                        </Row>
                        <Row size={1}>
                            <TouchableOpacity
                                onPress={this.classchat}
                                style={styles.BtnBG}
                            >
                                <View center>
                                    <Icon name='message1'
                                        size={100}
                                        color='black'></Icon>
                                </View>
                                <Text style={styles.BtnText}>班級群組</Text>
                            </TouchableOpacity>
                        </Row>

                    </Grid>

                </View>
            );
        }
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
