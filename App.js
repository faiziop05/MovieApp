import "./gesture-handler";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, View } from "react-native";
import StackNavigation from "./navigations/StackNavigation";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Text } from "react-native";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    if (Platform.OS == "android") {
      Text.defaultProps = Text.defaultProps || {};
      Text.defaultProps.allowFontScaling = false;
    }
  }, []);
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <StackNavigation />
        <StatusBar style="inverted" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});
