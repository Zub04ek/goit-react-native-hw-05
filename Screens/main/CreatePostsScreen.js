import React, { useState, useEffect } from "react";
import { useNavigation, useIsFocused } from "@react-navigation/native";
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
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";

const initialState = {
  photo: null,
  title: "",
  location: {
    caption: "",
    latitude: null,
    longitude: null,
  },
};

const CreatePostsScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [camera, setCamera] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [isInputFocused, setInputFocused] = useState({
    title: false,
    location: false,
  });
  const [isFormFilled, setIsFormFilled] = useState(false);

  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("../../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../../assets/fonts/Roboto-Medium.ttf"),
  });

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      let { status: locationStatus } =
        await Location.requestForegroundPermissionsAsync();
      if (locationStatus !== "granted") {
        alert("Permission to access location was denied");
      }
      if (status === "granted" && locationStatus === "granted") {
        setHasPermission(status === "granted");
      }
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera or map</Text>;
  }
  if (!fontsLoaded) {
    return null;
  }

  const takePhoto = async () => {
    if (!hasPermission) {
      return;
    }
    const photo = await camera.takePictureAsync();
    setState((prevState) => {
      return { ...prevState, photo: photo.uri };
    });
  };

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

  const getLocation = async () => {
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
      maximumAge: 10000,
    });

    setState((prevState) => {
      return {
        ...prevState,
        location: { ...prevState.location, latitude, longitude },
      };
    });
  };

  const allDataFilled = () => {
    if (
      state.photo &&
      state.title &&
      state.location.caption &&
      state.location.latitude &&
      state.location.longitude
    ) {
      setIsFormFilled(true);
    } else {
      setIsFormFilled(false);
    }
  };

  const publish = () => {
    setIsShowKeyboard(false);
    navigation.navigate("Posts", { state });
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
              <View style={{ borderRadius: 8, overflow: "hidden" }}>
                {isFocused && (
                  <Camera style={styles.photoBox} ref={setCamera}>
                    {state.photo && (
                      <View style={{ borderRadius: 8 }}>
                        <Image
                          source={{ uri: state.photo }}
                          style={styles.photo}
                        />
                      </View>
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
                      onPress={takePhoto}
                    >
                      <MaterialIcons
                        name="photo-camera"
                        size={24}
                        color={!state.photo ? "#BDBDBD" : "#FFFFFF"}
                      />
                    </TouchableOpacity>
                  </Camera>
                )}
              </View>
              <TouchableOpacity onPress={pickImageAsync}>
                <Text style={styles.caption}>
                  {state.photo ? "Edit photo" : "Upload photo"}
                </Text>
              </TouchableOpacity>
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
                    value={state.location.caption}
                    onChangeText={(value) =>
                      setState((prevState) => {
                        return {
                          ...prevState,
                          location: { ...prevState.location, caption: value },
                        };
                      })
                    }
                    onFocus={async () => {
                      await getLocation();
                      setIsShowKeyboard(true);
                      setInputFocused((prev) => ({ ...prev, location: true }));
                      allDataFilled();
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
