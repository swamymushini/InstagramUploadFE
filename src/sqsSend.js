import AWS from 'aws-sdk';

const region = 'us-east-1'; 

AWS.config.update({ region });

const sqs = new AWS.SQS();

const queueUrl = 'https://sqs.us-east-1.amazonaws.com/083215260581/instagrampost_scheduler'; 

async function sendSQSMessage(message) {

    const params = {
        MessageBody: message,
        QueueUrl: queueUrl,
    };

    sqs.sendMessage(params, (err, data) => {
        if (err) {
            return 'Error sending message:' + err;
        } else {
            return 'Message sent';
        }
    });
}

export default sendSQSMessage;
