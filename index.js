import { AppRegistry } from 'react-native';
import App from './App';
console.ignoredYellowBox = ['Warning: BackAndroid is deprecated. Please use BackHandler instead.','source.uri should not be an empty string','Invalid props.style key'];
 
console.disableYellowBox = true // 關閉全部黄色警告
AppRegistry.registerComponent('ECB_V2', () => App);
