# MovieApp

A React Native movie browser with favorites and search, backed by Redux and covered by a Jest test suite.

## Overview

MovieApp is an Expo/React Native app for browsing movies in grid or list view, viewing detailed information (including trailers) for a selected title, and marking movies as favorites. Favorites and last-visited state persist locally so they survive app restarts, and the home screen highlights favorited movies in a horizontal scroll.

## Problem it solves

It demonstrates a complete, testable movie-discovery flow — browsing, searching, and favoriting — with favorites that stay in sync between the list/grid view and the details view and survive being offline, rather than living only in ephemeral component state.

## Key features

- **Dual view modes** — toggle between grid and list layouts on the home screen, each showing movie name, artwork, price, and genre.
- **Favorites that stay in sync** — marking a movie favorite from either the list/grid or the details screen updates both, and persists via `AsyncStorage`.
- **Live search** — typing in the search bar triggers search automatically, with an explicit empty-results state.
- **Favorites bar** — a horizontally scrollable strip of favorited movies surfaced at the top of the home screen.
- **Movie details with trailer** — detail screen shows an extended description plus a short trailer video (`expo-av`).
- **Graceful image fallback** — a placeholder image is shown if artwork fails to load.
- **Automated tests** — Jest + React Native Testing Library tests for the Home and Movie Details screens, with `axios-mock-adapter` and `redux-mock-store` for mocking network calls and store state.

## What's unique about it

- Favorites are implemented as a single source of truth in a Redux slice (`FavSlice`) consumed identically by both the grid/list and details screens, so state never drifts between views.
- The project ships with a real test suite (`__test__/`) exercising both screens against mocked API responses, rather than being untested boilerplate.

## Tech stack

- **React Native** (0.74) with **Expo** (~51)
- **Redux Toolkit** + **React Redux** for state management
- **React Navigation** (native + stack)
- **Axios** for network requests, with `axios-mock-adapter` for test mocking
- **AsyncStorage** for local persistence
- **expo-av** / **expo-image** for media and image handling
- **Jest** + **jest-expo** + **@testing-library/react-native** for testing

## Setup / running instructions

```bash
npm install
npm start
```

Run on a specific platform:
```bash
npm run android
npm run ios
npm run web
```

Run the test suite:
```bash
npm test
```
