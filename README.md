<h1 align="center">Imagery Coordination</h1>

## Installation and Usage

The steps below will walk you through setting up your own instance of the imagery-request.

### Install Project Dependencies
To set up the development environment for this website, you'll need to install the following on your system:

- [Node](http://nodejs.org/) v4.5 (To manage multiple node versions we recommend [nvm](https://github.com/creationix/nvm))

### Install Application Dependencies

If you use [`nvm`](https://github.com/creationix/nvm), activate the desired Node version:

```
nvm install
```

Install Node modules:

```
npm install
```

### Usage

#### Config files
All the config files can be found in `app/assets/scripts/config`.
After installing the projects there will be 3 main files:
  - `local.js` - Used only for local development. On production this file should not exist or be empty.
  - `staging.js`
  - `production.js`

The `production.js` file serves as base and the other 2 will override it as needed:
  - `staging.js` will be loaded whenever the env variable `DS_ENV` is set to staging.
  - `local.js` will be loaded if it exists.

The following options must be set: (The used file will depend on the context)
  - `auth0Client` - The Auth0 client id.
  - `auth0Domain` - The Auth0 domain.
  - `mbToken` - The token for mapbox.
  - `api` - Url of the [Imagery Requests Api](https://github.com/hotosm/imagery-requests-api/)

Example:
``` 
module.exports = {
  auth0Client: 'qTQW5L362p0DWpuNAcx5SHggOY1p65bG',
  auth0Domain: 'danielfdsilva.eu.auth0.com',
  mbToken: 'pk.eyJ1IjoiZGV2c2VlZCIsImEiOiJnUi1mbkVvIn0.018aLhX0Mb0tdtaT2QNe2Q',
  api: 'https://imagery-requests-staging.herokuapp.com'
};
```

#### Starting the app

```
npm run serve
```
Compiles the sass files, javascript, and launches the server making the site available at `http://localhost:3000/`
The system will watch files and execute tasks whenever one of them changes.
The site will automatically refresh since it is bundled with livereload.

# Auth0 setup

To setup authentication with [Auth0](https://auth0.com/) follow the steps listed in the [imagery-requests-api](https://github.com/hotosm/imagery-requests-api/) repo.

### Config

Copy the `Client ID` and `Domain` to the appropriate config file.

```
  auth0Client: '',
  auth0Domain: '',
```

---

## Development data
During development a dummy app exists (only internally) and the following users are available:
- u: coordinator@example.org | p: coordinator
- u: surveyor@example.org | p: surveyor

# Deployment
To prepare the app for deployment run:

```
npm run build
```
This will package the app and place all the contents in the `dist` directory.
The app can then be run by any web server.
