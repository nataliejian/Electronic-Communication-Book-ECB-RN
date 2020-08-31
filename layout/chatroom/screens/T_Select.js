import React, { Component } from 'react';
import { View, Text, Button, Image, TouchableOpacity } from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { Col, Grid, Row } from 'react-native-easy-grid';

export default class Example extends Component {
    state = {
        classroomid: null,
        showLoading: false
    };



    componentWillMount(){
        this.setState({ showLoading: true});
        fetch('http://192.168.68.112/ECB/chatroom_class_teacher.php',{
        method:'post',
        header:{
            'Accept':'application/json',
            'Contect-type': 'application/json',
        },
        body:JSON.stringify({
            id : getid
        })
       }).then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                classroomid:(responseJson.data[0]['roomid'])
            })
        })
      .catch((error) =>{
        console.error(error);
      });
      }

      render() {
        if(this.state.showLoading === true) {
            return (

            <View style={styles.flexContainer}>
                <Image
                    style={styles.bg}
                    source={{ uri: "http://192.168.68.112/ECB/images/background_login.jpg" }}
                />
                <Grid>
                    <Row size={0.2}/>
                    <Row  size={1}>
                        <TouchableOpacity
                            onPress={this.props.enterChat}
                            style={styles.BtnBG}
                        >
                            {/* <Icon name='edit'
                                type='Image'
                                size={100}></Icon> */}
                                {/* 如果你想配圖再跟我說 */}
                            <Text style={styles.BtnText}>聯絡家長</Text>
                        </TouchableOpacity>
                    </Row>
                    <Row size={1}>
                        <TouchableOpacity
                            onPress={this.props.enterSelect}
                            // onPress={() => {alert(this.state.classroomid);}}
                            style={styles.BtnBG}
                        >
                            {/* <Icon name='chrome-reader-mode'
                                type='MaterialIcons'
                                size={100}></Icon> */}
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
