// step1 connect to rabbitMQ
// step2 create a new channel
// step3 create exchange
// step4 create queue
// step5 bind the queue to exchange
// step6 consume message from the queue

const amqp = require("amqplib");
const config = require("./config")

class Consumer{
    channel;

    async createChannel (){
        const protocol = 'amqp'; // or 'amqps' for a secure connection
        const hostname = 'localhost'; // or your RabbitMQ server hostname
        const port = 5672; // default port for RabbitMQ
        const username = 'guest'; // replace with your RabbitMQ username
        const password = 'guest'; // replace with your RabbitMQ password
    
        const connectionString = `${protocol}://${username}:${password}@${hostname}:${port}`;
        const connection = await amqp.connect(config.rabbitMQ.url);
        this.channel=await connection.createChannel();
        // save this channel
    }

    async consumeMessages(){
        if(!this.channel) await this.createChannel();
        
            const exchangeName=config.rabbitMQ.exchangeName;
            await this.channel.assertExchange(exchangeName,"direct");
            // set type of exchange
            
            // step4 create queue
            const q= await this.channel.assertQueue(config.rabbitMQ.queueName);

            //step5 binding queue to exchange 
            await this.channel.bindQueue(q.queue,config.rabbitMQ.exchangeName,config.rabbitMQ.routingKey);
            // routing key= binding key proucer routign key bheja binding key se match
            // here INFO binding key
            
            //consuming messages
            this.channel.consume(q.queue,(msg)=>{
                // const logDetails={
                //     logType:routingkey,
                //     message:message,
                //     dateTime:new Date(),
                // }
                // Buffer.from(JSON.stringify(logDetails)))
                // %% sending from producer in stringify form
               const data=JSON.parse(msg.content);
               console.log(data); 


               //ACK to rabbitMQ that message is consumed properly
               this.channel.ack(msg);
               // ACK message is deleted from RABBITMQ
            })
    }
    
}

module.exports = Consumer