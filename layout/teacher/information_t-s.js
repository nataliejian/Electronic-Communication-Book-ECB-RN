import React, { Component } from "react";
import { StyleSheet, Alert, Linking} from "react-native";
import { View,  Image, TouchableOpacity, TextInput, Text } from 'react-native-ui-lib';
import { Icon } from 'react-native-elements';
import { Col, Grid, Row } from 'react-native-easy-grid';
import FastImage from 'react-native-fast-image';

export default class main_1 extends Component {
    constructor() {
        super();
        
        this.state = {
            name: '',
            parent_name: '',
            parent_phone: '',
            password: '',
            class: '',
            phone: '',
            // avatarSource: null,
            // videoSource: null,
            // data: null,
            // imageuri: 'http://192.168.68.112/ECB/avatar/'+getNS+'.png'
   };
}
    componentDidMount() {
        fetch('http://192.168.68.112/ECB/studentdata.php',{
            method:'post',
            header:{
                'Accept':'application/json',
                'Contect-type': 'application/json',
            }, 
            body:JSON.stringify({
                NS : getNS
            })  
        })
      .then((response) => response.json())
      .then((responseJson) => {
            this.setState({ 
                name : (responseJson[0].name),
                parent_name : (responseJson[0].parent_name),
                parent_phone : (responseJson[0].parent_phone),
                password: (responseJson[0].password),
                class: (responseJson[0].class),
                phone: (responseJson[0].phone),
            })
            // alert(JSON.stringify(responseJson))
      })
      .catch((error) => {
        console.error(error);
      });
    }

    // onError(error){
    //     this.setState({ imageuri: 'http://192.168.68.112/ECB/avatar/error.png' })
    // }

    render() {
        global.getNS = this.props.navigation.getParam('NS');
        return (
            <View style={styles.root}>
                <Image style={styles.bg}
             source={{ uri: "http://192.168.68.112/ECB/images/background_login.jpg" }}
                />
                <Grid>
                    {/* <Row size={1.5}>
                            <Col size={3}>
                                    <View style={[styles.avatar, styles.avatarContainer]}>
                                    
                                    { this.state.avatarSource === null ? 
                                        <FastImage style={styles.avatar} 
                                                    source={{uri: this.state.imageuri,
                                                            cache:FastImage.cacheControl.web
                                                    }}
                                                    onError={this.onError.bind(this)} 
                                        />
                                        :
                                        <FastImage style={styles.avatar} 
                                                    source={this.state.avatarSource
                                                            // cache:FastImage.cacheControl.web
                                                    }
                                                    onError={this.onError.bind(this)} 
                                        />
                                    }
                                    </View>
                            </Col>
                            <Col size={4}></Col>
                        </Row> */}
                    <Row>
                        <Col size={25} >
                            <View style={styles.ico}>
                            <Icon
                                    name='pricetag-multiple'
                                    type='foundation'
                                    size={50}
                                    reverseColor='#ffffff'>
                                </Icon>
                              
                            </View>
                        </Col>
                        <Col size={20} >
                            <View style={styles.center}>
                               <Text style={styles.lbtext}>姓名:</Text>
                            </View>
                        </Col>
                        <Col  size={55}>
                            <View style={styles.ico_textV}>
                                <Text style={styles.ico_text}>{this.state.name}</Text>
                            </View>
                        </Col>
                     
                    </Row>
                    <Row  >
                    <Col  size={25} >
                            <View style={styles.ico}>
                            <Icon
                                    name='users'
                                    type='feather'
                                    size={50}
                                    reverseColor='#ffffff'>
                                </Icon>
                            </View>
                        </Col>
                        <Col size={20} >
                            <View style={styles.center}>
                               <Text style={styles.lbtext}>家長:</Text>
                            </View>
                        </Col>
                        <Col size={55}>
                            <View style={styles.ico_textV}>
                                <Text style={styles.ico_text}>{this.state.parent_name}</Text>
                            </View>
                        </Col>
                          
                    </Row>
                    <Row >
                    <Col size={25}>
                            <View style={styles.ico}>
                            <Icon
                                    name='phone'
                                    type='font-awesome'
                                    size={50}
                                    reverseColor='#ffffff'>
                                </Icon>
                            </View>
                        </Col>
                        <Col size={20} >
                            <View style={styles.center}>
                               <Text style={styles.lbtext}>家長手機:</Text>
                            </View>
                        </Col>
                        <Col  size={55}>
                            {/* <View style={styles.ico_textV}>
                                <Text style={styles.ico_text}>{this.state.parent_phone}</Text>
                            </View> */}
                            <TouchableOpacity style={styles.ico_textV} onPress={() => Linking.openURL(`tel:${this.state.parent_phone}`)}>
                                <Text style={styles.ico_text}>{this.state.parent_phone}</Text>
                            </TouchableOpacity>
                        </Col>
                    </Row>
                    {this.state.parent_name==null?
                        Alert.alert(
                            '無此學生之家長資訊',
                            '請此學生立即填入家長資訊',
                            [
                              {text: 'OK', onPress: () => console.log('OK Pressed')},
                            ],
                            { cancelable: false }
                          ):null
                    }
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
        width: '100%',
        height: '100%',
        position: "absolute",
    },
    ico: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        flex: 1
    },
    ico_textV: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        flex: 1,
    
    },
    ico_text:{
        fontSize: 28,
        color:'black'
    },
    lbtext:{
        fontSize: 28,
        textAlign:'center',
        color:'black'
      
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
  

});
