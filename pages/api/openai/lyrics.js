import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateFullPrompt = (req) => {
  return `
  Generate some song lyrics based on the following information:
  `;
};

const openai = new OpenAIApi(configuration);

const generateAction = async (req, res) => {
  let prompt;
  console.log("req prompt", req.query.lyrics);

  prompt = generateFullPrompt(req) + req.query.lyrics;
  // // Run first prompt
  console.log(`API: ${prompt}`);

  const baseCompletion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: JSON.stringify(prompt),
    temperature: 0.7,
    max_tokens: 250,
  });

  const basePromptOutput = baseCompletion.data.choices.pop();
  console.log("base prompt output", basePromptOutput);

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
