import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  ScrollView,
  FlatList,
} from "react-native";
import { useFonts } from "expo-font";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import { Card } from "../../components/Card";
import { postsData } from "../../data/posts";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState(null);

  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("../../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../../assets/fonts/Roboto-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  const removeAvatar = () => {
    setSelectedImage(null);
  };

  const imageSource = selectedImage !== null && { uri: selectedImage };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("../../assets/images/Photo-BG.jpg")}
      >
        <FlatList
          style={styles.list}
          data={postsData}
          renderItem={({ item }) => <Card item={item} />}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={() => (
            <View style={styles.box}>
              <View style={styles.photoBox}>
                {selectedImage ? (
                  <>
                    <Image source={imageSource} style={styles.avatar} />
                    <TouchableOpacity
                      style={styles.photoIconRemove}
                      onPress={removeAvatar}
                    >
                      <Image source={require("../../assets/remove.png")} />
                    </TouchableOpacity>
                  </>
                ) : (
                  <TouchableOpacity
                    style={styles.photoIconAdd}
                    onPress={pickImageAsync}
                  >
                    <Image source={require("../../assets/add.png")} />
                  </TouchableOpacity>
                )}
              </View>
              <TouchableOpacity
                style={styles.logoutIcon}
                onPress={() => navigation.navigate("Log in")}
              >
                <MaterialIcons name="logout" size={24} color="#BDBDBD" />
              </TouchableOpacity>
              <Text style={styles.title}>User Name</Text>
            </View>
          )}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    height: Dimensions.get("window").height,
    resizeMode: "cover",
  },
  box: {
    position: "relative",
    marginTop: 147,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingLeft: 16,
    paddingRight: 16,
  },
  photoBox: {
    position: "absolute",
    top: -60,
    left: 131,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  photoIconAdd: {
    position: "absolute",
    bottom: 14,
    right: -12,
  },
  photoIconRemove: {
    position: "absolute",
    bottom: 8.82,
    right: -17.18,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  logoutIcon: {
    position: "absolute",
    right: 0,
    paddingTop: 22,
    paddingBottom: 22,
    paddingLeft: 16,
    paddingRight: 16,
  },
  title: {
    fontFamily: "Roboto-Medium",
    fontWeight: "500",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
    marginTop: 92,
    marginBottom: 33,
  },
  item: {
    height: 300,
  },
});

export default ProfileScreen;
