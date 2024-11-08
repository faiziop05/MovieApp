import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    favourites: [],
};
export const FavSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    setFavourites: (state, action) => {
      state.favourites = action.payload;
      AsyncStorage.setItem('favourites', JSON.stringify(action.payload)).catch(err => {
        console.error('Error saving favourites:', err);
      });
    },
  },
});

export const { setFavourites } = FavSlice.actions;

export default FavSlice.reducer;
export const loadFavourites = () => async (dispatch) => {
  try {
    const storedFavourites = await AsyncStorage.getItem('favourites');
    if (storedFavourites !== null) {
      dispatch(setFavourites(JSON.parse(storedFavourites)));
    }
  } catch (error) {
    console.error('Error loading favourites from AsyncStorage:', error);
  }
};
