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

    edit = () => {
        var jsonobj = '';
        const { o_pwd } = this.state;
        const { n_pwd } = this.state;
        const { navigate } = this.props.navigation;
        const { teacher_id } = this.props.navigation.state.params;
        const { teacher_password } = this.props.navigation.state.params;
        if ('"' + o_pwd + '"' == teacher_password) {
            fetch('http://192.168.68.112/ECB/T_edit_pwd.php', {
                method: 'post',
                header: {
                    'Accept': 'application/json',
                    'Contect-type': 'application/json',
                },
                body: JSON.stringify({
                    old_password: o_pwd,
                    new_password: n_pwd,
                    id: teacher_id.substring(1, teacher_id.length - 1),
                })
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    jsonobj = responseJson;
                    const { navigate } = this.props.navigation;

                    alert("更改完成！");

                    navigate('login', {});

                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            Alert.alert('警告', '舊密碼有誤，請在輸入一次');
        }
    }


    render() {
        return (
            <View style={styles.flexContainer}>

                <Image
                    style={styles.bg}
                    source={{ uri: "http://192.168.68.112/ECB/images/background_login.jpg" }}
                />

                <View style={styles.inputContainer}>
                    <Icon marginLeft={15}
                        name='key'
                        type='font-awesome'
                        color='#336699'
                        size={30}
                    /><TextInput style={styles.inputs}

                        placeholder="舊密碼"
                        underlineColorAndroid='transparent'
                        numberofLines={1}
                        onChangeText={o_pwd => this.setState({ o_pwd })}
                        ref={ref => this.textInputname = ref} />
                </View>

                <View style={styles.inputContainer}>
                    <Icon marginLeft={20}
                        name='key'
                        type='foundation'
                        color='#336699'
                        size={30}
                    />
                    <TextInput style={styles.inputs}
                        placeholder="新密碼"
                        underlineColorAndroid='transparent'
                        numberofLines={1}
                        maxLength={10}
                        //  
                        onChangeText={n_pwd => this.setState({ n_pwd })}
                        ref={ref => this.textInputname = ref}
                    />
                </View>

                <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]}
                    onPress={() => this.edit()}
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
