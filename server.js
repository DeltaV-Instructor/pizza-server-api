/* eslint-disable no-undef */
'use strict';
console.log('server file is running');
// killall -9 node
// npm init
// npm i express
// npm i dotenv
// npm i -g nodemon
// killall -9 node
// npm kill-port 3001
// npm i axios
// npm cors

// REQUIRE
// In our server, we have to use 'require' instead of import'
// Here we will list the requirement for a server
const express = require('express');
require('dotenv').config();
const cors = require('cors');
// We must include cors if we want to share resources over the web

//add data
let data = require('./data/pizza.json');
// console.log(data);

// USE
// Once I have required something, we have to use it
// this is where we assign the reqired file a variable name
// React does this in one step with 'import',
// it says we must use it and it assign it to a variable
// Express takes 2 steps: 'require' and 'use'
// This is just how Express works.
const app = express();
app.use(cors());
// npm i dotenv - define our port, validate that my .env file is working.
//if server runs on 5005, I know something is wrong with my env file.
const PORT = process.env.PORT || 5005;

//Routes we will use to access our end point
/**
 * .get() is an express method
 * it correlates to axios.get
 * the first parameter is a URL in quote: string
 * the second is a callback function
 */
// our root of our site pass callback () two params
// app.get('', () => {});
app.get('/', (request, response) => {
  response.send('Hello from our Server File, this is the home route');
});

app.get('/hello', (request, response) => {
  // localhost:3002/hello?name=bob&lastname=trapp
  // console.log('req object', request.query);
  let name = request.query.name;
  let lastname = request.query.lastname;
  // console.log(name, lastname);
  response.send(`Hello ${name} ${lastname}`);
});

app.get('/pizza', (req, res) => {
  // console.log('!!!!!!!!', req.query.pizzatype);
  try {
    let pizzaType = req.query.pizzatype;
    let dataToConstructor = data.find(pizza => pizza.pizzatype === pizzaType); 
    console.log('TTTTTTTTT',dataToConstructor);

    let dataToSend = new Pizza(dataToConstructor);
    console.log("🚀 ~ file:", dataToSend);

    res.send(dataToSend);
  } catch (error) {
    next(error);
  }
});

//we need to add a pizza to handle the front end request

//need to add class to process the data before we send it back to the front add class constructor for our objects.
class Pizza{
  constructor(pizzaObject){
    // console.log('objects ? from /pizza',pizzaObject);
    this.pizzaType = pizzaObject.pizzatype;
    this.pizzaLocation = pizzaObject.location;
  }
}








//Errors
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

//handles all route requests when we dont have a route for them that they searched.
app.get('*', (request, response) => {
  response.send('The route was not found. Error 404');
});

//Listen for port to start the server
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
