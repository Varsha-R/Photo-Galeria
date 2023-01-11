# Photo-Galería

This repository contains the complete code (both client and server) for a simple Photo Gallery application.
Tech stack used:

![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express JS](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB "React")
![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

## Instructions

### To run the server locally:
1. Go into the /server folder and do `npm install` to install all required project dependencies.
2. Create a `keys.js` config file to have the keys shown below shown below:
```
module.exports = {
  mongoURI:
    "mongodb+srv://....",
  jwtSecretKey: "supersecret_key",
};
```
3. Run `npm start` 

### To run the client locally:
1. Go into the /client folder and do `npm install` to install all required project dependencies.
2. Create a `keys.js` config file to have the keys shown below shown below:
```
REACT_APP_FILESTACK_API_KEY=...
REACT_APP_BACKEND_URL=http://localhost:5001/api
```
3. The keys *must* begin with `REACT_APP_`. The `REACT_APP_BACKEND_URL` will contain the port in which you are serving your /server code.
4. Run `npm start` 
