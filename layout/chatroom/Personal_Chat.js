import React from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import SocketIOClient from 'socket.io-client';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

const USER_ID = '@userId';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      // userId: null
      userId: this.props.navigation.getParam('name')
    };
    this.userId = this.props.navigation.getParam('name');
    this.othersId = this.props.navigation.getParam('othersname');
    this.determineUser = this.determineUser.bind(this);
    this.onReceivedMessage = this.onReceivedMessage.bind(this);
    this.onSend = this.onSend.bind(this);
    this._storeMessages = this._storeMessages.bind(this);

    this.socket = SocketIOClient('http://192.168.68.112:3000');
    var str = 'message';
    this.socket.on(str, this.onReceivedMessage);
    var socket_port1 = 'message/'+this.userId+'/'+this.othersId;
    var socket_port2 = 'message/'+this.othersId+'/'+this.userId;
    
    this.socket.on(socket_port1, this._storeMessages);
    this.socket.on(socket_port2, this._storeMessages);
    this.determineUser();
  }

  determineUser() {
    this.socket.emit('getPreMessages_personal', this.userId, this.othersId);
  }

  onReceivedMessage(messages) {
    this._storeMessages(messages);
  }

  onSend(messages=[]) {
    this.socket.emit('personal_message', messages[0]);
    // this._storeMessages(messages);
  }

  renderBubble(props) {
    if (props.isSameUser(props.currentMessage, this.userId) && props.isSameDay(props.currentMessage, props.previousMessage)) {
      return (
        <Bubble
          {...props}
        />
      );
    }
    return (
      <View>
        <Text>{props.currentMessage.user.name}</Text>
        <Bubble
          {...props}
        />
      </View>
    );
  }

  render() {
    global.getname = this.props.navigation.getParam('name');
    global.getothersname = this.props.navigation.getParam('othersname');
    // alert('P: '+getParent_name+' T: '+getTeacher_name)
    var user = { _id: this.state.userId || -1 ,name:getname,others:getothersname};
    // alert(JSON.stringify(user))

    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        user={user}
        renderBubble={this.renderBubble}
      />
    );
  }

  // Helper functions
  _storeMessages(messages) {
    this.setState((previousState) => {
      // alert(JSON.stringify(previousState.messages))
      // alert(JSON.stringify(messages))
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }
}

module.exports = Main;