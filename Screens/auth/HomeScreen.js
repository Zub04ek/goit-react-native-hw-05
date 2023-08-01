import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

import PostsScreen from "../main/PostsScreen";
import CreatePostsScreen from "../main/CreatePostsScreen";
import ProfileScreen from "../main/ProfileScreen";
import CommentsScreen from "../main/CommentsScreen";

const MainTab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeTabs = () => {
  const navigation = useNavigation();
  return (
    <MainTab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "#212121",
        tabBarIcon: ({ focused, size, color }) => {
          const icons = {
            Posts: "appstore-o",
            "Create post": "plus",
            Profile: "user",
          };

          return (
            <View
              style={
                focused
                  ? { ...styles.background, backgroundColor: "#FF6C00" }
                  : { ...styles.background, backgroundColor: "#FFFFFF" }
              }
            >
              <AntDesign name={icons[route.name]} size={size} color={color} />
            </View>
          );
        },
      })}
    >
      <MainTab.Screen
        options={{
          headerTitleAlign: "center",
          headerStyle: {
            borderWidth: 1,
            borderColor: "#BDBDBD",
          },
          headerRight: () => (
            <TouchableOpacity
              style={styles.logoutIcon}
              onPress={() => navigation.navigate("Log in")}
            >
              <MaterialIcons name="logout" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
        }}
        name="Posts"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarStyle: { display: "none" },
          headerTitleAlign: "center",
          headerStyle: {
            borderWidth: 1,
            borderColor: "#BDBDBD",
          },
          headerLeft: () => (
            <TouchableOpacity
              style={styles.goBackIcon}
              onPress={() => navigation.navigate("Posts")}
            >
              <MaterialIcons
                name="keyboard-backspace"
                size={24}
                color="black"
              />
            </TouchableOpacity>
          ),
        }}
        name="Create post"
        component={CreatePostsScreen}
      />
      <MainTab.Screen
        options={{
          headerShown: false,
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};

export const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeTabs}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          tabBarStyle: { display: "none" },
          headerTitleAlign: "center",
          headerStyle: {
            borderWidth: 1,
            borderColor: "#BDBDBD",
          },
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  background: {
    paddingVertical: 8,
    paddingHorizontal: 23,
    borderRadius: 35,
  },
  logoutIcon: {
    padding: 16,
  },
  goBackIcon: {
    padding: 16,
  },
});
