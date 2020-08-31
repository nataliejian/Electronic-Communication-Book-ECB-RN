import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    Image,
    Alert, ScrollView
} from 'react-native';

import { Icon } from 'react-native-elements';
export default class SignUpView extends Component {

    register = () => {
        var jsonobj = '';
        const { p_name } = this.state;
        const { p_phone } = this.state;
        const { s_phone } = this.state;
        const { navigate } = this.props.navigation;
        const { child_id } = this.props.navigation.state.params;
        if (p_name != null && p_phone != null && child_id != null && s_phone != null) {
            fetch('http://192.168.68.112/ECB/parent_add.php', {
                method: 'post',
                header: {
                    'Accept': 'application/json',
                    'Contect-type': 'application/json',
                },
                body: JSON.stringify({
                    student_phone: s_phone,
                    parent_phone: p_phone,
                    name: p_name,
                    c_id: child_id.substring(1, child_id.length - 1),
                })
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    jsonobj = responseJson;
                    const { navigate } = this.props.navigation;

                    alert("輸入完成！");

                    navigate('Home_S', {});

                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            Alert.alert('警告', '請正確填寫每個欄位！');
        }
    }
    //        info = () => {
    //        const { navigate } = this.props.navigation;
    //        navigate('SPersonal',
    //            {
    //            });
    //    }

    render() {
        return (
            <View style={styles.flexContainer}>

                <Image
                    style={styles.bg}
                    source={{ uri: "http://192.168.68.112/ECB/images/background_login.jpg" }}
                />

                <View style={styles.inputContainer}>
                    <Icon marginLeft={20}
                        name='telephone'
                        type='foundation'
                        color='#336699'
                        size={30}
                    />
                    <TextInput style={styles.inputs}
                        placeholder="學生電話"
                        underlineColorAndroid='transparent'
                        numberofLines={1}
                        maxLength={10}
                        //  
                        keyboardType="phone-pad"//彈出數字輸入
                        onChangeText={s_phone => this.setState({ s_phone })}
                        ref={ref => this.textInputname = ref}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Icon marginLeft={15}
                        name='vcard'
                        type='font-awesome'
                        color='#336699'
                        size={30}
                    /><TextInput style={styles.inputs}

                        placeholder="家長姓名"
                        underlineColorAndroid='transparent'
                        numberofLines={1}
                        onChangeText={p_name => this.setState({ p_name })}
                        ref={ref => this.textInputname = ref} />
                </View>

                <View style={styles.inputContainer}>
                    <Icon marginLeft={20}
                        name='telephone'
                        type='foundation'
                        color='#336699'
                        size={30}
                    />
                    <TextInput style={styles.inputs}
                        placeholder="家長電話"
                        underlineColorAndroid='transparent'
                        numberofLines={1}
                        maxLength={10}
                        //  
                        keyboardType="phone-pad"//彈出數字輸入
                        onChangeText={p_phone => this.setState({ p_phone })}
                        ref={ref => this.textInputname = ref}
                    />
                </View>


                <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]}
                    onPress={() => this.register()}
                >

                    <Text style={styles.signUpText}>確定</Text>
                </TouchableHighlight>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    flexContainer: {

        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bg: {
        top: 0,
        left: 0,
        position: "absolute",
        width: "100%",
        height: "100%"
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 350,
        height: 60,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',

    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
        fontSize: 22
    },

    buttonContainer: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
    },
    signupButton: {
        backgroundColor: "#99CCCC",
    },
    signUpText: {
        color: 'white',
        fontSize: 30
    },

});