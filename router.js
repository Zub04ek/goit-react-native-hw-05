import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./Screens/auth/LoginScreen";
import RegistrationScreen from "./Screens/auth/RegistrationScreen";
import { HomeScreen } from "./Screens/auth/HomeScreen";

const AuthStack = createStackNavigator();

export const useRoute = (isAuth) => {
  // if (!isAuth) {
  return (
    <AuthStack.Navigator initialRouteName="Log in">
      <AuthStack.Screen
        name="Log in"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="Sign up"
        component={RegistrationScreen}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
    </AuthStack.Navigator>
  );
  // }
  // return (
  //   <MainTab.Navigator screenOptions={{ tabBarShowLabel: false }}>
  //     <MainTab.Screen
  //       options={{
  //         tabBarIcon: ({ focused, size, color }) => (
  //           <AntDesign name="appstore-o" size={size} color={color} />
  //         ),
  //         title: "Posts",
  //       }}
  //       name="Posts"
  //       component={PostsScreen}
  //     />
  //     <MainTab.Screen
  //       options={{
  //         tabBarIcon: ({ focused, size, color }) => (
  //           <AntDesign name="pluscircle" size={size} color={color} />
  //         ),
  //         title: "Create post",
  //       }}
  //       name="Create"
  //       component={CreatePostsScreen}
  //     />
  //     <MainTab.Screen
  //       options={{
  //         tabBarIcon: ({ focused, size, color }) => (
  //           <AntDesign name="user" size={size} color={color} />
  //         ),
  //         title: "Profile",
  //       }}
  //       name="Profile"
  //       component={ProfileScreen}
  //     />
  //   </MainTab.Navigator>
  // );
};
