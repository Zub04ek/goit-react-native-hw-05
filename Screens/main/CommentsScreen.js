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
  FlatList,
} from "react-native";
import {
  AntDesign,
  Ionicons,
  MaterialIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { useFonts } from "expo-font";
import * as ImagePicker from "expo-image-picker";
import { Comment } from "../../components/Comment";
import { comments } from "../../data/comments";

const initialState = {
  photo: "",
  comment: "",
};

const CommentsScreen = () => {
  const navigation = useNavigation();
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [isCommentFocused, setCommentFocused] = useState(false);
  const [isFormFilled, setIsFormFilled] = useState(false);

  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("../../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../../assets/fonts/Roboto-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const imageSource = state.photo && { uri: state.photo };

  const allDataFilled = () => {
    if (state.comment) {
      setIsFormFilled(true);
    } else {
      setIsFormFilled(false);
    }
  };

  const publish = () => {
    if (!isFormFilled) {
      console.log("rejected");
      return;
    }
    setIsShowKeyboard(false);
    console.log("state", state);
    Keyboard.dismiss();
    setState(initialState);
    setIsFormFilled(false);
    comments.push({
      id: state.comment,
      avatar: "",
      text: state.comment,
      date: "03.07.2020",
      time: "19:14",
    });

    // navigation.navigate("Posts");
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
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : ""}
          >
            <FlatList
              style={styles.list}
              data={comments}
              renderItem={({ item }) => <Comment comment={item} />}
              keyExtractor={(item) => item.id}
              ListHeaderComponent={() => (
                <View style={styles.photo}>
                  {/* <Image source={imageSource} style={styles.photo} /> */}
                </View>
              )}
            />
          </KeyboardAvoidingView>
        </View>

        <View style={styles.footer}>
          <TextInput
            value={state.comment}
            onChangeText={(value) => {
              setState((prevState) => ({ ...prevState, comment: value }));
              allDataFilled();
            }}
            onFocus={() => {
              setIsShowKeyboard(true);
              setCommentFocused(true);
              allDataFilled();
            }}
            onBlur={() => {
              setCommentFocused(false);
              allDataFilled();
            }}
            style={
              isCommentFocused
                ? {
                    ...styles.input,
                    borderColor: "#FF6C00",
                    fontFamily: "Roboto-Medium",
                  }
                : {
                    ...styles.input,
                    borderColor: "#E8E8E8",
                    fontFamily: "Roboto-Medium",
                  }
            }
            placeholder="Comment..."
            placeholderTextColor="#BDBDBD"
          />

          <TouchableOpacity
            style={styles.button}
            onPress={publish}
            disabled={isFormFilled ? false : true}
          >
            <Ionicons
              name="arrow-up-circle-sharp"
              size={34}
              color="#FF6C00"
              style={styles.sendIcon}
            />
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
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    marginBottom: 32,
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
    borderWidth: 1,
    padding: 16,
    paddingBottom: 15,
    fontSize: 16,
    fontWeight: "500",
    backgroundColor: "#F6F6F6",
    borderRadius: Dimensions.get("window").width / 2,
  },
  footer: {
    backgroundColor: "#ffffff",
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  button: {
    position: "absolute",
    top: 10,
    right: 24,
  },
});

export default CommentsScreen;
