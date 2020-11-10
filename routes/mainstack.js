import {
    createStackNavigator,
    TransitionPresets,
  } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Chat from "../screens/Chat";
import Splash from "../screens/splash";
import LogList from "../screens/logList";

  const screens = {
    Splash: {
      screen: Splash,
      navigationOptions: () => {
            return {
                headerShown: false,
            };  
        }  
    },
    LogList: {
      screen: LogList,
      navigationOptions: () => {
        return {
            headerShown: true,
        };  
      }  
    },
    Chat: {
        screen: Chat,
        navigationOptions: () => {
          return {
            headerShown: true,
          };
        },
      },
  }

  const MainStack = createStackNavigator(screens, {
    initialRouteName: "Splash",
    defaultNavigationOptions: {
      ...TransitionPresets.FadeFromBottomAndroid,
    },
  });

  export default createAppContainer(MainStack);