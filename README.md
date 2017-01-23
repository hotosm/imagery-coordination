# Imagery Requests

## Development environment
To set up the development environment for this website, you'll need to install the following on your system:

- Node (v4.5.x) & Npm ([nvm](https://github.com/creationix/nvm) usage is advised)

> The versions mentioned are the ones used during development. It could work with newer ones.

After these basic requirements are met, run the following commands in the website's folder:
```
$ npm install
```

### Getting started

```
$ npm run serve
```
Compiles the sass files, javascript, and launches the server making the site available at `http://localhost:3000/`
The system will watch files and execute tasks whenever one of them changes.
The site will automatically refresh since it is bundled with livereload.

### Other commands
Compile the sass files, javascript... Use this instead of ```npm run serve``` if you don't want to watch.
```
$ npm run build
```

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
