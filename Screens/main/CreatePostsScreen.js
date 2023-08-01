import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Keyboard,
  KeyboardAvoidingView,
  Image,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  ScrollView,
} from "react-native";
import { AntDesign, MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import * as ImagePicker from "expo-image-picker";
import { postsData } from "../../data/posts";

const initialState = {
  photo: null,
  title: "",
  location: "",
};

const CreatePostsScreen = () => {
  const navigation = useNavigation();
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [isInputFocused, setInputFocused] = useState({
    title: false,
    location: false,
  });
  const [isFormFilled, setIsFormFilled] = useState(false);

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
      setState((prevState) => {
        return { ...prevState, photo: result.assets[0].uri };
      });
    } else {
      !state.photo && alert("You did not select any image.");
    }
  };

  const imageSource = state.photo && { uri: state.photo };

  const allDataFilled = () => {
    if (state.photo && state.title && state.location) {
      setIsFormFilled(true);
    } else {
      setIsFormFilled(false);
    }
  };

  const publish = () => {
    setIsShowKeyboard(false);
    console.log("state", state);
    postsData.push({
      id: state.title,
      photo: state.photo,
      title: state.title,
      location: state.location,
      comments: 0,
      likes: 0,
    });
    navigation.navigate("Posts");
    Keyboard.dismiss();
    setState(initialState);
    setIsFormFilled(false);
  };

  const deletePost = () => {
    setState(initialState);
    setIsFormFilled(false);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        setIsShowKeyboard(false);
      }}
    >
      <>
        <View style={styles.container}>
          <ScrollView>
            <View>
              <View style={styles.photoBox}>
                {state.photo && (
                  <Image source={imageSource} style={styles.photo} />
                )}
                <TouchableOpacity
                  style={
                    !state.photo
                      ? { ...styles.camera, backgroundColor: "#FFFFFF" }
                      : {
                          ...styles.camera,
                          backgroundColor: "rgba(255, 255, 255, 0.30)",
                        }
                  }
                  onPress={pickImageAsync}
                >
                  <MaterialIcons
                    name="photo-camera"
                    size={24}
                    color={!state.photo ? "#BDBDBD" : "#FFFFFF"}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.caption}>
                {state.photo ? "Edit photo" : "Upload photo"}
              </Text>
            </View>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : ""}
            >
              <View style={styles.form}>
                <TextInput
                  value={state.title}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, title: value }))
                  }
                  onFocus={() => {
                    setIsShowKeyboard(true);
                    setInputFocused((prev) => ({ ...prev, title: true }));
                  }}
                  onBlur={() => {
                    setInputFocused((prev) => ({ ...prev, title: false }));
                    allDataFilled();
                  }}
                  style={
                    isInputFocused.title
                      ? {
                          ...styles.input,
                          borderBottomColor: "#FF6C00",
                          fontFamily: "Roboto-Medium",
                        }
                      : {
                          ...styles.input,
                          borderBottomColor: "#E8E8E8",
                          fontFamily: "Roboto-Medium",
                        }
                  }
                  placeholder="Title..."
                  placeholderTextColor="#BDBDBD"
                />
                <View>
                  <SimpleLineIcons
                    style={styles.locationIcon}
                    name="location-pin"
                    size={24}
                    color="#BDBDBD"
                  />
                  <TextInput
                    value={state.location}
                    onChangeText={(value) =>
                      setState((prevState) => ({
                        ...prevState,
                        location: value,
                      }))
                    }
                    onFocus={() => {
                      setIsShowKeyboard(true);
                      setInputFocused((prev) => ({ ...prev, location: true }));
                    }}
                    onBlur={() => {
                      setInputFocused((prev) => ({ ...prev, location: false }));
                      allDataFilled();
                    }}
                    style={
                      isInputFocused.location
                        ? {
                            ...styles.input,
                            borderBottomColor: "#FF6C00",
                            fontFamily: "Roboto-Regular",
                            paddingLeft: 28,
                          }
                        : {
                            ...styles.input,
                            borderBottomColor: "#E8E8E8",
                            fontFamily: "Roboto-Regular",
                            paddingLeft: 28,
                          }
                    }
                    placeholder="Location..."
                    placeholderTextColor="#BDBDBD"
                  />
                </View>
              </View>
              <TouchableOpacity
                style={
                  isFormFilled
                    ? {
                        ...styles.button,
                        backgroundColor: "#FF6C00",
                        marginBottom: isShowKeyboard ? 32 : 0,
                      }
                    : {
                        ...styles.button,
                        backgroundColor: "#F6F6F6",
                        marginBottom: isShowKeyboard ? 32 : 0,
                      }
                }
                onPress={publish}
                disabled={isFormFilled ? false : true}
              >
                <Text
                  style={
                    isFormFilled
                      ? { ...styles.buttonText, color: "#FFFFFF" }
                      : { ...styles.buttonText, color: "#BDBDBD" }
                  }
                >
                  Publish
                </Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.deleteBtn} onPress={deletePost}>
            <AntDesign name="delete" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </View>
      </>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
  },
  photoBox: {
    height: 240,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  photo: {
    height: 240,
    borderRadius: 8,
  },
  camera: {
    position: "absolute",
    top: 90,
    left: (Dimensions.get("window").width - 32) / 2 - 30,
    padding: 18,
    width: 60,
    borderRadius: 60 / 2,
  },
  caption: {
    marginTop: 8,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  input: {
    borderBottomWidth: 1,
    paddingTop: 16,
    paddingBottom: 15,
    fontSize: 16,
    lineHeight: 19,
  },
  form: {
    marginTop: 32,
    marginBottom: 32,
    gap: 16,
  },
  locationIcon: {
    position: "absolute",
    top: 16,
  },
  button: {
    borderRadius: 100,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 118,
    paddingRight: 118,
  },
  buttonText: {
    fontFamily: "Roboto-Regular",
    textAlign: "center",
    fontSize: 16,
    lineHeight: 19,
  },
  footer: {
    backgroundColor: "#ffffff",
    alignItems: "center",
  },
  deleteBtn: {
    width: 70,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 23,
    paddingRight: 23,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    marginTop: 9,
    marginBottom: 9,
  },
});

export default CreatePostsScreen;
