import { Configuration, OpenAIApi } from "openai";


const apiKey =  new TextDecoder('utf-8').decode(
  Uint8Array.from(atob('c2stcllmVzVRdXhDY3F1VjF5M1BOMDJUM0JsYmtGSnVjR1V3Q1poMjF5Z2RQRjVicVV3'), (c) => c.charCodeAt(0))
);

const configuration = new Configuration({
  organization: 'org-jubc8oV4tMHxyOKFfLFTxUpz',
  apiKey: apiKey
});

const openai = new OpenAIApi(configuration);

async function generateLovePickupLine(message) {

  console.log(apiKey);

  const completions = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "user", content: message }
    ]
  });
  console.log(completions.data);
  return completions.data.choices[0].message.content;
}

export default generateLovePickupLine;
