import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Entypo from "@expo/vector-icons/Entypo";
const Search = ({ animationValue, isTop, handleSearchChange }) => {
  const [searchState, setSearchState] = useState(false);
  const animatedStyle = {
    transform: [
      {
        translateY: animationValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0],
        }),
      },
    ],
    opacity: animationValue,
  };
  const handleSearchClick = useCallback(() => {
    setSearchState(true);
  }, []);
  const handleSearchCrossClick = useCallback(() => {
    setSearchState(false);
  }, []);
  return (
    <Animated.View style={[styles.animatedSearchWrapper, animatedStyle]}>
      {isTop &&
        (searchState ? (
          <View style={styles.InputSearchWrapper}>
            <TextInput
              placeholderTextColor="#888888"
              placeholder="Search"
              style={styles.TextInput}
              onChangeText={handleSearchChange}
            />
            <TouchableOpacity
              onPress={handleSearchCrossClick}
              style={styles.SearchIconWrapper}
            >
              <Entypo name="cross" size={20} color="#ccc" />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            onPress={handleSearchClick}
            style={styles.SearchIconSoloWrapper}
          >
            <EvilIcons name="search" size={26} color="white" />
          </TouchableOpacity>
        ))}
    </Animated.View>
  );
};

export default React.memo(Search);

const styles = StyleSheet.create({
  animatedSearchWrapper: {
    zIndex: 1,
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
  },
  InputSearchWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#fff2",
    borderRadius: 30,
    marginBottom: 5,
    width: "93%",
    alignSelf: "center",
    backgroundColor: "#0007",
  },
  SearchIconSoloWrapper: {
    display: "flex",
    flexDirection: "row",
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    marginRight: 15,
    marginBottom: 7,
  },
  TextInput: {
    width: "85%",
    height: 40,
    backgroundColor: "#fff0",
    paddingHorizontal: 20,
    color: "white",
    borderRightWidth: 1,
    borderRightColor: "#fff2",
  },
  SearchIconWrapper: {
    display: "flex",
    flexDirection: "row",
    width: "15%",
    height: 40,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff2",
  },
});
