import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    Image,
    Alert, ScrollView
} from 'react-native';
import { View } from 'react-native-ui-lib';
import { Icon } from 'react-native-elements';
export default class SignUpView extends Component {

    register = () => {
        var jsonobj = '';
        const { t_name } = this.state;
        const { t_password } = this.state;
        const { t_id } = this.state;
        const { t_phone } = this.state;
        const { t_class } = this.state;
        const { navigate } = this.props.navigation;

        fetch('http://192.168.68.112/ECB/register.php', {
            method: 'post',
            header: {
                'Accept': 'application/json',
                'Contect-type': 'application/json',
            },
            body: JSON.stringify({
                id: t_id,
                name: t_name,
                password: t_password,
                phone: t_phone,
                class: t_class
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                jsonobj = responseJson;
                const { navigate } = this.props.navigation;
                if (t_id != null && t_password != null && t_name != null && t_phone != null && t_class != null ){
                    var res = (JSON.parse(JSON.stringify(jsonobj[0])));
                    if (res == "success") {
                    }
                    alert("註冊成功，請登入");

                    navigate('login',
                        {
                        });

                }else{
                    Alert.alert('警告', '請正確填寫每個欄位！');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (
            <View style={styles.flexContainer}>

                <Image
                    style={styles.bg}
                    source={require('../../images/background_login.jpg') }
                />

                <ScrollView  >
                    <View center style={{top:45}}>

                        {/* scroll view可能不需要 需要實機測試 */}
                        <View style={styles.inputContainer}>

                            <Icon marginLeft={15}
                                name='numeric'
                                type='material-community'
                                color='black'
                                size={35}
                            />
                            <TextInput style={styles.inputs}
                                placeholder="教職員編號"
                                underlineColorAndroid='transparent'//限制輸入框底線為透明
                                numberofLines={1}//限制一行
                                onChangeText={t_id => this.setState({ t_id })}
                                ref={ref => this.textInputname = ref}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Icon marginLeft={15}
                                name='vcard'
                                type='font-awesome'
                                color='black'
                                size={35}
                            /><TextInput style={styles.inputs}

                                placeholder="姓名"
                                underlineColorAndroid='transparent'
                                numberofLines={1}
                                onChangeText={t_name => this.setState({ t_name })}
                                ref={ref => this.textInputname = ref} />
                        </View>

                        <View style={styles.inputContainer}>
                            <Icon marginLeft={15}
                                name='key'
                                type='octicon'
                                color='black'
                                size={35}
                            />
                            <TextInput style={styles.inputs}
                                placeholder="Password"
                                secureTextEntry={true}
                                numberofLines={1}
                                underlineColorAndroid='transparent'
                                onChangeText={t_password => this.setState({ t_password })}
                                ref={ref => this.textInputname = ref}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Icon marginLeft={20}
                                name='telephone'
                                type='foundation'
                                color='black'
                                size={35}
                            />
                            <TextInput style={styles.inputs}
                                placeholder="電話"
                                underlineColorAndroid='transparent'
                                numberofLines={1}
                                maxLength={10}
                                //  
                                keyboardType="phone-pad"//彈出數字輸入
                                onChangeText={t_phone => this.setState({ t_phone })}
                                ref={ref => this.textInputname = ref}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Icon marginLeft={15}
                                name='mortar-board'
                                type='font-awesome'
                                color='black'
                                size={35}
                            />
                            <TextInput style={styles.inputs}
                                placeholder="班級"

                                underlineColorAndroid='transparent'
                                numberofLines={1}
                                onChangeText={t_class => this.setState({ t_class })}
                                ref={ref => this.textInputname = ref} />
                        </View>

                    </View>

                </ScrollView>

                <View center>
                    <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]}
                        onPress={() => this.register()}              >

                        <Text style={styles.signUpText}>Sign up</Text>
                    </TouchableHighlight>
                </View>
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
        borderBottomColor: '#ABCACE',
        backgroundColor: '#ABCACE',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 350,
        height: 60,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 43,
        flexDirection: 'row',
        alignItems: 'center',

    },
  
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
        fontSize: 22,
        color: 'black'
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
        backgroundColor: "#3691A1",
    },
    signUpText: {
        color: 'white',
        fontSize: 40
    },

});
