// Import the required modules: http for creating the server and app for the Express application
const http = require('http');
// Import the Express application from the app.js file
const app = require('./app');
// import the port number from the environment variables or use 3000 as a default
const port = process.env.PORT || 3000;

// Create an HTTP server using the Express app and listen on the specified port
const server = http.createServer(app);


// Start the server and log a message indicating that it is running
server.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
});