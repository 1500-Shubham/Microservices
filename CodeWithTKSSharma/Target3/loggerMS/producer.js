// connect to rabbit mq server
// create a new channel on that connection
// create exhance
// publish message to exahcge with routing keyt

const amqp = require("amqplib");
const config = require("./config")

class Producer{
    channel;

    async createChannel (){
        const protocol = 'amqp'; // or 'amqps' for a secure connection
        const hostname = 'localhost'; // or your RabbitMQ server hostname
        const port = 5672; // default port for RabbitMQ
        const username = 'guest'; // replace with your RabbitMQ username
        const password = 'guest'; // replace with your RabbitMQ password
    
        const connectionString = `${protocol}://${username}:${password}@${hostname}:${port}`;
        console.log(connectionString)
        const connection = await amqp.connect(config.rabbitMQ.url);
        this.channel=await connection.createChannel();
        // save this channel
    }

    async publishMessage(routingkey,message){
        if(!this.channel) await this.createChannel();
        
            const exchangeName=config.rabbitMQ.exchangeName;
            console.log(exchangeName);
            await this.channel.assertExchange(exchangeName,"direct");
            // set type of exchange
            const logDetails={
                logType:routingkey,
                message:message,
                dateTime:new Date(),
            }
            await this.channel.publish(exchangeName,routingkey,
            Buffer.from(JSON.stringify(logDetails)))
            // publish in Buffer to rabbitmQ

            console.log(`The message ${message} is send to exhange ${exchangeName}`);
        
    }
    
}

module.exports = Producer