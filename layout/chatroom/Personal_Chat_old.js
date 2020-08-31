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
    this.socket.on('message', this.onReceivedMessage);
    this.determineUser();
  }

  /**
   * When a user joins the chatroom, check if they are an existing user.
   * If they aren't, then ask the server for a userId.
   * Set the userId to the component's state.
   */
  determineUser() {
    // AsyncStorage.getItem(USER_ID)
    //   .then((userId) => {
    //     // If there isn't a stored userId, then fetch one from the server.
    //     if (!userId) {
    //       this.socket.emit('userJoined', null);
    //       this.socket.on('userJoined', (userId) => {
    //         AsyncStorage.setItem(USER_ID, userId);
    //         this.setState({ userId });
    //       });
    //     } else {
    //       this.socket.emit('userJoined', userId);
    //       this.setState({ userId });
    //     }
    //   })
    //   .catch((e) => alert(e));
    this.socket.emit('getPreMessages_personal', this.userId, this.othersId);
  }

  // Event listeners
  /**
   * When the server sends a message to this.
   */
  onReceivedMessage(messages) {
    // alert(JSON.stringify(messages))
    this._storeMessages(messages);
  }

  /**
   * When a message is sent, send the message to the server
   * and store it in this component's state.
   */
  onSend(messages=[]) {
    // alert(JSON.stringify(messages))
    this.socket.emit('message', messages[0]);
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