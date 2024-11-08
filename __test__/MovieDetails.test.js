import React from 'react';
import { render} from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import favReducer from '../redux/FavSlice';
import dateReducer from '../redux/dateSlice';
import MovieDetails from '../pages/MovieDetails';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { ErrorBoundary } from 'react-error-boundary';
import { Text } from 'react-native';

const store = configureStore({
  reducer: {
    favourites: favReducer,
    lastVistedDate: dateReducer,
  },
  preloadedState: {
    favourites: [],
    lastVistedDate: '',
  },
});
const mock = new MockAdapter(axios);

const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

describe('<HomeScreen />', () => {
  afterEach(() => {
    mock.reset();
  });

  test('Renders movie details correctly on HomeScreen', async () => {
    render(
      <Provider store={store}>
        <ErrorBoundary FallbackComponent={({ error }) => <Text>Error: {error.message}</Text>}>
          <MovieDetails navigation={mockNavigation} />
        </ErrorBoundary>
      </Provider>
    );
  });
});
