import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const randomNum = Math.floor(Math.random() * 100000) + 1;

const generateFullPrompt = (req) => {
  return `
  Generate a prompt to help me make a song idea. Please give me a recommendation for each of the following items, and make the recommendation based off the guideline provided for each category, if there is any guideline provided.  Format the response so that it is listed as separate lines, with Category Name followed by the answer, no other words each line.
  Category: Music Genre, Guideline: Must be music that can be created using either music production or instrument.
  Category: Mood, Guideline: Provide an emotional descriptive word
  Category: Key , Guideline: The key must provide a letter, and either major or minor, and it must match the mood that is suggested.
  Category: Tempo, Guideline: It must be a tempo that is common for the specified genre, nothing under 50 bpm and nothing over 170bpm.
  Category: Inspiration Question, Guideline: Create a thought provoking question
  
  Category: Reference Track, Guideline: Use the exact key, music genre and tempo to provide me with the name of a song and the artist.
  Vary the responses for each category so that they are not the same each time. Use the random seed number ${randomNum} to influence this.

  Provide me the response in a structure as follows:
  [Category Name: Answer, Category Name: Answer, Category Name: Answer, Category Name: Answer, Category Name: Answer, Category Name: Answer, Category Name: Answer]. Do not include the words Category Name or Answer in the response, only the actual answer.
  `;
};

const generateSimplePrompt = (songValue, artistValue) => {
  return `
  Generate a prompt to help me make a song idea using the following song as reference: ${songValue} by ${artistValue}. Please give me a recommendation for each of the following items, and make the recommendation based off the guideline provided for each category, if there is any guideline provided.  Format the response so that it is listed as separate lines, and each line is the answer.
  Category: Music Genre, Guideline: Must be one of the genres available in the spotify api seed genres.
  Category: Mood, Guideline: Provide an emotional descriptive word that an 10 year old could understand
  Category: Inspiration Question, Guideline: Create a thought provoking question related to the song that was provided as reference.

  Provide me the response in a structure as follows:
  [Category Name: Answer, Category Name: Answer, Category Name: Answer]. Do not include the words Category Name or Answer in the response, only the actual answer.
  `;
};

const openai = new OpenAIApi(configuration);

const generateAction = async (req, res) => {
  let prompt;
  console.log("req", req.query);
  // const basePromptOutput = await Promise.resolve({
  //   text: `Music Genre: Pop
  //   Mood: Sad
  //   Key: C Minor
  //   Tempo: 80 bpm
  //   Inspiration Question: What is the hardest thing about being in a relationship?
  //   Reference Track: "Someone Like You" by Adele`,
  // });

  if (req.query.simple == "true") {
    console.log("ok");
    prompt = generateSimplePrompt(req.query.songValue, req.query.artistValue);
  } else {
    prompt = generateFullPrompt(req);
  }

  const baseCompletion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: JSON.stringify(prompt),
    temperature: 1,
    max_tokens: 250,
    seed: randomNum,
  });

  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
