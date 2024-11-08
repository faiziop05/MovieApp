import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
import { Image } from "expo-image";
const blurhash = "L4EzNG^l004:009Z4meS~0Mv.8?H";
const FavMoviesHorizontalBar = ({ navigation }) => {
  const favourites = useSelector((state) => state.favourites.favourites);
  const newFavData =
    favourites &&
    Array.isArray(favourites) &&
    [...favourites].reverse() || [];
  return (
    <View style={{ paddingTop: 50 }}>
      {newFavData.length > 0 && (
        <View style={styles.TopBarWrapper}>
          <Text style={styles.FavouritesHeading}>Recent Favourites</Text>
          <FlatList
            data={newFavData}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("MovieDetails", { data: item })
                }
                style={styles.TopBarImageTitleWrapper}
              >
                <Image
                  style={styles.TopBarimage}
                  source={item?.artworkUrl100}
                  placeholder={{ blurhash }}
                  contentFit="cover"
                  transition={1000}
                />
                <Text numberOfLines={1} style={styles.TopBarItemTitle}>
                  {item?.trackCensoredName}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default React.memo(FavMoviesHorizontalBar);
const styles = StyleSheet.create({
  TopBarWrapper: {
    marginLeft: 10,
  },
  FavouritesHeading: {
    color: "white",
    fontSize: 24,
    fontWeight: "600",
  },
  TopBarImageTitleWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    marginVertical: 10,
  },
  TopBarimage: {
    height: 70,
    width: 70,
    borderRadius: 60,
    backgroundColor: "#0553",
  },

  TopBarItemTitle: {
    color: "white",
    fontSize: 12,
    width: 50,
  },
});
