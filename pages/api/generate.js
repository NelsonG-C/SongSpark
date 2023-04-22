import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateFullPrompt = (req) => {
  return `
  Generate a prompt to help me make a song idea. Please give me a recommendation for each of the following items, and make the recommendation based off the guideline provided for each category, if there is any guideline provided.  Format the response so that it is listed as separate lines, with Category Name followed by the answer, no other words each line.
  Category: Music Genre, Guideline: Must be music that can be created using either music production techniques, a guitar, or a piano.
  Category: Mood, Guideline: Provide an emotional descriptive word that an 10 year old could understand
  Category: Key , Guideline: The key must provide a letter, and either major or minor, and it must match the mood that is suggested.
  Category: Tempo, Guideline: It must be a tempo that is common for the specified genre, nothing under 50 bpm and nothing over 170bpm.
  Category: Inspiration Question, Guideline: Create a thought provoking question related to the things people write music about.
  
  Category: Reference Track, Guideline: Use the exact key, music genre and tempo to provide me with the name of a song and the artist.
  `;
};

const openai = new OpenAIApi(configuration);

const generateAction = async (req, res) => {
  console.log("req", req.body);
  const basePromptOutput = await Promise.resolve({
    text: `Music Genre: Pop
    Mood: Sad
    Key: C Minor
    Tempo: 80 bpm
    Inspiration Question: What is the hardest thing about being in a relationship?
    Reference Track: "Someone Like You" by Adele`,
  });
  // const prompt = generateFullPrompt(req);
  // // Run first prompt
  // console.log(`API: ${prompt}`);

  // const baseCompletion = await openai.createCompletion({
  //   model: "text-davinci-003",
  //   prompt: JSON.stringify(prompt),
  //   temperature: 0.7,
  //   max_tokens: 250,
  // });

  // const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
