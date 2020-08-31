import React, { Component } from "react";
import { StyleSheet, BackHandler} from "react-native";
import { View, Text, Image, TouchableOpacity } from 'react-native-ui-lib';
import { Icon } from 'react-native-elements';
import { Col, Grid, Row } from 'react-native-easy-grid';
export default class main extends React.Component {

    ppersonal = () =>{
        const { navigate } = this.props.navigation;
        fetch('http://192.168.68.112/ECB/parentdata.php',{
        method:'post',
        header:{
            'Accept':'application/json',
            'Contect-type': 'application/json',
        },
        body:JSON.stringify({
            phone : getid
        })
       }).then((response) => response.json())
        .then((responseJson) => {
            // alert(JSON.stringify(responseJson))
            navigate('P_Personal',
            {
                phone:JSON.stringify(responseJson.data[0].phone),
                name:JSON.stringify(responseJson.data[0].name),
                password:JSON.stringify(responseJson.data[0].password),
                class:JSON.stringify(responseJson.data[0].class),
                child:JSON.stringify(responseJson.data[0].child)
            });
        })
      .catch((error) =>{
        console.error(error);
      });
    }

    connectbook = () => {
        const { navigate } = this.props.navigation;
        fetch('http://192.168.68.112/ECB/judge_student.php',{
        method:'post',
        header:{
            'Accept':'application/json',
            'Contect-type': 'application/json',
        },
        body:JSON.stringify({
            phone : getid
        })
       }).then((response) => response.json())
        .then((responseJson) => {
            if(((responseJson).length)>1){
                navigate('P_Choose_Child',
                {
                    phone:getid,
                });
            }else{
                navigate('P_TCB_Main',
                {
                    phone:getid,
                    NS: responseJson[0]['NS'],
                    student_name: responseJson[0]['name'],
                    class: responseJson[0]['class'],
                });
            }
        })
      .catch((error) =>{
        console.error(error);
      });

    }

    agenda = () => {
        const { navigate } = this.props.navigation;
        fetch('http://192.168.68.112/ECB/P_agenda.php',{
        method:'post',
        header:{
            'Accept':'application/json',
            'Contect-type': 'application/json',
        },
        body:JSON.stringify({
            phone : getid
        })
       }).then((response) => response.json())
        .then((responseJson) => {
                navigate('P_agenda',
                {
                    phone:getid,
                    NS: responseJson[0]['NS'],
                    student_name: responseJson[0]['name'],
                    class: responseJson[0]['class'],
                });
        })
      .catch((error) =>{
        console.error(error);
      });

    }

    chatroom = () =>{
        fetch('http://192.168.68.112/ECB/chatroom_p2t.php',{
        method:'post',
        header:{
            'Accept':'application/json',
            'Contect-type': 'application/json',
        },
        body:JSON.stringify({
            phone : getid
        })
       }).then((response) => response.json())
        .then((responseJson) => {
            const { navigate } = this.props.navigation;
            navigate('Personal_Chat',
                {
                    name: responseJson[0]['parent_name'],
                    othersname: responseJson[0]['teacher_name']
                });
            // alert('p :'+JSON.stringify(responseJson[0]['parent_name'])+' t: '+ JSON.stringify(responseJson[0]['teacher_name']))
            // alert(JSON.stringify(responseJson))
        })
      .catch((error) =>{
        console.error(error);
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

                            <TouchableOpacity onPress={() => this.ppersonal(getid)}>
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
                        <Col >
                           <View center>
                            <Image style={styles.img}
                                     source={{ uri: "http://192.168.68.112/ECB/images/ecb_l.png" }}
                            />
                            </View>
                        </Col>
                    </Row>
                    <Row size={3}>
                        <Col justifyContent='center'>
                            <TouchableOpacity onPress={() => this.chatroom()} >
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


    //
    flexContainer: {
        //     // 容器需要添加direction才能变成让子元素flex
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between'
    },
    // circle:{
    //     borderWidth: 1,
    //     borderRadius:200
    // }
    font: {
        textAlign: 'center',
        // fontWeight: 'bold',
        fontSize: 40,
        color:'black'
    },
    font1: {
        textAlign: 'center',
        // fontWeight: 'bold',
        fontSize: 33,
        color:'black'
    },
    img:{
        justifyContent: 'center',
    alignItems: 'center',
    height:170,
    width:'98%'
    },
    //

});
