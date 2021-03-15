# Wanderlust

WanderLust was created as a react-based web application to help users plan trips using personalized recommendations from their friends. It allows users to easily share pictures and memories of their trips for others to see. Users can then utilize these memories to plan their own trips directly in the app. With WanderLust, users can:

- See where their friends have visited and share memories together
- Plan trips based on where their friends have gone

## Download and Install

- First, you will need to install Node.js version 14 and the Firebase CLI.
- After that, you will need to clone the repository off of GitHub and run `npm install`.

### Firebase

- Create a new project/link to an existing project using the Firebase CLI (e.g., using `firebase init`).
- Then go to the project you created in the Firebase console and enable the realtime database and the storage options.
- Run `firebase login:ci` and create another repository secret called `FIREBASE_DEPLOY_TOKEN` using the key printed out to your terminal.
- Finally, copy the database configuration in the file `src/utils/firebase.js`, replacing the commented out code there as necessary.

### Firebase Realtime Database

- We provide an example of the backend database in the file `databaseExample.json`, which you can import to your Realtime Database.
- Because we did not implement login, our code currently assumes the existence of a hardcoded user (the one listed in `databaseExample.json`), specified in the file `src/utils/userData.js`. You will either need to implement login or edit the values there in order to work with the application.

### Google Maps API Keys

- Using the [instructions at this link](https://console.cloud.google.com/apis/library/maps-backend.googleapis.com), get a Google Map API key. Then, define a environment variable with that API key in a file called `.env` at the root of this repository, like this:

```
REACT_APP_GOOGLE_MAPS_API_KEY=$KEY_YOU_CREATED
```

- You will also need to enable 2 additional APIs: [Places API](https://console.cloud.google.com/apis/library/places-backend.googleapis.com?project=wanderlust-708c7) and [Geocoding API](https://console.cloud.google.com/apis/library/geocoding-backend.googleapis.com?project=wanderlust-708c7).
- If you have trouble getting to the Google Cloud console, here's how you can get to it:
  - Go to the Firebase console.
  - Click on the gear at the top left corner of the screen and go to `project settings.`
  - Click on the `service accounts` tab it takes you to on that page.
  - Click under `other service accounts`, which should take you to to the console.
- Go into GitHub and create a [repository secret](https://docs.github.com/en/actions/reference/encrypted-secrets) with the same name, `REACT_APP_GOOGLE_MAPS_API_KEY`. You will need to do so in order for the CI/CD pipeline to work.

If you've done all of that correctly, you should be able to run `npm start` to launch the app!

- If you get mysterious errors, try opening the developer console in your browser and looking for error messages; if you forgot to enable one of the APIs, Google will print a message to your console in development mode informing you so and provide a link to the API that you need to enable.

## Build

Go into the root of the project and run `npm run build`. That should create a folder with the compiled project. From there, you can run `firebase deploy` to deploy manually or let the CICD configuration take care of it for you on GitHub.

## Tests

Run `npm run test` to run all unit/integration tests and `npm run cypress:open` to run all end-to-end tests.

## Platform Constraints

Our development has been done while testing with Chrome on Mac, Linux, and Windows. The app has also been tested with some other browsers and machines, but we have not encountered any platform constraints so far.

## Future Development

### Trip Info Management

Deleting pins

- Difficult because our database is denormalized.

Adding pins of interests

- Not real places that have been visited, but a candidate location on a trip.

Filtering existing pins on tags

### User Accounts

Login / Registration

- Users can create an account and then log into it
- User data persists between login sessions

Authentication

- Uploading a pin and creating a trip requires the user to be authenticated (logged in)

### Social Network Integration

Friends within the app

- Adding friends
- Sharing new pins with friends

### Automated Testing

Add More Tests

- Cypress and Jest are configured; if you need to change existing code, consider writings specs as you go

## Dependencies

All app dependencies is installed by running `npm install`.
The firebase dependency, to deploy the app, is installed by running `npm install -g firebase-tools`.
