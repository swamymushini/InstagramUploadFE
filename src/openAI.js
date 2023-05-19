import { Configuration, OpenAIApi } from "openai";

const apiKey = process.env.REACT_APP_OPEN_API_KEY;

const configuration = new Configuration({
  organization: 'org-jubc8oV4tMHxyOKFfLFTxUpz',
  apiKey: apiKey
});

const openai = new OpenAIApi(configuration);

async function generateLovePickupLine(message) {

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
