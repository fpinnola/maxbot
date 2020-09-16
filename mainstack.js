import {
    createStackNavigator,
    TransitionPresets,
  } from "react-navigation-stack";
  import { createAppContainer } from "react-navigation";
  import Chat from "./Chat";
import Splash from "./splash";

  const screens = {
    Splash: {
      screen: Splash,
      navigationOptions: () => {
            return {
                headerShown: false,
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