import React from "react";
import { StyleSheet, Text, View, Navigator, BackHandler, ActivityIndicator, } from "react-native";
import { ChatManager, TokenProvider } from "@pusher/chatkit";

import ClassChat from "./ClassChat";

const instanceLocatorId = "550f91e6-5b77-49ea-b730-0e40e2149b95";
const presenceRoomId = 19374242; // room ID of the general room created through the chatKit inspector
const chatServer = "http://192.168.68.112:3000/users";

const tokenProvider = new TokenProvider({
  url: `https://us1.pusherplatform.io/services/chatkit_token_provider/v1/${instanceLocatorId}/token`
});

export default class ChatRoom extends React.Component {

  state = {
    userHasLoggedIn: false,
    //currentScreen: "select",
    username: this.props.navigation.getParam('name'),
    users: [],
    presenceRoomId: null,
    currentRoomId: null,
    chatWithUser: null,
    message: "",
    messages: [],
    chatWithUserIsTyping: false,
    refreshing: false,
    inChatRoom: false,
    //classroomid: null
  };

  componentWillMount(){
    //alert('this is S_ChatRoom')
  var jsonobj='';
  fetch('http://192.168.68.112/ECB/chatroom_class_teacher.php',{
  method:'post',
  header:{
      'Accept':'application/json',
      'Contect-type': 'application/json',
  },
  body:JSON.stringify({
      id : getid
  })
 }).then((response) => response.json())
  .then((responseJson) => {
      jsonobj=responseJson;
      this.setState({
          classroomid:(responseJson.data[0]['roomid'])
      })
  })
.catch((error) =>{
  console.error(error);
});
// this.enterSelect()
}

  constructor(props) {
    super(props);
    this.currentUser = null;
    this.roomId = null;
    this.chatWithUser = null;
  }

  render() {
    return (
      <View style={styles.container}>

        {this.state.currentScreen == "classchat" && (
          <ClassChat
            message={this.state.message}
            backToSelect={this.backToSelect}
            updateMessage={this.updateMessage}
            sendMessage={this.sendMessage}
            chatWithUser={this.state.chatWithUser}
            chatWithUserIsTyping={this.state.chatWithUserIsTyping}
            messages={this.state.messages}
            refreshing={this.state.refreshing}
            loadPreviousMessages={this.loadPreviousMessages}
            setScrollViewRef={this.setScrollViewRef}
            inChatRoom={this.state.inChatRoom}
          />
        )}
      </View>
    );
  }

  backToSelect = () => {
    this.currentUser
      .leaveRoom({ roomId: this.roomId })
      .then(room => {
        this.currentUser.roomSubscriptions[this.roomId].cancel();
        this.currentUser = null;
        this.roomId = null;

        this.setState({
          currentScreen: "select",
          messages: [],
          presenceRoomId: null,
          currentRoomId: null,
          inChatRoom: false,
          users: [],
          userHasLoggedIn: false
        });
      })
      .catch(err => {
        console.log(
          `something went wrong while trying to leave the room: ${err}`
        );
      });
  }

  enterClassChat = () => {
    this.roomId = Number.parseInt(this.state.classroomid,10);
    //this.chatWithUser = chatWith;

    this.currentUser
      .subscribeToRoom({
        roomId:this.roomId,
        hooks: {
          onNewMessage: this.onReceiveMessage,
          onUserStartedTyping: this.onUserTypes,
          onUserStoppedTyping: this.onUserNotTypes
        },
        messageLimit: 5
      })
      .then(room => {
        this.setState({
          inChatRoom: true
        });
        console.log(`successfully subscribed to room`);
      })
      .catch(err => {
        console.log(`error subscribing to room: ${err}`);
      });

    this.setState({
      currentScreen: "classchat",
      currentRoomId: this.roomId,

      //chatWithUser: chatWith
    });
  }

