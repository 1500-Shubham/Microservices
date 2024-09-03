const express= require("express");
const app = express();
const bodyParser= require("body-parser");
const Consumer= require('./consumer');
const config = require("./config")
const consumer = new Consumer();


consumer.consumeMessages();
