# agra

`agra` is a four player multiplayer game based on the board game "Aggravation". The front end was built with `create-react-app`. The app uses a Node Express back end.

---
### Getting Started
Currently the app is set up for production. To spin up locally comment/uncomment out the sections that state `*** FOR LOCAL TESTING ***`/`*** FOR PRODUCTION ***`. The sections are in the following:
- `client/src/app/features/thunks.js`
  - lines 6-10
- `client/src/app/home/JoinGame.js`
  - lines 52-56
- `client/src/socket.js`
  - lines 6 - 10
- `index.js`
  - lines 15-29

To start the front end:
`cd client`
`npm install`
`npm start`

To start the server:
`cd server`
`npm install`
`npm run dev`
