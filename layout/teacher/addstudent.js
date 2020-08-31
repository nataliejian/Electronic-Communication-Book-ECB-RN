import React, { Component } from "react";
import { View, StyleSheet, Text, TextInput, Image, TouchableOpacity, Alert } from "react-native";
import { Grid, Row, Col } from 'react-native-easy-grid';
export default class Addstudent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      student_id : null,
      student_password : null,
      student_name : null,
    }
}
  add = () => {
    const { navigate } = this.props.navigation;
    if (this.state.student_password != null && this.state.student_name != null && getclass != null && this.state.student_id != null) {
    fetch('http://192.168.68.112/ECB/addstudent.php', {
      method: 'post',
      header: {
        'Accept': 'application/json',
        'Contect-type': 'application/json',
      },
      body: JSON.stringify({
        NS: this.state.student_id,
        birthday: this.state.student_password,
        name: this.state.student_name,
        class: getclass
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        //這邊需要修改 未輸入學生案新增學生按鈕
        if (this.state.student_password != null && this.state.student_name != null && getclass != null && this.state.student_id != null) {
          var res = (JSON.parse(JSON.stringify(responseJson[0])));
          if (res != "Wrong") {
            this.textInputname.clear();
            this.textInputbirthday.clear();
            this.textInputSN.clear();
          }
        } else {
          Alert.alert("錯誤", "請輸入完整");
        }
      })
      .catch((error) => {
        console.error(error);
      });
    }else{
      Alert.alert("錯誤", "請輸入完整");
    }
  }
  render() {
    global.getclass = this.props.navigation.getParam('class');

    return (
      <View style={styles.root}>
        <Image
          style={styles.bg}
          source={{ uri: "http://192.168.68.112/ECB/images/background_login.jpg" }}
        />
        <Grid>
          <Row size={0.2}></Row>
          <Row size={2}>
            <Col >
              <View >
                <Image style={styles.img}
                  source={{ uri: "http://192.168.68.112/ECB/images/ecb_add.png" }}
                // source={require("../../image/ecb_add.png")}
                />
              </View>
            </Col>


          </Row>
          <Row size={1}>
            <Col justifyContent='center' size={2}>
              <Text style={styles.text}>名字:</Text></Col>
            <Col justifyContent='center' size={4}>
              <TextInput style={styles.input}

                placeholder="請輸入名字"
                onChangeText={student_name => this.setState({ student_name })}
                ref={ref => this.textInputname = ref}
              />

            </Col>
          </Row>

          <Row size={1} >
            <Col justifyContent='center' size={2}>
              <Text style={styles.text}>生日:</Text>
            </Col>
            <Col justifyContent='center' size={4}>
              <TextInput style={styles.input}
                placeholder="請輸入生日"
                onChangeText={student_password => this.setState({ student_password })}
                ref={ref => this.textInputbirthday = ref}
              />

            </Col>


          </Row>
          <Row size={1} >
            <Col justifyContent='center' size={2}>
              <Text style={styles.text}>學號:</Text>
            </Col>
            <Col justifyContent='center' size={4}>
              <TextInput
                style={styles.input}
                placeholder="請輸入學號"
                onChangeText={student_id => this.setState({ student_id })}
                ref={ref => this.textInputSN = ref}
              />
            </Col>

          </Row>
          <Row size={0.5} >
            <Col>
              <TouchableOpacity style={styles.bt} onPress={() => this.add()}>
                <Text style={styles.bttext}>新    增</Text>
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
  text: {
    fontSize: 30,
    textAlign: 'center',
    color: 'black'

  },
  input: {
    fontSize: 30,
  },
  bt: {
    borderRadius: 20,
    height: 60,
    backgroundColor: '#A9D5EE',
    justifyContent: 'center',
    alignItems: 'center',

  },

  bttext: {
    fontSize: 40,
    textAlign: 'center',
    color: 'black'

  },
  img: {
    top: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 130,
    width: 400
  }
});
