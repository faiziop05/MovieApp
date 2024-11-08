import { configureStore } from "@reduxjs/toolkit";
import favReducer from "./FavSlice";
import dateReducer from "./dateSlice";
export default configureStore({
  reducer: {
    favourites: favReducer,
    lastVistedDate: dateReducer,
  },
  
});
