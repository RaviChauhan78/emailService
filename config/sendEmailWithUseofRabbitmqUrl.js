// Import required modules
const amqp = require('amqplib');

// RabbitMQ connection URL
const rabbitmqUrl = 'amqp://localhost';

// Queue name
const queueName = 'welcome_emails';

const sendEmail = async (email, subject, text) => {
  try {
    // Connect to RabbitMQ server
    console.log("rabbitmqUrl",rabbitmqUrl)
    const connection = await amqp.connect(rabbitmqUrl);
    // Create a channel
    const channel = await connection.createChannel();
    // Assert a queue
    await channel.assertQueue(queueName);
    // Prepare the email message
    const emailMessage = {
      to: email,
      subject: subject,
      body: text
    };
    // Convert the message to a string
    const messageString = JSON.stringify(emailMessage);
    // Send the message to the queue
    console.log("messageString",messageString)
    await channel.sendToQueue(queueName, Buffer.from(messageString));
    console.log('Email message sent to the queue');
    // Close the channel and connection
    await channel.close();
    await connection.close();
  } catch (error) {
    console.error('Error:', error);
  }
};

module.exports = sendEmail;
