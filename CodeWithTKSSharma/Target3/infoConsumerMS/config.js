module.exports = {
    rabbitMQ:{
        url:'amqp://localhost',
        exchangeName: 'logExchange',
        queueName: 'infoQueue',
        routingKey: 'Info',
    },
    port:3001,
}