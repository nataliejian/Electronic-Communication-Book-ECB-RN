import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, } from 'react-native-ui-lib';
import { StyleSheet, FlatList, RefreshControl, Alert } from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';
import moment from 'moment';
import {Agenda} from 'react-native-calendars';

export default class AgendaScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      date: moment().format('YYYY-MM-DD'),
    };
  }

  render() {
    global.getclass = this.props.navigation.getParam('class');
    return (
      <Agenda
        items={this.state.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
      />
    );
  }

  loadItems(day) { 
    fetch('http://192.168.68.112/ECB/agenda.php', {
        method: 'post',
        header: {
            'Accept': 'application/json',
            'Contect-type': 'application/json',
        },
        body: JSON.stringify({
            date: this.state.date,
            class: getclass,
        })
    })
        .then((response) => response.json())
        .then((responseJson) => {
          const newItems = [];
          for (let i = -15; i < 85; i++) {
            const time = day.timestamp + i * 24 * 60 * 60 * 1000;
            const strTime = this.timeToString(time);
            if (!newItems[strTime]) {
              newItems[strTime] = [];

            }
          }
          responseJson.forEach(function(v) {
            if(Object.keys(newItems[v.deadline]).length === 0){
              newItems[v.deadline].push({
                text : v.context,
                height: 15
              });
            } else {
              newItems[v.deadline].push({
                text : v.context,
                height: newItems[v.deadline].height + 30
              });
            }
          });

          
          Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
          this.setState({ 
            items: newItems
          });
        })
        .catch((error) => {
          console.error(error);
        });
  }

  renderItem(item) {
    return (
      <View style={[styles.item, {height: item.height}]}><Text>{item.text}</Text></View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>今天沒有行程哦！</Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 10,
    padding: 20,
    marginRight: 10,
    marginTop: 25,
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  }
});
