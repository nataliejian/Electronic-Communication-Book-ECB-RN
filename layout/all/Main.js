import React, { Component } from "react";
import { StyleSheet, AsyncStorage, BackHandler, } from "react-native";
import { View, Text, Image, } from 'react-native-ui-lib';
export default class main extends React.Component {

    componentDidMount() {
        this.getStorage().done();

        var _that = this;
        var keys = ["rol", "Userid", "class1", "Userpassword"];
        AsyncStorage.multiGet(keys, function (errs, result) {
            if (errs) {
                alert('錯誤');
                return;
            }
            _that.setState({
                rol: (result[0][1] != null) ? result[0][1] : '',//if result[0][1]不為空 傳回01 為空傳回''
                Userid: (result[1][1] != null) ? result[1][1] : '',
                class1: (result[2][1] != null) ? result[2][1] : '',
                Userpassword: (result[3][1] != null) ? result[3][1] : ''
            });

        });

    }

    getStorage = async () => {
        try {
            await AsyncStorage.multiGet(['rol', 'Userid', 'Userpassword']).then((data) => {

                if (data[0][1] == null) {

                    const { navigate } = this.props.navigation;
                    navigate('login');
                }
                else if (data[0][1].match('1')) {
                    id = data[1][1];
                    password = data[2][1];
                    const { navigate } = this.props.navigation;
                    navigate('Home_T',
                        {
                            id, password,
                        });
                } else if (data[0][1].match('2')) {
                    id = data[1][1];
                    password = data[2][1];
                    const { navigate } = this.props.navigation;
                    navigate('Home_S',
                        {
                            id, password,
                        });
                } else if (data[0][1].match('3')) {
                    id = data[1][1];
                    password = data[2][1];
                    const { navigate } = this.props.navigation;
                    navigate('Home_P',
                        {
                            id, password,
                        });
                }

            });
        } catch (error) {
            console.log(error);
        }

    }



    render() {
        return (

            <View >

            </View>

        );
    }
}
