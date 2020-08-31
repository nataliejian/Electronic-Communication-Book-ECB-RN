//主頁→編寫聯絡簿→新增事項
import React, { Component } from 'react'
import DatePicker from 'react-native-datepicker'
import { View, Text, Image, TouchableOpacity, TextInput, } from 'react-native-ui-lib';
import { StyleSheet, FlatList, CheckBox, ScrollView, Alert} from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';
import moment from 'moment';

export default class MyDatePicker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            datetime_start: moment().format('YYYY-MM-DD'),
            datetime_final: (moment(moment().format('YYYY-MM-DD')).add(1, 'days')).format('YYYY-MM-DD'),
            context: null,
            // title : ''
        }
    }
    /*Button Listener*/
    add = () => {
        if (this.state.context != null) {
            fetch('http://192.168.68.112/ECB/contact_book_add.php', {
                method: 'post',
                header: {
                    'Accept': 'application/json',
                    'Contect-type': 'application/json',
                },
                body: JSON.stringify({
                    class: getclass,
                    // title : this.state.title,
                    context: this.state.context,
                    created_date: this.state.datetime_start,
                    deadline: this.state.datetime_final
                })
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    const { navigate } = this.props.navigation;
                    if (responseJson == 'success') {
                        navigate('T_TCB_Main',
                            {

                            });
                    }
                })
                .catch((error) => {
                    console.error(error);
                    alert(error)
                })
                .catch((error) => {
                    console.error(error);
                    alert(error)
                });
        } else {
            Alert.alert('警告', '請填寫事項');
        }
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
                    <Row size={0.1} ></Row>
                    <Row size={3} >
                        <Col size={0.2}></Col>
                        <Col size={9}>
                            <TextInput style={styles.context}
                                multiline={true}
                                maxHeight={200}
                                textAlignVertical='auto'//自動對齊，
                                placeholder=' 請輸入事項內容'
                                onChangeText={context => this.setState({ context })}
                            >
                            </TextInput>

                        </Col>
                        <Col size={0.1}></Col>
                    </Row>

                    <Row size={1} >
                        <Col justifyContent='center'>
                            <View right>
                                <Text style={styles.text}> 開始時間</Text>
                            </View>
                        </Col>
                        <Col size={0.1}></Col>
                        <Col justifyContent='center'>
                            <View>
                                <DatePicker

                                    date={this.state.datetime_start}
                                    mode="date"
                                    format="YYYY-MM-DD"

                                    customStyles={{
                                        dateIcon: {
                                            position: 'absolute',
                                            left: 0,
                                            top: 4,
                                            marginLeft: 0,
                                            height: 40

                                        },
                                        dateInput: {
                                            marginLeft: 36,
                                            height: 40,
                                            width: 100
                                        }
                                    }}

                                    onDateChange={(datetime_start) => {
                                        this.setState({ datetime_start: datetime_start });
                                    }}
                                />
                            </View>
                        </Col>

                    </Row>

                    <Row size={1} >
                        <Col justifyContent='center'>
                            <View right>
                                <Text style={styles.text}> 截止時間</Text>
                            </View>
                        </Col>
                        <Col size={0.1}></Col>
                        <Col justifyContent='center'>
                            <View>
                                <DatePicker

                                    date={this.state.datetime_final}
                                    mode="date"
                                    format="YYYY-MM-DD"

                                    customStyles={{
                                        dateIcon: {
                                            position: 'absolute',
                                            left: 0,
                                            top: 4,
                                            marginLeft: 0,
                                            height: 40,
                                        },
                                        dateInput: {
                                            marginLeft: 36,
                                            height: 40,
                                            width: 100
                                        }
                                    }}

                                    onDateChange={(datetime_final) => {
                                        this.setState({ datetime_final: datetime_final });
                                    }}
                                />
                            </View>
                        </Col>
                    </Row>
                    <Row size={0.5} >
                        <Col>
                            <TouchableOpacity style={styles.bt} onPress={this.add}>
                                <Text style={styles.bttext}>新         增</Text>
                            </TouchableOpacity>
                        </Col>
                    </Row>
                    {/* <Row></Row> */}
                </Grid>
            </View>
        )
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

    text: {
        fontSize: 30,
        color: 'black'
    },


    context: {
        backgroundColor: 'transparent',

        height: 250,
        // fontSize: 30,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        fontSize: 23,
        shadowColor: "black",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0,
        },
    },

    bt: {
        borderRadius: 20,
        height: 60,
        backgroundColor: '#87cefa',
        justifyContent: 'center',
        alignItems: 'center',
    },

    bttext: {
        fontSize: 40,
        textAlign: 'center',
        color: 'black'
    },
});
