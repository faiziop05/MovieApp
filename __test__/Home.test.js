import React from 'react';
import { render, waitFor, screen } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import favReducer from '../redux/FavSlice';
import dateReducer from '../redux/dateSlice';
import Home from '../pages/Home';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { ErrorBoundary } from 'react-error-boundary';
import { Text, ActivityIndicator } from 'react-native';

// Create a real store for testing
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

// Initialize the axios mock adapter
const mock = new MockAdapter(axios);

const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

describe('<HomeScreen />', () => {
  beforeEach(() => {
    // Mock the API response with the provided JSON structure
    mock.onPost('https://itunes.apple.com/search?term=star&media=movie&all').reply(200, {
      resultCount: 1,
      results: [
        {
          wrapperType: 'track',
          kind: 'feature-movie',
          trackId: 1128456722,
          artistName: 'Justin Lin',
          trackName: 'Star Trek Beyond',
          trackViewUrl: 'https://itunes.apple.com/us/movie/star-trek-beyond/id1128456722?uo=4',
          artworkUrl100: 'https://is1-ssl.mzstatic.com/image/thumb/Video62/v4/51/ca/2b/51ca2b13-4b24-d1a8-1bfb-ee0398690981/pr_source.lsr/100x100bb.jpg',
          releaseDate: '2016-07-22T07:00:00Z',
          primaryGenreName: 'Sci-Fi & Fantasy',
          longDescription: 'From Director Justin Lin (FAST AND FURIOUS) and Producer J.J. Abrams comes the third action-packed adventure of the USS Enterprise...',
        },
      ],
    });
  });

  afterEach(() => {
    // Reset the mock adapter after each test
    mock.reset();
  });

  test('Renders movie details correctly on HomeScreen', async () => {
    render(
      <Provider store={store}>
        <ErrorBoundary FallbackComponent={({ error }) => <Text>Error: {error.message}</Text>}>
          <Home navigation={mockNavigation} />
        </ErrorBoundary>
      </Provider>
    );
  });
});
