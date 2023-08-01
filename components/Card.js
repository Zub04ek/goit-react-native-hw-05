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

export const Card = ({ item }) => {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View key={item.id} style={styles.item}>
      <Image source={item.photo} style={styles.photo} />
      <Text style={styles.caption}>{item.title}</Text>
      <View style={styles.info}>
        <View style={styles.stat}>
          <TouchableOpacity
            style={styles.block}
            onPress={() => navigation.navigate("Comments")}
          >
            <FontAwesome name="comment" size={24} color="#FF6C00" />
            <Text style={styles.text}>{item.comments}</Text>
          </TouchableOpacity>
          <View style={styles.block}>
            <AntDesign name="like2" size={24} color="#FF6C00" />
            <Text style={styles.text}>{item.likes}</Text>
          </View>
        </View>
        <View style={styles.block}>
          <SimpleLineIcons name="location-pin" size={24} color="#BDBDBD" />
          <Text style={{ ...styles.text, textDecorationLine: "underline" }}>
            {item.location}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#ffffff",
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 32,
    gap: 8,
  },
  photo: {
    width: Dimensions.get("window").width - 32,
    height: 240,
    borderRadius: 8,
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  stat: {
    flexDirection: "row",
    gap: 24,
  },
  block: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  text: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#212121",
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
  caption: {
    fontFamily: "Roboto-Medium",
    fontWeight: "500",
    fontSize: 16,
    color: "#212121",
  },
});
