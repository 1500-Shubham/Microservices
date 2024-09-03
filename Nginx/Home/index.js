// index.js

// Importing required modules
const express = require('express');
const app = express();
const port = 3331; // Port on which the server will listen


// Routes
app.get('/', (req, res) => {
  // Passing data to the template
  const data = {
    title: 'Welcome to my Home App',
    message: 'This is a simple example of using EJS with Express!'
  };
  // Rendering the 'index' template and passing data to it
  res.send( "Home APP");
});

// Starting the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
