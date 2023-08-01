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
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, AntDesign, SimpleLineIcons } from "@expo/vector-icons";

export const Comment = ({ comment }) => {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  //   const imageSource = { uri: comment.avatar };

  return (
    <View key={comment.id} style={styles.item}>
      <View style={styles.avatar}>
        {/* <Image source={imageSource} style={styles.photo} /> */}
      </View>

      <View style={styles.block}>
        <Text style={styles.caption}>{comment.text}</Text>

        <View style={styles.stat}>
          <Text style={styles.date}>{comment.date}</Text>
          <Text style={styles.time}>{comment.time}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row-reverse",
    gap: 16,
    marginBottom: 24,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 28 / 2,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  stat: {
    flexDirection: "row",
  },
  block: {
    width: Dimensions.get("window").width - 76,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderTopLeftRadius: 6,
    padding: 16,
    gap: 8,
  },
  date: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    color: "#BDBDBD",
    paddingRight: 4,
    lineHeight: 12,
  },
  time: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    color: "#BDBDBD",
    paddingLeft: 4,
    borderLeftWidth: 1,
    borderLeftColor: "#BDBDBD",
    lineHeight: 12,
  },
  caption: {
    fontFamily: "Roboto-Regular",
    fontWeight: "400",
    fontSize: 13,
    color: "#212121",
  },
});
