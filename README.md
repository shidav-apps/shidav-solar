# Our Workspace Structure

## 1. Main App (main-app)
This is the main application, targteted at web browsers, based on Angular 19, standalone architecture, signals, no SSR.

## 2. Solar Lib (solar-lib)
Library containing the common angular entities. This will include:
* Common Components
* Directives
* Styles
* Typescript utilities
* General Services

# 3, 4, 5 - Server Access

## 3. Contract (contract)
Defines what the client expects from the server

## 4. Real API Server (real-api)***

## 5. Fake API Server (mock-api)


# TODOs
* [x] Set up providers for mock app
* [x] Set up authentication using firebase in Mock app
* [x] Set up providers for real app
* [x] Set up authentication using firebase in Real app
* [x] Implement "real" authentication
* [x] Connect the login page to the real authentication
* [ ] Move "real api" data fetching to firebase functions
  * [x] Move model entities to firebase functions
  * [ ] Implement data functions the return mock data using firebase functions