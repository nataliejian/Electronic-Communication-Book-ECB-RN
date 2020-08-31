import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native-ui-lib';
import { StyleSheet, FlatList, RefreshControl,Animated  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Col, Grid, Row } from 'react-native-easy-grid';
import moment from 'moment';
import DatePicker from 'react-native-datepicker';
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
import { AnimatedCircularProgress ,} from 'react-native-circular-progress';

export default class Example extends Component {
    constructor() {
        super()
        this.state = {
            dataSource: [],
            isLoading: true,
            activeRow: null,
            deleteKey: null,
            refreshing: true,
            date: moment().format('YYYY-MM-DD'),
            context: '',
            statusSource: [],
            finish_num: null,
            unfinish_num: null,
            all_num: null,
            percentage:null
        };
    }

    /*ContactBook List*/

    /*Fetch Data*/
    componentDidMount() {
        fetch('http://192.168.68.112/ECB/contact_book_all.php', {
            method: 'post',
            header: {
                'Accept': 'application/json',
                'Contect-type': 'application/json',
            },
            body: JSON.stringify({
                date: this.state.date,
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
            })
            .catch((error) => {
                console.error(error);
            });    
    }

    /*Flatlist key*/
    keyExtractor = (item) => item.contactbook_id;

    /*FlatList Item*/
    renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                style={{ flex: 1, justifyContent: 'center' }}
                onPress={this.showStatus.bind(this, item.context)}
            >
                <Text style={styles.text_2}>
                    {'\n'}{'\t'}{item.context}
                </Text>
                <View right>
                    <Text  color='black'>
                        最後期限:{item.deadline}
                    </Text></View>
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
        fetch('http://192.168.68.112/ECB/contact_book_all.php', {
            method: 'post',
            header: {
                'Accept': 'application/json',
                'Contect-type': 'application/json',
            },
            body: JSON.stringify({
                date: this.state.date,
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
            })
            .catch((error) => {
                console.error(error);
            });
    }

    /*Student Status List*/

    /*show Status*/
    showStatus = (context) => {
        fetch('http://192.168.68.112/ECB/count_finish.php', {
            method: 'post',
            header: {
                'Accept': 'application/json',
                'Contect-type': 'application/json',
            },
            body: JSON.stringify({
                context: context,
                class: getclass
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    all_num: Number.parseInt(responseJson[0]['count']),
                    finish_num: Number.parseInt(responseJson[1]['count']),
                    unfinish_num: Number.parseInt(responseJson[2]['count']),
                    percentage: parseInt(Number.parseInt(responseJson[1]['count'])/Number.parseInt(responseJson[0]['count'])*100
)                })
                })
                .catch((error) => {
                    console.error(error);
                });
        fetch('http://192.168.68.112/ECB/student_status.php', {
            method: 'post',
            header: {
                'Accept': 'application/json',
                'Contect-type': 'application/json',
            },
            body: JSON.stringify({
                context: context,
                class: getclass
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    statusSource: responseJson,
                    isLoading: false,
                    refreshing: false,
                })
                // alert(JSON.stringify(responseJson));
            })
            .catch((error) => {
                console.error(error);
            });
        this.setState({
            context: context,
        });
        this.popupDialog.show();
       
    }  

    /*Status FlatList Item*/
    renderStatus = ({ item, index }) => {
        return (
            <TouchableOpacity
            // onPress={}
            >
                <Row>
                    <Col size={3}></Col>
                    <Col size={75}>
                        <Text style={styles.text_2}>
                            {item.name}
                        </Text>
                    </Col>
                    <Col size={22}>
                        {item.finish == 0 ? <Text style={styles.not_finish}>未完成 </Text> : <Text style={styles.finish}>完成 </Text>}
                    </Col>
                </Row>

            </TouchableOpacity>
        )
    }
    /*Status Flatlist refresh */
    handleRefresh_Status = () => {
        fetch('http://192.168.68.112/ECB/student_status.php', {
            method: 'post',
            header: {
                'Accept': 'application/json',
                'Contect-type': 'application/json',
            },
            body: JSON.stringify({
                context: this.state.context,
                class: getclass
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    statusSource: responseJson,
                    isLoading: false,
                    refreshing: false,
                })
                // alert(JSON.stringify(responseJson))
            })
            .catch((error) => {
                console.error(error);
            });
    }
    startAnimation(){
        this.state.lineFillAnimation.setValue(0);
        // alert(this.state.finish_num)
        this.setState({

        })
        Animated.spring(
            this.state.lineFillAnimation,
            {
                toValue: this.state.finish_num*3,  // 设置进度值，范围：0～100
                friction: 5,   // 动画摩擦力
                tension: 20 // 动画张力
            }
        ).start();
        
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

    render() {
        global.getclass = this.props.navigation.getParam('class');
        const slideAnimation = new SlideAnimation({
            slideFrom: 'bottom',
        });
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
                            <TouchableOpacity onPress={() => this.forward()}>
                                <Icon
                                    name='arrow-right'
                                    type='EvilIcons'
                                    size={40}
                                    color='black'
                                    reverseColor='#ffffff'
                                >
                                </Icon>
                            </TouchableOpacity>

                        </Col>
                    </Row>
                    <Row size={6}>
                        <Col size={7.5}>
                            <Text style={{ fontSize: 35, textAlign: 'center', color:'black' }}>作業內容</Text>
                        </Col>

                    </Row>
                    <Row size={75}>
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

                    <PopupDialog
                        ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                        dialogTitle={<DialogTitle title={this.state.context} titleTextStyle={{ color:'black' ,fontWeight: 'bold', fontSize: 25,}} />}
                        height='0.6'
                   >
                        <Row size={20}  >
                            <Col size={8} justifyContent='center'>
                                <Text  style={styles.text} >完成人數：{this.state.finish_num}人</Text>
                            </Col>
                           <Col size={2} justifyContent='center'>
                             <AnimatedCircularProgress
                                        size={68}
                                        width={10}
                                        fill={this.state.percentage} 
                                        tintColor="#99CC66"
                                        rotation='0'
                                        backgroundColor='#003333'
                                        >
                                            {
                                                 (fill) => (
                                                     <Text style={styles.text_2} color='black'>
                                                           { parseInt(this.state.finish_num/this.state.all_num *100) }%
                                                      </Text>
                                                         )
                                             }
                              </AnimatedCircularProgress>
                              </Col>
                      
                        </Row>
                      
                        <Row size={10} style={{ backgroundColor: 'steelblue' }}>
                            <Col size={1}></Col>
                            <Col size={15}>
                                <Text style={styles.text_color} >
                                    學生名字
                            </Text>
                            </Col>
                            <Col size={20}></Col>
                            <Col size={15}>
                                <Text style={styles.text_color}>
                                    狀態
                            </Text>
                            </Col>
                        </Row>
                        <Row size={57}>
                            <FlatList
                                data={this.state.statusSource}

                                renderItem={this.renderStatus}

                                ItemSeparatorComponent={this.renderSeparator}
                                // keyExtractor={this.keyExtractor}
                                // extraData={this.state.activeRow}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.refreshing}
                                        onRefresh={this.handleRefresh_Status}
                                    />
                                }
                            />
                        </Row>
                    </PopupDialog>

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
        fontSize: 35,
        fontFamily: 'sans-serif-condensed',
        justifyContent: 'center',
        textAlign:'center',
        textAlignVertical:'center',
        color:'black'
    },
    text_2: {
        fontSize: 25,
        fontFamily: 'sans-serif-condensed',
        color:'black'
    },
    //    這邊改字
    date: {
        width: '100%',
    },
    finish: {
        color: 'green',
        //fontWeight: 'bold',
        fontSize: 25,
        fontFamily: 'sans-serif-condensed',
        textAlign: 'center'
    },
    not_finish: {
        color: 'red',
        //fontWeight: 'bold',
        fontSize: 25,
        fontFamily: 'sans-serif-condensed',
        textAlign: 'center'

    },
    text_color: {
        fontSize: 30,
        fontFamily: 'sans-serif-condensed',
        color: 'white',
        justifyContent: 'center',
        textAlign: 'center',
    },
});