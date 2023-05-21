import AWS from 'aws-sdk';

const region = 'us-east-1'; 

const accessKeyId = new TextDecoder('utf-8').decode(
  Uint8Array.from(atob('QUtJQVJHWUFFRE9TVVpZTklTRk4='), (c) => c.charCodeAt(0))
);

const secretAccessKey = new TextDecoder('utf-8').decode(
  Uint8Array.from(atob('UFNzWnRqeExUR3hxTVMzNDdlSnEyUk5yU3F6R0Q0RHBDRVVNSDhkOQ=='), (c) => c.charCodeAt(0))
);

AWS.config.update({
  region,
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey
});

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
        resolve(r);
      }catch(e) {
        console.log(e);
        reject(e);
      }
    });
  };

export default sendSQSMessage;
