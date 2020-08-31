import {BackHandler} from "react-native";
import navigation from 'react-navigation';
export function BackListener(routeName) {
    if (routeName=='Home_T'||routeName=='Home_S'||routeName=='Home_P') {
        BackHandler.exitApp();
        return true;
    }else{
        this.props.navigation.pop();
        return true;
    }
}