import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, PixelRatio,AsyncStorage} from "react-native";

import { View,  Image, Text, Navigator} from 'react-native-ui-lib';

import { Icon } from 'react-native-elements';
import { Col, Grid, Row } from 'react-native-easy-grid';

import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import FastImage from 'react-native-fast-image';

export default class main_1 extends Component {
    state = {
        avatarSource: null,
        videoSource: null
      };
    selectPhotoTapped() {
        const options = {
            title: '請選擇照片',
            quality: 1.0,
            cancelButtonTitle:'取消',
            takePhotoButtonTitle:'拍照',
            chooseFromLibraryButtonTitle:'從相簿中選擇',
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };
    
        ImagePicker.showImagePicker(options, (response) => {
          console.log('Response = ', response);
    
          if (response.didCancel) {
            console.log('User cancelled photo picker');
          }
          else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          }
          else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          }
          else {
            let source = { uri: response.uri };
    
            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };
    
            this.setState({
              avatarSource: source
            });
          }
        });
      }
    static propTypes = {};
    constructor() {
        super();
        this.state = {
            avatarSource: null,
            videoSource: null,
            data: null,
            imageuri: 'http://192.168.68.112/ECB/avatar/'+getid+'.png'
        };
        this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
    }
    selectPhotoTapped() {
        const options = {
            title: '請選擇照片',
            quality: 1.0,
            cancelButtonTitle:'取消',
            takePhotoButtonTitle:'拍照',
            chooseFromLibraryButtonTitle:'從相簿中選擇',
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };
    
        ImagePicker.showImagePicker(options, (response) => {
          console.log('Response = ', response);
    
          if (response.didCancel) {
            console.log('User cancelled photo picker');
          }
          else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          }
          else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          }
          else {
            let source = { uri: response.uri };
    
            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };
    
            this.setState({
              avatarSource: source,
            // You can also display the image using data:
            // const source = { uri: 'data:image/jpeg;base64,' + response.data };
              data: response.data
            });
            this.upload();
          }
        });
      }

    upload () {
        RNFetchBlob.fetch('POST', 'http://192.168.68.112/ECB/upload_image1.php', {
            Authorization : "Bearer access-token",
            otherHeader : "foo",
            'Content-Type' : 'multipart/form-data',
        }, [
            // element with property `filename` will be transformed into `file` in form data
            { name : 'image', filename : getid+'.png', type: 'image/png', data: this.state.data},
        ]).then((resp) => {
            // alert("Success: "+JSON.stringify(resp))
            this.forceUpdateHandler();
        }).catch((err) => {
            // alert("Error: "+JSON.stringify(err))
        })
    }

    onError(error){
        this.setState({ imageuri: 'http://192.168.68.112/ECB/avatar/error.png' })
    }

    forceUpdateHandler(){
        this.forceUpdate();
    };

        S_edit_pwd = () => {
        const { navigate } = this.props.navigation;
        navigate('S_edit_pwd',
            {
                child_id : this.props.navigation.getParam('id'),
                child_password : this.props.navigation.getParam('password'),
            });
    }
    logout = () => {
        const { navigate } = this.props.navigation;
        var keyValuePairs = [['rol', ''], ['Userid', ''], ['class1', ''], ['Userpassword', '']]
        AsyncStorage.multiSet(keyValuePairs, function (errs) {
            if (errs) {
                //TODO：存储出错 
                alert('存錯喔');
                return;
            } else {
                navigate('login',
                    {
                    });

            }
        });


    }

    render() {
        const getid = this.props.navigation.getParam('id');
        const getname = this.props.navigation.getParam('name');
        const getpassword = this.props.navigation.getParam('password');
        const getphone = this.props.navigation.getParam('phone');
        const getparent = this.props.navigation.getParam('parent');
        const getclass = this.props.navigation.getParam('class');
        
    return (
            <View style={styles.root}>
                <Image style={styles.bg}
                    source={{ uri: "http://192.168.68.112/ECB/images/background_login.jpg" }}
                />
                <Grid>
                <Row size={0.1}></Row>
                    <Row size={2.4} >
                        <Col size={0.2}></Col>
                        <Col size={3.8} >
                        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
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
                            </TouchableOpacity>
                        </Col>
                        <Col size={4}></Col>

                        </Row>
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
                                <Text style={styles.ico_text}>{JSON.parse(getname)}</Text>
                            </View>
                        </Col>
                     
                    </Row>
                    <Row >
                    <Col size={25} >
                            <View style={styles.ico}>
                            <Icon
                                    name='perm-identity'
                                    type='MaterialIcons'
                                    size={50}
                                    reverseColor='#ffffff'>
                                </Icon>
                            </View>
                        </Col>
                        <Col size={20} >
                            <View style={styles.center}>
                               <Text style={styles.lbtext}>帳號:</Text>
                            </View>
                        </Col>
                        <Col  size={55}>
                            <View style={styles.ico_textV}>
                                <Text style={styles.ico_text}>{JSON.parse(getid)}</Text>
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
                               <Text style={styles.lbtext}>手機:</Text>
                            </View>
                        </Col>
                        <Col  size={55}>
                            <View style={styles.ico_textV}>
                                <Text style={styles.ico_text}>{JSON.parse(getphone)}</Text>
                            </View>
                        </Col>
                    </Row>
                    <Row >
                        <Col size={25} >
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
                               <Text style={styles.lbtext}>家長手機:</Text>
                            </View>
                        </Col>
                        <Col  size={55}>
                            <View style={styles.ico_textV}>
                                <Text style={styles.ico_text}>{JSON.parse(getparent)}</Text>
                            </View>
                        </Col>
                     
                    </Row>
                    <Row >
                        <Col size={25} >
                            <View style={styles.ico}>
                            <Icon
                                    name='heartbeat'
                                    type='font-awesome'
                                    size={50}
                                    reverseColor='#ffffff'>
                                </Icon>
                              
                            </View>
                        </Col>
                        <Col size={20} >
                            <View style={styles.center}>
                               <Text style={styles.lbtext}>班級:</Text>
                            </View>
                        </Col>
                        <Col  size={55}>
                            <View style={styles.ico_textV}>
                                <Text style={styles.ico_text}>{JSON.parse(getclass)}</Text>
                            </View>
                        </Col>

                    </Row>
                    <Row size={0.5} >
                        <Col justifyContent='center'>
                            <TouchableOpacity
                                style={styles.buttonnew}
                                onPress={() => this.S_edit_pwd()}
                            >

                                <View center>
                                    <Text style={styles.editText}>更改密碼</Text>
                                </View>
                            </TouchableOpacity>
                        </Col>
                        <Col >
                            <TouchableOpacity
                                style={styles.buttonnew1}
                                onPress={() => this.logout()}
                            >
                                <View center>
                                    <Text style={styles.editText}>登出</Text>
                                </View>
                            </TouchableOpacity>
                        </Col>
                    </Row>

                </Grid>
                    {/* <TouchableOpacity style={[styles.buttonContainer, styles.signupButton]} onPress={() => this.S_edit_pwd()}>
                        <Text style={styles.signUpText}>更改密碼</Text>
                    </TouchableOpacity> */}
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
  
    buttonnew: {
        backgroundColor: "#99CCCC",
        width: '100%',
        height: '100%'

    },
    buttonnew1: {
        backgroundColor: "#4D9B9B",
        width: '100%',
        height: '100%'

    },
      editText: {
        color: 'white',
        fontSize: 30,

    },
    signupButton: {
        backgroundColor: "#99CCCC",
    },
    signUpText: {
        color: 'white',
        fontSize: 30
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    avatarContainer: {
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        borderRadius: 135,
        width: '100%',
        height: '100%'
    }


   

});
