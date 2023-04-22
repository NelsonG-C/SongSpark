import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import sparks from "../assets/sparks.png";

import SongIdeaCard from "./components/SongIdeaCard";

const Home = () => {
  const [apiOutput, setApiOutput] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const callGenerateEndpoint = async () => {
    console.log("ao", apiOutput);
    setIsGenerating(true);

    const spotifyCall = await fetch("/api/spotify", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const spotifyRecommendations = await spotifyCall.json();

    console.log("top tracks", spotifyRecommendations);

    console.log("Calling OpenAI...");
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: null,
    });

    const data = await response.json();
    console.log("data", data);
    const result = data.output.text;
    console.log("OpenAI replied...", typeof result);

    setApiOutput(result);
    console.log("api", result);
    setIsGenerating(false);
  };

  return (
    <div className="root">
      <div className="app">
        <div className="flex justify-center">
          <h1 className="font-bold mr-3">SongSpark</h1>
          <Image src={sparks} alt="Logo" className="logo" />
        </div>
        <div className="flex flex-col justify-center items-center mt-3">
          <h2 className="font-bold">Song Idea Generator</h2>
          <h3 className="">
            Generate a prompt to use as inspiration for your next song
          </h3>
        </div>
      </div>
      <div className="flex prompt-buttons justify-center mt-3">
        <a
          className={
            isGenerating ? "generate-button loading" : "generate-button"
          }
          onClick={callGenerateEndpoint}
        >
          <div className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700  ">
            {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
          </div>
        </a>
      </div>
      {apiOutput !== null && <SongIdeaCard text={apiOutput} />}
      <div className="flex prompt-buttons justify-center mt-3">
        <a
          className="btn btn-primary"
          href="https://airtable.com/shrTenIx1eiMT0UCB"
          target="_blank"
        >
          <div className="feedback">Give Feedback</div>
        </a>
      </div>
    </div>
  );
};

export default Home;
