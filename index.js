// Import the ExpressJS package
const express = require('express');
// Create an instance of Express
const app = express();
// Set up any data needed to give to the server later
const port = 3000;

// Configure settings to allow data to be sent into the server
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Import the router and assign to a variable
// The name of the variable does not matter
const someRouterImported = require('./externalroute');

// Keep code D.R.Y when possible. 
// Different routes can use the same function!
function messageWithVerb(request, response) {
    response.send(`Received a request with the ${request.method} HTTP verb!`);
}
app.get('/', (request, response) => messageWithVerb(request, response));
app.post('/', (request, response) => messageWithVerb(request, response));
app.put('/', (request, response) => messageWithVerb(request, response));
app.patch('/', (request, response) => messageWithVerb(request, response));
app.delete('/', (request, response) => messageWithVerb(request, response));

// Example route for sending HTML elements as a response.
app.get('/html', (request, response) => {
    let page = `
    <h1>Homepage</h1>
    <p>Some text content.</p>
    <h2>It is currently ${new Date().toLocaleString('default', {weekday:'long'})}</h2>
    `
    response.send(page);
});

// Example route for sending JSON data as a response.
app.get('/json', (request, response) => {
    let someObject = {
        name: "Alex",
        isCool: true
    }
    response.json(someObject);
});



// POST route on localhost:3000/mirror
// with JSON body content containing a "message" variable
app.post('/mirror', (request, response) => {
    // Any submitted JSON keys will be on "body"
    // Access them with object syntax:
    let message = request.body.message;

    // Something fun to show that we can work with
    // the submitted JSON data:
    message = message.split("").reverse().join("");

    // Send back a response to the client:
    response.json({
        egassem: message
    });
});

// Once the server has been configured, tell it to start listening to web traffic.
app.listen(port, () => {
    // This logged message will appear in the terminal, not the browser.
    console.log(`Example app listening on port ${port}`);
});

// Tell the server to use the router,
// and specify a prefix for the router
app.use("/someFancyRouter", someRouterImported)