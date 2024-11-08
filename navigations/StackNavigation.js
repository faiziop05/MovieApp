import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../pages/Home";
import MovieDetails from "../pages/MovieDetails";
import { createStackNavigator } from "@react-navigation/stack";
const { Navigator, Screen } = createStackNavigator();
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setLastVisttedDate } from "../redux/dateSlice";
import { useDispatch } from "react-redux";
const StackNavigation = () => {
  const dispatch = useDispatch();
  const asyncfuntion = async () => {
    const lastDate = await AsyncStorage.getItem("lastVisitedDate");
    dispatch(setLastVisttedDate(lastDate));
    const date = new Date().toDateString();
    const time = new Date().toLocaleTimeString();
    const fullDate = `${date}, at ${time}`;
    await AsyncStorage.setItem("lastVisitedDate", fullDate);
  };
  useEffect(() => {
    asyncfuntion();
  }, []);

  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: false,
          animationEnabled: true,
          
          cardStyle: {
            backgroundColor: 'black',
            height:'100%',
            width:'100%'
          },
          cardOverlayEnabled: false, 
        }}
      >
        <Screen name="Home" component={Home} />
        <Screen name="MovieDetails" component={MovieDetails} />
      </Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
