import React, { Component } from "react";
import { StyleSheet, FlatList, BackHandler} from "react-native";
import { View, Image, TouchableOpacity, Text } from 'react-native-ui-lib';
import { Grid, Row, Col } from 'react-native-easy-grid';
import FastImage from 'react-native-fast-image';

export default class main extends React.Component {
    constructor() {
        super()
        this.state = {
            dataSource: [],
            isLoading: true,
            imageuri: {uri: 'http://192.168.68.112/ECB/avatar/error.png',cache:FastImage.cacheControl.web}
        }
    }
    
    componentDidMount() {
        fetch('http://192.168.68.112/ECB/studentlist.php', {
            method: 'post',
            header: {
                'Accept': 'application/json',
                'Contect-type': 'application/json',
            },
            body: JSON.stringify({
                class: getclass
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    dataSource: responseJson.data,
                    isLoading: false
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    renderItem = ({ item }) => {
        const imageuri= {uri: 'http://192.168.68.112/ECB/avatar/'+item.NS+'.png',cache:FastImage.cacheControl.web}
        return (
            <Grid>
                <Col size={0.2}></Col>

                <Col size={2}>
               
                    <FastImage
                        style={styles.avatar}
                        source={imageuri}
                        backgroundColor='#FFffff'
          
                        // onLoadStart={this.onLoadStart(NS)}
                        // onError={this.onError.bind(this)}
                    />
                </Col>


                <Col size={8.5}>

                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center' }}
                        onPress={this.showinformation.bind(this, item.NS)}>
                        <Text style={{ fontSize: 28, marginBottom: 15, marginLeft: 5, fontFamily: 'sans-serif-condensed', color: 'black' }}>
                            {item.NS}
                        </Text>

                        <Text style={{ fontSize: 28, marginBottom: 15, marginLeft: 5, fontFamily: 'sans-serif-condensed', color: 'black' }}>
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                </Col>
            </Grid>
        )
    }

    showinformation(NS) {
        const { navigate } = this.props.navigation;
        navigate('Studentinformation',
            {
                NS: NS
            });
    }

    renderSeparator = () => {
        return (
            <View
                style={{ height: 2, width: '100%', backgroundColor: 'black' }} />
        )
    }

    addstudent = () => {
        const { navigate } = this.props.navigation;
        navigate('Addstudent',
            {
                id: getid,
                password: getpwd,
                class: getclass
            });
    }

    render() {
        global.getid = this.props.navigation.getParam('id');
        global.getpwd = this.props.navigation.getParam('password');
        global.getclass = this.props.navigation.getParam('class');
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            return false;
        });
        
        return (
            <View style={styles.root}>
                <Image
                    style={styles.bg}
                    source={{ uri: "http://192.168.68.112/ECB/images/background_login.jpg" }}
                />

                <View height='90%'>

                    <FlatList
                        data={this.state.dataSource}
                        renderItem={this.renderItem}
                        ItemSeparatorComponent={this.renderSeparator}
                        keyExtractor={(item, index) => index}
                    />
                </View>
                <TouchableOpacity
                    style={styles.BtnBG}
                    onPress={() => this.addstudent()}
                >
                    <Text style={styles.BtnText}>新  增  學  生</Text>
                </TouchableOpacity>
            </View>

        );
    }
}
const styles = StyleSheet.create({
    root: {
        flex: 1
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
        fontWeight: '400',
        color: "#fff",
        textAlign: 'center',
        fontFamily: 'sans-serif-condensed'
    },

    BtnBG: {
        backgroundColor: "#cd5c5c",
        paddingHorizontal: 30,
        paddingVertical: 5,
        borderRadius: 30,
        height: 60
    },
    avatar: {
        borderRadius: 135,
        width: '100%',
        height: '100%'
    }
});
