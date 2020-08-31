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
    // this.messages = [];
    this.userId = this.props.navigation.getParam('name');
    this.chatId = this.props.navigation.getParam('class');
    this.determineUser = this.determineUser.bind(this);
    this.onReceivedMessage = this.onReceivedMessage.bind(this);
    this.onSend = this.onSend.bind(this);
    this._storeMessages = this._storeMessages.bind(this);
    this.socket = SocketIOClient('http://192.168.68.112:3000');
    this.socket.on('message', this.onReceivedMessage);
    var name = this.userId;
    var chatId = this.chatId;
    this.socket.on('message/'+chatId, this.onReceivedMessage);
    this.determineUser();
  }

  determineUser() {
    this.socket.emit('getPreMessages_class', this.userId, this.chatId);
  }

  onReceivedMessage(messages) {
    this._storeMessages(messages);
  }

  onSend(messages=[]) {
    this.socket.emit('class_message', messages[0]);
    this._storeMessages(messages);
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
    global.getclass = this.props.navigation.getParam('class');  
    var user = { _id: this.state.userId || -1 ,name:getname,chatId:getclass};
    
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        user={user}
        renderBubble={this.renderBubble.bind(this)}
      />
    );
  }

  // Helper functions
  _storeMessages(messages) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }
}

module.exports = Main;
