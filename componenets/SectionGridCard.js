import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Image } from "expo-image";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useDispatch, useSelector } from "react-redux";
import {  setFavourites } from "../redux/FavSlice";
const blurhash =
  "L4EzNG^l004:009Z4meS~0Mv.8?H";
const Screen_width = Dimensions.get("screen").width;

const SectionGridCard = ({ data, isGridView, navigation }) => {
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

  return (
    <View
      style={isGridView == true ? styles.CardWrapperGrid : styles.CardWrapper}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate("MovieDetails", { data: data })}
        style={
          isGridView == true
            ? styles.imageTextsWrapperGrid
            : styles.imageTextsWrapper
        }
      >
        <Image
          style={
            isGridView == true ? styles.TopBarImageGid : styles.TopBarimage
          }
          source={String(data.artworkUrl100)
            .split("/100x100bb.jpg")
            .join("/600x600bb.jpg")}
          placeholder={{ blurhash }}
          contentFit="cover"
          transition={1000}
        />
        <View
          style={
            isGridView == true
              ? styles.TitlePriceGenreWrapperGrid
              : styles.TitlePriceGenreWrapper
          }
        >
          <Text numberOfLines={1} style={styles.name}>
            {data?.trackCensoredName}
          </Text>
          <Text style={styles.price}>${data?.trackPrice}</Text>
          <Text style={styles.genre}>{data?.primaryGenreName}</Text>
        </View>
      </TouchableOpacity>
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
  );
};

export default SectionGridCard;

const styles = StyleSheet.create({
  CardWrapper: {
    backgroundColor: "#5af1",
    width: Screen_width / 2.1,
    marginVertical: 5,
    borderRadius: 4,
  },
  CardWrapperGrid: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#5af1",
    width: Screen_width,
    marginVertical: 10,
    borderRadius: 4,
    justifyContent: "space-between",
  },
  imageTextsWrapperGrid: {
    display: "flex",
    flexDirection: "row",
  },
  imageTextsWrapper: {
    display: "flex",
    flexDirection: "column",
  },
  TopBarimage: {
    height: Screen_width / 2.1,
    width: Screen_width / 2.1-1-2,
    borderRadius: 4,
    backgroundColor: "#0553",
  },
  TopBarImageGid: {
    height: Screen_width / 3.5,
    width: Screen_width / 3.5,
    borderRadius: 4,
    backgroundColor: "#0553",
  },
  TitlePriceGenreWrapper: {
    padding: 5,
  },
  TitlePriceGenreWrapperGrid: {
    padding: 5,
    marginLeft: 10,
  },
  name: {
    color: "white",
    fontWeight: "700",
    lineHeight: 20,
    width: Screen_width / 2.5,
  },
  price: {
    color: "white",
    fontWeight: "500",
    lineHeight: 24,
  },
  genre: {
    marginTop: 8,
    color: "#fff9",
    fontWeight: "700",
    fontSize: 13,
  },
  favBtn: {
    alignSelf: "flex-end",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

let d = {
  artistName: "J.J. Abrams",
  artworkUrl100:
    "https://is1-ssl.mzstatic.com/image/thumb/Video127/v4/c3/00/10/c30010bb-989c-3ce0-e100-9fb4f9f631d4/pr_source.jpg/100x100bb.jpg",
  artworkUrl30:
    "https://is1-ssl.mzstatic.com/image/thumb/Video127/v4/c3/00/10/c30010bb-989c-3ce0-e100-9fb4f9f631d4/pr_source.jpg/30x30bb.jpg",
  artworkUrl60:
    "https://is1-ssl.mzstatic.com/image/thumb/Video127/v4/c3/00/10/c30010bb-989c-3ce0-e100-9fb4f9f631d4/pr_source.jpg/60x60bb.jpg",
  collectionArtistId: 1008915738,
  collectionArtistViewUrl:
    "https://itunes.apple.com/us/artist/paramount-home-entertainment-inc/1008915738?uo=4",
  collectionCensoredName:
    "Star Trek, Star Trek into Darkness, Star Trek Beyond: 3 Film Collection",
  collectionExplicitness: "notExplicit",
  collectionHdPrice: 14.99,
  collectionId: 1422441683,
  collectionName: "Star Trek: 3 Movie Collection",
  collectionPrice: 14.99,
  collectionViewUrl:
    "https://itunes.apple.com/us/movie/star-trek-into-darkness/id643978126?uo=4",
  contentAdvisoryRating: "PG-13",
  country: "USA",
  currency: "USD",
  discCount: 1,
  discNumber: 1,
  hasITunesExtras: true,
  kind: "feature-movie",
  longDescription:
    "J.J. Abrams STAR TREK INTO DARKNESS is the best-reviewed blockbuster. When a ruthless mastermind known as Khan (Benedict Cumberbatch) declares a one-man war on the Federation, Captain Kirk (Chris Pine), Spock (Zachary Quinto), and the daring crew of the U.S.S. Enterprise will embark on the greatest manhunt in history. It will take all of their skills and teamwork to defend Earth and eliminate Khan’s threat in this “sleek, thrilling epic.” (Owen Gleiberman, Entertainment Weekly)",
  previewUrl:
    "https://video-ssl.itunes.apple.com/itunes-assets/Video127/v4/d1/d4/7a/d1d47a23-7ed3-f51d-ded1-12ab6ea3d5c6/mzvf_6689004818574290975.640x354.h264lc.U.p.m4v",
  primaryGenreName: "Sci-Fi & Fantasy",
  releaseDate: "2013-05-17T07:00:00Z",
  shortDescription:
    "J.J. Abrams STAR TREK INTO DARKNESS is the best-reviewed blockbuster of the year. When a ruthless",
  trackCensoredName: "Star Trek Into Darkness",
  trackCount: 3,
  trackExplicitness: "notExplicit",
  trackHdPrice: 14.99,
  trackHdRentalPrice: 5.99,
  trackId: 643978126,
  trackName: "Star Trek Into Darkness",
  trackNumber: 2,
  trackPrice: 14.99,
  trackRentalPrice: 5.99,
  trackTimeMillis: 7965174,
  trackViewUrl:
    "https://itunes.apple.com/us/movie/star-trek-into-darkness/id643978126?uo=4",
  wrapperType: "track",
};
