import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateFullPrompt = (req) => {
    const { movie, oneLine, recommendation } = req.body;
    return `Write me a detailed movie review using the following details. Include a synopsis background of the film that does not contain any spoilers. Use the one line verdict as the basis for the tone of the review.
    Movie Name: ${movie}.
    One line review of the film: ${oneLine}.
    Would you recommend?: ${recommendation}.`
  };

const openai = new OpenAIApi(configuration);

const generateAction = async (req, res) => {
    console.log('req', req.body)
    const prompt = generateFullPrompt(req)
  // Run first prompt
  console.log(`API: ${prompt}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: JSON.stringify(prompt),
    temperature: 0.7,
    max_tokens: 250,
  });

  baseCompletion + extraInformation
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;