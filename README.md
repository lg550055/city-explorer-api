# city-explorer-api
API server for city-explorer project

**Author**: Polo Gonzalez

**Version**: 1.0.0

## Overview
Allows the front-end to make API queries to obtain weather and movie information for a city (selected in the front end).

## Getting Started
- Dependencies on package.json (including express and axios)
- May use: npm build
- Then: npm start to run

## Architecture
[High level whiteboard](./whiteboard.jpg) *needs update*

Live server with separate API routes for weather forecast and movie information requests.  Returns a JSON object with requested information.

Each route's functionality resides in its own module.

If the information is not in cache, it uses axios package to fetch weather info from WeatherBit and movie info from TMDB.  New information is saved in cache.  Cache information is returned is it has not expired.

Deployed at:
https://city-explo.herokuapp.com/

## Change Log
- 1/18/2022 - MVP + error handling
- 1/20/2022 - Refactors wheather and movies each into its own refactored components
- 1/21/2022 - Adds cache

## Credit and Collaborations
- Ryan Gallaway - Instructor
- Riva Davidowski - TA

---

## Front end

Deployment:
https://serene-lovelace-bcce7c.netlify.app/

Repository:
https://github.com/lg550055/city-explorer