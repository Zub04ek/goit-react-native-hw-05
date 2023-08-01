import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import { useFonts } from "expo-font";
import { Card } from "../../components/Card";
import { useRoute } from "@react-navigation/native";
import { postsData } from "../../data/posts";

const PostsScreen = () => {
  const [posts, setPosts] = useState(postsData);

  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("../../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("../../assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={posts}
        renderItem={({ item }) => {
          return posts.length > 0 && <Card item={item} />;
        }}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => (
          <View style={styles.userCard}>
            <View style={styles.userPhoto}></View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>User name</Text>
              <Text style={styles.userEmail}>User email</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 32,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: 32,
  },
  userPhoto: {
    width: 60,
    height: 60,
    backgroundColor: "#E5E5E5",
    borderRadius: 16,
  },
  userName: {
    fontFamily: "Roboto-Bold",
    fontWeight: "700",
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
  },
  userEmail: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    lineHeight: 13,
    color: "rgba(33, 33, 33, 0.8)",
  },
});

export default PostsScreen;
