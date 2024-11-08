import {
  StyleSheet,
  Text,
  View,
  Platform,
  SectionList,
  ActivityIndicator,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import axios from "axios";
import SectionGridCard from "../componenets/SectionGridCard";
import { useDispatch } from "react-redux";
import { loadFavourites } from "../redux/FavSlice";
import { Animated } from "react-native";
import SectionHeader from "../componenets/SectionHeader";
import FavMoviesHorizontalBar from "../componenets/FavMoviesHorizontalBar";
import Search from "../componenets/Search";

const Home = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGridView, setIsGridView] = useState(true);
  const [isTop, setIsTop] = useState(true);
  const dispatch = useDispatch();
  const animationValue = useRef(new Animated.Value(0)).current;

  const fetchData = useCallback(async (search) => {
      
    try {
      const res = await axios.post(
        `https://itunes.apple.com/search?term=${
          search || "star"
        }&media=movie&all`
      );
      if (res.status === 200) {
        setData(res.data.results || []);
      }
    } catch (error) {
      console.log(error);
    } 
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  

  useEffect(() => {
    dispatch(loadFavourites());
  }, [dispatch]);
  useEffect(() => {
    animateSearchBar(true);
  }, []);

  const handleSearchChange = async (text) => {
    if (text != "") {
      fetchData(String(text).toLowerCase());
    } else {
      fetchData("star");
    }
  };

  const handleGridChange = useCallback(() => {
    setIsGridView((prev) => !prev);
  }, []);

  const groupDataInPairs = useCallback((data) => {
    const groupedData = [];
    for (let i = 0; i < data.length; i += 2) {
      groupedData.push(data.slice(i, i + 2));
    }
    return groupedData;
  }, []);

  const NewData = useMemo(
    () => [
      { title: "Movies", data: isGridView ? groupDataInPairs(data) : data },
    ],
    [data, isGridView]
  );

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    const atTop = scrollPosition <= 50;
    if (atTop !== isTop) {
      setIsTop(atTop);
      animateSearchBar(atTop);
    }
  };

  const animateSearchBar = (show) => {
    Animated.timing(animationValue, {
      toValue: show ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const RenderRow = useCallback(
    ({ data }) => (
      <View style={styles.row}>
        {data.map((item, index) => (
          <View key={index} style={styles.gridItem}>
            <SectionGridCard
              navigation={navigation}
              data={item}
              isGridView={false}
            />
          </View>
        ))}
      </View>
    ),
    []
  );
  const ListHeaderComponentWrapper = useCallback(() => {
    return <FavMoviesHorizontalBar navigation={navigation} />;
  }, []);
  return (
    <View style={styles.HomeContainer}>
      <Search
        handleSearchChange={handleSearchChange}
        animationValue={animationValue}
        isTop={isTop}
      />
      {!isLoading && NewData[0]?.data?.length == 0 ? (
        <Text style={styles.NoResult}>No Result found</Text>
      ) : !isLoading ? (
        <SectionList
          sections={NewData}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={ListHeaderComponentWrapper}
          maxToRenderPerBatch={5}
          showsVerticalScrollIndicator={false}
          stickyHeaderHiddenOnScroll
          onScroll={handleScroll}
          scrollEventThrottle={16}
          renderSectionHeader={({ section }) => (
            <SectionHeader
              section={section}
              isGridView={isGridView}
              handleGridChange={handleGridChange}
            />
          )}
          renderItem={({ item }) =>
            isGridView ? (
              <RenderRow data={item} />
            ) : (
              <View>
                <SectionGridCard
                  navigation={navigation}
                  data={item}
                  isGridView={true}
                />
              </View>
            )
          }
        />
      ) : (
        <View style={styles.ActivityIndicator}>
          <ActivityIndicator
            color="white"
            size={Platform.OS === "android" ? "large" : "small"}
          />
        </View>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  HomeContainer: {
    backgroundColor: "#000",
    flex: 1,
    paddingTop: 50,
  },
  NoResult: {
    color: "white",
    textAlign: "center",
    marginTop: 100,
  },
  ActivityIndicator: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: Platform.OS=="android" ? '100%':"90%",
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    marginHorizontal: 5,
  },
});
