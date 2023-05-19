import AWS from 'aws-sdk';

const region = 'us-east-1'; 

AWS.config.update({ region });

const sqs = new AWS.SQS();

const queueUrl = 'https://sqs.us-east-1.amazonaws.com/083215260581/instagrampost_scheduler'; 

async function sendSQSMessage (msg){
    return new Promise(async (resolve, reject) => {
      try {
        let params = {
          MessageBody: JSON.stringify(msg),
          QueueUrl: queueUrl,
        };
        const r = await sqs.sendMessage(params).promise();
        resolve();
      }catch(e) {
        console.log(e);
        reject(e);
      }
    });
  };

export default sendSQSMessage;
