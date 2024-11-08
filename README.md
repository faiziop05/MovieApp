## Feature #1: Favorite Movies
-	Movie can be marked favourite on both List/Grid and Details screen.
-	If Movie is marked favourite on list/grid screen, then it will be marked as favourite on details screen and vice versa.
-	Favourites persists its state even when offline.

## Feature #2: Movie Search
-	Typing in the search bar automatically triggers a search.
-	An empty state will be displayed when there are no search results.

## Full filled Requirements
Home screen displays movies in both grid and list view and user can toggle between them as per their preferences.
Both list and grid views display following at home screen:
-	Movie Name
-	Artwork (select an appropriate image size)
-	Price
-	Genre
  
A placeholder image will appear if the movie artwork fails to load.

The detailed view displays a longer description and data of the movie along with short video(trailer) of the Movie.

## Persistence
The app stores data in local storage (AsyncStorage) to persist data such as last visited date and user’s favorite movie.
## Architecture
Redux is implemented as primary architecture for state management because of its unidirectional data management and centralized store.

## Bonus Challenge
Bonus Challenge is implemented at top of home screen which shows favorite movies in horizontal scrollable manner.
## Tech Stack 
-	React Native version: `react-native": "0.74.5`
-	State Management: Redux 
-	Local Storage: AsyncStorage 
-	Network Requests: Axios 
-	Image Loading: expo-av
-	Testing: Jest 

## Installation
Clone the repository and run:
- `npm install`
- `npm start`

## Testing
- Run `npm test` to run the jest test

## APK Link
https://drive.google.com/file/d/1Rf_8bY2S1e9GroBLC0_6sZzho-gywrj2/view?usp=drive_link