  enterSelect = () => {
    fetch(chatServer, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username
      })
    })
      .then(response => {
        this.chatManager = new ChatManager({
          instanceLocator: `v1:us1:${instanceLocatorId}`,
          userId: this.state.username,
          tokenProvider
        });

        this.chatManager
          .connect()
          .then(currentUser => {
            this.currentUser = currentUser;

            this.setState({
              presenceRoomId: presenceRoomId
            });

            currentUser
              .subscribeToRoom({
                roomId: presenceRoomId,
                hooks: {
                  onUserCameOnline: this.handleInUser,
                  onUserJoinedRoom: this.handleInUser,
                  onUserLeftRoom: this.handleOutUser,
                  onUserWentOffline: this.handleOutUser
                }
              })
              .then(room => {
                let new_users = [];
                room.users.forEach(user => {
                  if (user.id != this.currentUser.id) {
                    let is_online =
                      user.presence.state == "online" ? true : false;

                    new_users.push({
                      id: user.id,
                      name: user.name,
                      is_online
                    });
                  }
                });

                this.setState({
                  userHasLoggedIn: true,
                  users: new_users
                });
              })
              .catch(err => {
                console.log(`Error joining room ${err}`);
              });
          })
          .catch(error => {
            console.log("error with chat manager", error);
          });
      })
      .catch(error => {
        console.log("error in request: ");
      });
      this.enterClassChat();
  }

  enterChat = () => {
    fetch(chatServer, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username
      })
    })
      .then(response => {
        this.chatManager = new ChatManager({
          instanceLocator: `v1:us1:${instanceLocatorId}`,
          userId: this.state.username,
          tokenProvider
        });

        this.chatManager
          .connect()
          .then(currentUser => {
            this.currentUser = currentUser;

            this.setState({
              presenceRoomId: presenceRoomId
            });

            currentUser
              .subscribeToRoom({
                roomId: presenceRoomId,
                hooks: {
                  onUserCameOnline: this.handleInUser,
                  onUserJoinedRoom: this.handleInUser,
                  onUserLeftRoom: this.handleOutUser,
                  onUserWentOffline: this.handleOutUser
                }
              })
              .then(room => {
                let new_users = [];
                room.users.forEach(user => {
                  if (user.id != this.currentUser.id) {
                    let is_online =
                      user.presence.state == "online" ? true : false;

                    new_users.push({
                      id: user.id,
                      name: user.name,
                      is_online
                    });
                  }
                });

                this.setState({
                  userHasLoggedIn: true,
                  users: new_users
                });
              })
              .catch(err => {
                console.log(`Error joining room ${err}`);
              });
          })
          .catch(error => {
            console.log("error with chat manager", error);
          });
      })
      .catch(error => {
        console.log("error in request: ");
      });

    this.setState({
      currentScreen: "users"
    });
  };

  handleInUser = user => {
    let currentUsers = [...this.state.users];
    let userIndex = currentUsers.findIndex(item => item.id == user.id);

    if (userIndex != -1) {
      currentUsers[userIndex]["is_online"] = true;
    }

    if (user.id != this.currentUser.id && userIndex == -1) {
      currentUsers.push({
        id: user.id,
        name: user.name,
        is_online: true
      });
    }

    this.setState({
      users: currentUsers
    });
  };

  sortUsers = users => {
    return users.slice().sort((x, y) => {
      return y.is_online - x.is_online;
    });
  };

  handleOutUser = user => {
    let users = [...this.state.users];
    let new_users = users.filter(item => {
      if (item.id == user.id) {
        item.is_online = false;
      }
      return item;
    });

    this.setState({
      users: new_users
    });
  };

  backToUsers = () => {
    this.currentUser
      .leaveRoom({ roomId: this.roomId })
      .then(room => {
        this.currentUser.roomSubscriptions[this.roomId].cancel();

        this.roomId = null;
        this.chatWithUser = null;

        this.setState({
          currentScreen: "users",
          messages: [],
          currentRoomId: null,
          chatWithUser: null,
          inChatRoom: false
        });
      })
      .catch(err => {
        console.log(
          `something went wrong while trying to leave the room: ${err}`
        );
      });
  };

  beginChat = user => {
    let roomName = [user.id, this.currentUser.id];
    roomName = roomName.sort().join("_") + "_room";

    this.currentUser
      .getJoinableRooms()
      .then(rooms => {
        var chat_room = rooms.find(room => {
          return room.name == roomName;
        });

        if (!chat_room) {
          this.currentUser
            .createRoom({
              name: roomName,
              private: false // so they could find it in joinable rooms
            })
            .then(room => {
              this.subscribeToRoom(room.id, user.id);
            })
            .catch(err => {
              console.log(`error creating room ${err}`);
            });
        } else {
          this.subscribeToRoom(chat_room.id, user.id);
        }
      })
      .catch(err => {
        console.log(`error getting joinable rooms: ${err}`);
      });
  };

  subscribeToRoom = (roomId, chatWith) => {
    this.roomId = roomId;
    this.chatWithUser = chatWith;

    this.currentUser
      .subscribeToRoom({
        roomId: roomId,
        hooks: {
          onNewMessage: this.onReceiveMessage,
          onUserStartedTyping: this.onUserTypes,
          onUserStoppedTyping: this.onUserNotTypes
        },
        messageLimit: 5
      })
      .then(room => {
        this.setState({
          inChatRoom: true
        });
        console.log(`successfully subscribed to room`);
      })
      .catch(err => {
        console.log(`error subscribing to room: ${err}`);
      });

    this.setState({
      currentScreen: "chat",
      currentRoomId: roomId,
      chatWithUser: chatWith
    });
  };

  onReceiveMessage = message => {
    let isCurrentUser = this.currentUser.id == message.sender.id ? true : false;

    let messages = [...this.state.messages];
    messages.push({
      key: message.id.toString(),
      username: message.sender.name,
      msg: message.text,
      datetime: message.createdAt,
      isCurrentUser
    });

    this.setState(
      {
        messages
      },
      () => {
        this.scrollViewRef.scrollToEnd({ animated: true });
      }
    );
  };

  onUserTypes = user => {
    this.setState({
      chatWithUserIsTyping: true
    });
  };

  onUserNotTypes = user => {
    this.setState({
      chatWithUserIsTyping: false
    });
  };

  leavePresenceRoom = () => {
    this.currentUser
      .leaveRoom({ roomId: this.state.presenceRoomId })
      .then(room => {
        this.currentUser.roomSubscriptions[this.state.presenceRoomId].cancel();
        this.currentUser = null;
        this.setState({
          presenceRoomId: null,
          users: [],
          userHasLoggedIn: false,
          currentScreen: "select"
        });

      })
      .catch(err => {
        console.log(
          `error leaving presence room ${this.state.presenceRoomId}: ${err}`
        );
      });
  };

  updateMessage = message => {
    this.setState({
      message
    });

    this.currentUser.isTypingIn({ roomId: this.state.currentRoomId });
  };

  sendMessage = () => {
    if (this.state.message) {
      this.currentUser
        .sendMessage({
          text: this.state.message,
          roomId: this.state.currentRoomId
        })
        .then(messageId => {
          this.setState({
            message: ""
          });
        })
        .catch(err => {
          console.log(`error adding message to room: ${err}`);
        });
    }
  };

  loadPreviousMessages = () => {
    const oldestMessageId = Math.min(
      ...this.state.messages.map(m => parseInt(m.key))
    );

    this.setState({
      refreshing: true
    });

    this.currentUser
      .fetchMessages({
        roomId: this.state.currentRoomId,
        initialId: oldestMessageId,
        direction: "older",
        limit: 5
      })
      .then(messages => {
        let currentMessages = [...this.state.messages];
        let old_messages = [];

        messages.forEach(msg => {
          let isCurrentUser =
            this.currentUser.id == msg.sender.id ? true : false;

          old_messages.push({
            key: msg.id.toString(),
            username: msg.sender.name,
            msg: msg.text,
            datetime: msg.createdAt,
            isCurrentUser
          });
        });

        currentMessages = old_messages.concat(currentMessages);

        this.setState({
          refreshing: false,
          messages: currentMessages
        });
      })
      .catch(err => {
        console.log(`error loading previous messages: {$err}`);
      });
  };

  setScrollViewRef = ref => {
    this.scrollViewRef = ref;
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
