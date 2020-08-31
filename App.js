import { StackNavigator } from 'react-navigation';
import React from 'react';

/*ChatRoom*/
import T_Select from './layout/chatroom/T_Select';
import T_List_Stu from './layout/chatroom/T_List_Stu';
import Personal_Chat from './layout/chatroom/Personal_Chat';
import Class_Chat from './layout/chatroom/Class_Chat';

import Main from './layout/all/Main';
/*Common*/
import login from './layout/all/login';
import register from './layout/all/register';
/*Home */
import Home_T from './layout/teacher/main';
import Home_S from './layout/student/main';
import Home_P from './layout/parents/main';
/*Personal Data */
import T_Personal from './layout/teacher/information_t';
import S_Personal from './layout/student/information_s';
import S_Personal_P from './layout/student/information_s_edit';
/*Add Student*/
import S_add_P from './layout/student/S_add_P';
import S_TCB_Main from './layout/student/contact_book_main';
import S_edit_pwd from'./layout/student/S_edit_pwd'
import S_agenda from './layout/student/S_agenda' ;
/*Parent*/
import P_Personal from './layout/parents/information_p';
import P_Choose_Child from './layout/parents/choose_child';
import P_TCB_Main from './layout/parents/contact_book_main';
import P_edit_pwd from './layout/parents/P_edit_pwd'
import P_agenda from './layout/parents/P_agenda' ;
/*Teacher*/
import Addstudent from './layout/teacher/addstudent';
import Showstudent from './layout/teacher/allstudents';
import Studentinformation from './layout/teacher/information_t-s';
import T_TCB_Main from './layout/teacher/contact_book_main';
import T_TCB_Read from './layout/teacher/t_contact_book_read';
import T_TCB_Modify from './layout/teacher/contact_book_modify';
import T_TCB_Edit from './layout/teacher/contact_book_edit';
import T_TCB_Add from './layout/teacher/contact_book_add';
import T_TCB_P_Check from './layout/teacher/contact_book_parent_check';
import T_edit_pwd from './layout/teacher/T_edit_pwd'
import T_agenda from './layout/teacher/T_agenda' ;

export const Application = StackNavigator({
  Main: {
    screen: Main,
    navigationOptions: {
    header:null
    },
  },

  /*聊天室*/
    T_Select: {
      screen: T_Select,
      navigationOptions: {
      header:null
      },
    },
    T_List_Stu: {
      screen: T_List_Stu,
      navigationOptions: {
      header:null
      },
    },
    Personal_Chat: {
      screen: Personal_Chat,
      navigationOptions: {
      header:null
      },
    },
    Class_Chat: {
      screen: Class_Chat,
      navigationOptions: {
      header:null
      },
    },


    /*共同部份*/
    login: {
      screen: login,
      navigationOptions: {
      header:null
      },
    },
    register: {
      screen: register,
      navigationOptions: {
        header:null
      },
    },
    /*Teacher*/
    Home_T : {
      screen:Home_T,
      navigationOptions: {
        header:null
      },
    },
    Addstudent: {
      screen: Addstudent,
      navigationOptions: {
        header:null
      },
    },
    Showstudent: {
      screen: Showstudent,
      navigationOptions: {
        header:null
      },
    },
    Studentinformation: {
      screen: Studentinformation,
      navigationOptions: {
        header:null
      },
    },
    T_TCB_Main: {
      screen: T_TCB_Main,
      navigationOptions: {
        header:null
      },
    },
    T_TCB_Edit: {
      screen: T_TCB_Edit,
      navigationOptions: {

        header:null
      },
    },
    T_TCB_Add: {
      screen: T_TCB_Add,
      navigationOptions: {

        header:null
      },
    },
    T_TCB_Modify: {
      screen: T_TCB_Modify,
      navigationOptions: {

        header:null
      },
    },
    T_TCB_Read: {
      screen: T_TCB_Read,
      navigationOptions: {
        header:null
      },
    },
    T_Personal: {
      screen: T_Personal,
      navigationOptions: {
        header:null
      },
    },
    T_TCB_P_Check: {
      screen: T_TCB_P_Check,
      navigationOptions: {
        header:null
      },
    },
    T_edit_pwd :{
      screen:T_edit_pwd,
      navigationOptions: {
      header:null
    },
},
    T_agenda :{
      screen:T_agenda,
      navigationOptions: {
      header:null
    },
},
    /*Student*/
    Home_S: {
      screen: Home_S,
      navigationOptions: {
        header:null
      },
    },
    S_Personal :{
      screen:S_Personal,
      navigationOptions: {
        header:null
      },
    },
    S_Personal_P :{
      screen:S_Personal_P,
      navigationOptions: {
      header:null
    },
},
    S_add_P :{
      screen:S_add_P,
       navigationOptions: {
      header:null
    },
},
    S_edit_pwd :{
      screen:S_edit_pwd,
       navigationOptions: {
      header:null
    },
},
    S_TCB_Main :{
      screen:S_TCB_Main,
       navigationOptions: {
      header:null
    },
},
    S_agenda :{
      screen:S_agenda,
      navigationOptions: {
      header:null
    },
},
    /*Parent*/
    Home_P: {
      screen: Home_P,
      navigationOptions: {
        header:null
      },
    },
    P_Personal: {
      screen: P_Personal,
      navigationOptions: {
        header:null
      },
    },
    P_TCB_Main: {
      screen: P_TCB_Main,
      navigationOptions: {
        header:null
      },
    },
    P_edit_pwd :{
      screen:P_edit_pwd,
      navigationOptions: {
      header:null
    },
},
    P_Choose_Child: {
      screen: P_Choose_Child,
      navigationOptions: {
        header:null
      },
    },
    P_agenda :{
      screen:P_agenda,
      navigationOptions: {
      header:null
    },
},
});

export default class App extends React.Component {
  render() {
    return (
      <Application />
    
    );
  }
}
