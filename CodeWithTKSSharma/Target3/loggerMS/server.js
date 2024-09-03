const express= require("express");
const app = express();
const bodyParser= require("body-parser");
const Producer = require("./producer");
const config = require("./config")
const producer = new Producer();

// we will be sending and receiving data in json
app.use(bodyParser.json("application/json"));

app.post("/sendLog",async(req,res,next)=>{
console.log(req.body.logType,req.body.message)
 await producer.publishMessage(req.body.logType,req.body.message);
 res.send("Published message to rabbitMq");
})


app.listen(config.port,()=>{
    console.log(`Server started at port ${config.port}`)
})