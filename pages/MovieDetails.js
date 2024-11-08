import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  Platform,
} from "react-native";
import React, { useRef, useState } from "react";
import { Video, VideoFullscreenUpdate } from "expo-av";
import { useFocusEffect } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useDispatch, useSelector } from "react-redux";
import { setFavourites } from "../redux/FavSlice";
import * as ScreenOrientation from "expo-screen-orientation";

const MovieDetails = ({ route }) => {
  const { data } = route.params;
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.favourites.favourites);

  const IsFavourite =
    Array.isArray(favourites) &&
    favourites.some((item) => item.trackId === data.trackId);

  const handleFavClick = (da) => {
    const newData = {
      ...da,
      artworkUrl100: String(da.artworkUrl100).replace(
        "/100x100bb.jpg",
        "/300x300bb.jpg"
      ),
    };

    const isAlreadyFavourite = favourites.some(
      (item) => item.trackId === newData.trackId
    );

    if (!isAlreadyFavourite) {
      const updatedFavourites = [...favourites, newData];
      dispatch(setFavourites(updatedFavourites));
    }
  };

  const handleUnFavClick = (da) => {
    const updatedFavourites = favourites.filter(
      (item) => item.trackId !== da.trackId
    );
    dispatch(setFavourites(updatedFavourites));
  };

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        if (video.current) {
          video.current.pauseAsync();
        }
      };
    }, [])
  );

  const handlePlaybackStatusUpdate = (status) => {
    setIsLoading(false);
    setStatus(() => status);
    if (Platform.OS === "android" && status.isPlaying && status.isFullscreen) {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
      );
    }
  };

  const handleFullscreenUpdate = (event) => {
    if (
      Platform.OS === "android" &&
      event.fullscreenUpdate === VideoFullscreenUpdate.PLAYER_DID_PRESENT
    ) {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
      );
    } else if (
      Platform.OS === "android" &&
      event.fullscreenUpdate === VideoFullscreenUpdate.PLAYER_WILL_DISMISS
    ) {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    }
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.videoAndLoadingWrapper}>
        {isLoading && (
          <View style={styles.placeholder}>
            <ActivityIndicator size="small" color="#fff" />
          </View>
        )}
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: data.previewUrl,
          }}
          shouldPlay
          useNativeControls
          resizeMode="contain"
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
          onFullscreenUpdate={handleFullscreenUpdate}
        />
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.TitleAndFavBtnWrapper}>
          <Text style={styles.Title}>{data.trackName}</Text>
          {IsFavourite ? (
            <TouchableOpacity
              onPress={() => handleUnFavClick(data)}
              style={styles.favBtn}
            >
              <MaterialIcons name="favorite" size={24} color="red" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => handleFavClick(data)}
              style={styles.favBtn}
            >
              <MaterialIcons name="favorite-border" size={24} color="white" />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.DateTimeGenreWrapper}>
          <Text style={styles.dataTimeGenre}>
            {new Date(data.releaseDate).getFullYear()}
          </Text>
          <Text style={styles.dataTimeGenre}>
            {Math.floor(data.trackTimeMillis / 60000)}m
          </Text>
          <Text style={styles.dataTimeGenre}>{data.primaryGenreName}</Text>
          <Text style={styles.dataTimeGenre}>{data.country}</Text>
        </View>
        <Text style={styles.price}>${data.trackHdPrice}</Text>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.playbtn}
            onPress={() =>
              status.isPlaying
                ? video.current.pauseAsync()
                : video.current.playAsync()
            }
          >
            <Text style={styles.PlayBtnText}>
              {status.isPlaying ? "Pause" : "Play"}
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.LongDescHeading}>Prolog</Text>
        <Text style={styles.LongDesc}>{data.longDescription}</Text>
      </View>
      <Text style={styles.director}>Directed by {data.artistName}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: 45,
  },

  videoAndLoadingWrapper: {
    position: "relative",
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").width / 1.7,
  },
  video: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").width / 1.8,
    backgroundColor: "#000",
    borderBottomColor: "#fff4",
    borderBottomWidth: 1,
    zIndex: 0,
  },

  placeholder: {
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
    transform: [{ translateY: -10 }],
  },

  buttons: {
    marginTop: 10,
  },
  bottomContainer: {
    width: Dimensions.get("screen").width,
  },
  Title: {
    color: "white",
    width: Dimensions.get("screen").width / 1.25,
    fontSize: 20,
    fontWeight: "700",
    paddingLeft: 5,
  },
  TitleAndFavBtnWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: Dimensions.get("screen").width,
    alignItems: "center",
    marginTop: 5,
  },
  favBtn: {
    width: Dimensions.get("screen").width / 6.67,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  DateTimeGenreWrapper: {
    display: "flex",
    flexDirection: "row",
    paddingLeft: 5,
  },
  dataTimeGenre: {
    color: "#fffa",
    marginRight: 10,
  },
  director: {
    color: "#fffa",
    margin: 5,
    marginTop: 15,
    fontStyle: "italic",
  },
  price: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
    paddingLeft: 5,
    marginTop: 10,
  },
  playbtn: {
    width: Dimensions.get("screen").width - 10,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    backgroundColor: "#fffe",
    alignSelf: "center",
    marginTop: 10,
  },
  PlayBtnText: {
    fontSize: 18,
    fontWeight: "700",
  },
  LongDescHeading: {
    fontSize: 24,
    color: "white",
    fontWeight: "700",
    marginTop: 20,
    padding: 5,
  },
  LongDesc: {
    color: "#fffb",
    padding: 5,
    fontWeight: "500",
    fontSize: 15,
    textAlign: "justify",
    alignSelf: "center",
  },
});

export default MovieDetails;
