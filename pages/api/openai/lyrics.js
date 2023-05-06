import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateFullPrompt = (req) => {
  return `
  Generate a chorus and two verses based on the following topic for the song:
  `;
};

const openai = new OpenAIApi(configuration);

const generateAction = async (req, res) => {
  let prompt;
  console.log("req prompt", req.query.lyrics);

  prompt = generateFullPrompt(req) + req.query.lyrics;
  // // Run first prompt
  console.log(`API: ${prompt}`);

  const randomNum = Math.floor(Math.random() * 10000) + 1;

  const baseCompletion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: JSON.stringify(prompt),
    temperature: 0.7,
    max_tokens: 150,
    seed: randomNum,
  });

  console.log("seed", randomNum);

  const basePromptOutput = baseCompletion.data.choices.pop();
  console.log("base prompt output", basePromptOutput);

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
