import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: 'org-jubc8oV4tMHxyOKFfLFTxUpz',
  apiKey: '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'
});

const openai = new OpenAIApi(configuration);

async function generateLovePickupLine(message) {
  const completions = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "user", content: message }
    ]
  });

  return completions.data.choices[0].message.content;
}

export default generateLovePickupLine;
