//修改聯絡簿事項時使用
import React, { Component } from 'react'
import DatePicker from 'react-native-datepicker'
import { View, Text, Image, TouchableOpacity, TextInput, } from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';
export default class MyDatePicker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            context : '',
            title : '',
            datetime_start : '',
            datetime_final : '',
        }
    }
/*Fetch Data*/
    componentDidMount() {
        fetch('http://192.168.68.112/ECB/contact_book_modify.php',{
            method:'post',
            header:{
                'Accept':'application/json',
                'Contect-type': 'application/json',
            }, 
            body:JSON.stringify({
                contactbook_id : JSON.parse(getcontactbook_id)
            })  
        })
    .then((response) => response.json())
    .then((responseJson) => {
            this.setState({
                title : responseJson[0].title,
                context : responseJson[0].context,
                datetime_start : responseJson[0].created_date,
                datetime_final : responseJson[0].deadline,
            })
    })
    .catch((error) => {
        console.error(error);
    });
    }
/*Button Listener*/
    modify = () => {
        fetch('http://192.168.68.112/ECB/contact_book_updated.php',{
            method:'post',
            header:{
                'Accept':'application/json',
                'Contect-type': 'application/json',
            }, 
            body:JSON.stringify({
                contactbook_id : JSON.parse(getcontactbook_id),
                title : this.state.title,
                context :this.state.context,
                created_date : this.state.datetime_start,
                deadline : this.state.datetime_final
            })  
        })
        .then((response) => response.json())
        .then((responseJson) => {
            const { navigate } = this.props.navigation;
            if(responseJson=='success'){ 
                navigate('T_TCB_Main',
                {
                    
                });
            }
        })
        .catch((error) => {
            console.error(error);
        })
        .catch((error) => {
            console.error(error);
        });
    }
    
    render() {
        global.getcontactbook_id = this.props.navigation.getParam('contactbook_id');
        return (
            <View style={styles.flexContainer}>
                <Image
                    style={styles.bg}
                    source={{ uri: "http://192.168.68.112/ECB/images/background_login.jpg" }}
                />
                <Grid>
                    <Row size={1} >
                        <Col>
                            <TextInput style={styles.title}
                                multiline={true}
                                maxHeight={80}
                                textAlignVertical='auto'//自動對齊
                                defaultValue={this.state.title}
                                placeholder=' 請輸入事項'
                                onChangeText={title => this.setState({ title })}
                            >
                            </TextInput>

                        </Col>
                    </Row>
                    <Row size={3} >
                        <Col>
                            <TextInput style={styles.input}
                                multiline={true}
                                placeholder=' 請輸入事項內容'
                                defaultValue={this.state.context}
                                onChangeText={context => this.setState({ context })}
                            >
                            </TextInput>
                        </Col>
                    </Row>

                    <Row size={1} >
                        <Col justifyContent='center'>
                            <Text style={styles.text}>開始時間</Text>
                        </Col>

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
                            <Text style={styles.text}>截止時間</Text>
                        </Col>

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
                        <TouchableOpacity style={styles.bt} onPress={this.modify}>
                            <Text style={styles.bttext}>修改</Text>
                        </TouchableOpacity>
                        </Col>
                        </Row>
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

    title: { 
        backgroundColor:'transparent',
        height: 250,
        // fontSize: 30,
        borderRadius: 20,
        backgroundColor:'rgba(255, 0, 0, 0.1)',
        fontSize: 23,
        shadowColor: "black",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0,
        },
    },

    input: {
        backgroundColor:'transparent',
        height: 250,
        // fontSize: 30,
        borderRadius: 20,
        backgroundColor:'rgba(255, 0, 0, 0.1)',
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
        fontSize: 30,
        textAlign: 'center',
        color: 'black'
    },
});
