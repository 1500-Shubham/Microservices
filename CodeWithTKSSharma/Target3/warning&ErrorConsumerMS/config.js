module.exports = {
    rabbitMQ:{
        url:'amqp://localhost',
        exchangeName: 'logExchange',
        queueName: 'warningQueue',
        routingKey1: 'Warning',
        routingKey2: 'Error',
    },
    port:3001,
}