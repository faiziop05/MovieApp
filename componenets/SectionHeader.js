import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Entypo from "@expo/vector-icons/Entypo";
import { useSelector } from "react-redux";
const SectionHeader = ({ section, handleGridChange, isGridView }) => {
  const lastVistedDate = useSelector(
    (state) => state.lastVistedDate.lastVistedDate
  );
  return (
    <View style={styles.SectionHeaderWrapper}>
      <View>
        <Text style={styles.sectionTitle}>{section.title}</Text>
        {lastVistedDate && (
          <View style={styles.LastVistedDateWrapper}>
            <Text style={styles.DateHeading}>Last Visited: </Text>
            <Text style={styles.dateText}>{lastVistedDate} </Text>
          </View>
        )}
      </View>
      <TouchableOpacity
        onPress={handleGridChange}
        style={styles.GidListViewBtn}
      >
        <Entypo name={isGridView ? "list" : "grid"} size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default SectionHeader;

const styles = StyleSheet.create({
  SectionHeaderWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  sectionTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "600",
  },
  LastVistedDateWrapper: {
    display: "flex",
    flexDirection: "row",
    width: Dimensions.get("screen").width / 1.3,
  },
  dateText: {
    color: "#fffa",
    width: Dimensions.get("screen").width / 1.8,
  },
  DateHeading: {
    color: "#fffa",
  },
});
