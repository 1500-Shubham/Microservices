require('dotenv').config();
const express = require('express');
const mongoose = require('./config/db');
const userRoutes = require('./routes/user');

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} , ${process.env.MONGO_URI}`);
});
