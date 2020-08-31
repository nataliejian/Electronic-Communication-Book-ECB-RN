import React, { Component } from "react";
import { StyleSheet, FlatList } from "react-native";
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
        fetch('http://192.168.68.112/ECB/chatroom_list.php', {
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
                    dataSource: responseJson,
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
                        backgroundColor='#FFCCCC'

                        // onLoadStart={this.onLoadStart(NS)}
                        // onError={this.onError.bind(this)}
                    />
                </Col>


                       <Col size={8.5}>

                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center' }}
                        onPress={this.chatWithparent.bind(this, item.parent_name)}>
                        <Text style={{ fontSize: 28, marginBottom: 15, marginLeft: 5, fontFamily: 'sans-serif-condensed', color: 'black' }}>
                            {item.student_name}
                        </Text>

                        <Text style={{ fontSize: 28, marginBottom: 15, marginLeft: 5, fontFamily: 'sans-serif-condensed', color: 'black' }}>
                            {item.parent_name}
                        </Text>
                    </TouchableOpacity>
                </Col>
            </Grid>
        )
    }

    chatWithparent(parent_name) {
        const { navigate } = this.props.navigation;
        navigate('Personal_Chat',
            {
                othersname: parent_name,
                name: getname
            });
        // alert(parent_name)
    }

    renderSeparator = () => {
        return (
            <View
                style={{ height: 2, width: '100%', backgroundColor: 'black' }} />
        )
    }

    render() {
        global.getname = this.props.navigation.getParam('name');
        global.getclass = this.props.navigation.getParam('class');

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
