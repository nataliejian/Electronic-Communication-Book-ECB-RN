import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native-ui-lib';
import { StyleSheet, FlatList, RefreshControl, Alert } from 'react-native';
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
            parent_check: '',
        };
    }

    /*Fetch Data*/
    componentDidMount() {
        fetch('http://192.168.68.112/ECB/contactbook_parent_check.php', {
            method: 'post',
            header: {
                'Accept': 'application/json',
                'Contect-type': 'application/json',
            },
            body: JSON.stringify({
                date: this.state.date,
                NS: getNS,
                class: getclass
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                // alert(JSON.stringify(responseJson))
                this.setState({
                    dataSource: responseJson,
                    isLoading: false,
                    refreshing: false,

                })
                if (JSON.stringify(responseJson).indexOf('parent_check') !== -1) {
                    this.setState({
                        parent_check: responseJson[0]['parent_check']
                    })
                } else {
                    this.setState({
                        parent_check: 0
                    })
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
    /*Flatlist key*/
    // keyExtractor = (item) => item.contactbook_id;

    /*FlatList Item*/
    renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                style={{ flex: 0, justifyContent: 'center' }}
            // onPress={}
            >

                <Row>
                    <Col size={2}></Col>
                    <Col size={10}>
        
                        <Text style={styles.text}>
                            {item.context}
                        </Text>
                     
                    </Col>
                    <Col size={10}></Col>
                    <Col size={10}>
               
                        {item.finish == 0 ? <Text style={styles.not_finish}>未完成 </Text> : <Text style={styles.finish}>已完成 </Text>}
                 
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
        fetch('http://192.168.68.112/ECB/contactbook_parent_check.php ', {
            method: 'post',
            header: {
                'Accept': 'application/json',
                'Contect-type': 'application/json',
            },
            body: JSON.stringify({
                date: this.state.date,
                NS: getNS,
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
                if (JSON.stringify(responseJson).indexOf('parent_check') !== -1) {
                    this.setState({
                        parent_check: responseJson[0]['parent_check']
                    })
                } else {
                    this.setState({
                        parent_check: 0
                    })
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
    /*Button Cotroller*/
    checked = () => {
        fetch('http://192.168.68.112/ECB/contactbook_parent_updated.php', {
            method: 'post',
            header: {
                'Accept': 'application/json',
                'Contect-type': 'application/json',
            },
            body: JSON.stringify({
                date: this.state.date,
                class: getclass,
                NS: getNS,
                // updated: '1'
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson == 'success') {
                    this.setState({
                        refreshing: true
                    });
                    this.handleRefresh();
                }else{
                    Alert.alert("此日並無聯絡簿事項");
                }
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
    alert = () => {
        Alert.alert('通知', '已經是今天了');
    }
    render() {
        global.getclass = this.props.navigation.getParam('class');
        global.getNS = this.props.navigation.getParam('NS');
        global.getstudent_name = this.props.navigation.getParam('student_name');
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
                                maxDate={moment().format('YYYY-MM-DD')}//最大就今天
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
                            {
                                this.state.date == moment().format('YYYY-MM-DD') ?

                                    <TouchableOpacity
                                        // disabled={true}
                                        onPress={() => this.alert()}
                                    >
                                        <Icon
                                            name='arrow-right'
                                            type='EvilIcons'
                                            size={40}
                                            reverseColor='#ffffff'
                                            color='black'
                                        >
                                        </Icon>
                                    </TouchableOpacity>
                                    :
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


                            }

                        </Col>

                    </Row>
                     
                    <Row size={0.2} style={{ backgroundColor: 'steelblue' }}></Row>
                    <Row size={5} style={{ backgroundColor: 'steelblue' }}>
                        <Col size={1}></Col>
                        <Col size={15}>
                            <Text style={styles.text_color} >
                                聯絡簿
                            </Text>
                        </Col>
                        <Col size={20}></Col>
                        <Col size={15}>
                            <Text style={styles.text_color}>
                                狀態
                            </Text>
                        </Col>
                    </Row>

                    <Row size={65}>
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

                    <Row size={10} justifyContent='center'>
                        {
                            this.state.parent_check == '0' ?
                                <TouchableOpacity
                                    style={styles.BtnBG}
                                    onPress={() => this.checked()}
                                >
                                    <Text style={styles.bttext_check}>簽閱</Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity
                                    style={styles.BtnBG_fin} 
                                    // onPress={() => this.checked()}
                                    disabled={true}
                                >
                                    <Text style={styles.bttext_check} >已簽閱</Text>
                                </TouchableOpacity>
                        }
                    </Row>
                    <Row size={5}></Row>
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
        fontSize: 25,
        fontFamily: 'sans-serif-condensed',
        textAlign: 'center',
        color:'black'
        
    },
    text_color: {
        fontSize: 30,
        fontFamily: 'sans-serif-condensed',
        color: 'white',
        justifyContent: 'center',
        textAlign: 'center',
    },
    //    這邊改字
    date: {
        width: '100%',
    },
    finish: {
        color: 'green',
        //fontWeight: 'bold',
        fontSize: 25,
        textAlign: 'center',
        fontFamily: 'sans-serif-condensed'
    },
    not_finish: {
        color: 'red',
        //fontWeight: 'bold',
        fontSize: 25,
        fontFamily: 'sans-serif-condensed',
        textAlign: 'center'
    },
    BtnBG: {
        backgroundColor: "#cd5c5c",
        paddingHorizontal: 30,
        paddingVertical: 5,
        borderRadius: 30
    },
    BtnBG_fin: {
        backgroundColor: "green",
        paddingHorizontal: 30,
        paddingVertical: 5,
        borderRadius: 30
    },
     bttext_check: {
        fontSize: 45,
        color:'white'
    },
})
