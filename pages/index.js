import { useState, useEffect } from "react";

import SongIdeaCard from "./components/SongIdeaCard";
import SpotifyRecommendationCard from "./components/SpotifyRecommendationCard";
import Navbar from "./components/ui/Navbar";

const Home = () => {
  const [apiOutput, setApiOutput] = useState(null);
  const [spotifyRecommendations, setSpotifyRecommendations] = useState(null);
  const [referenceTrack, setReferenceTrack] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const clickGenerateButton = async () => {
    await callGenerateEndpoint();
    await getSpotifyRecommendations();
  };

  useEffect(() => {
    if (apiOutput !== null) {
      getReferenceTrack();
    }
  }, [apiOutput]);

  const getReferenceTrack = async () => {
    console.log(apiOutput);
    const referenceTrackMatch = apiOutput.match(
      /Reference Track: "(.*)" by (.*)/
    );
    const spotifyCall = await fetch(
      `/api/spotify/tracks?track=${encodeURIComponent(
        referenceTrackMatch[1]
      )}&artist=${encodeURIComponent(referenceTrackMatch[2])}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const referenceTrack = await spotifyCall.json();
    console.log("spotify", referenceTrack);
    const referenceTrackUrl =
      referenceTrack.output.tracks.items[0].external_urls.spotify;
    setReferenceTrack(referenceTrackUrl);
  };

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

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

  const getSpotifyRecommendations = async () => {
    const spotifyCall = await fetch("/api/spotify/recommendations", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const spotifyRecommendations = await spotifyCall.json();
    console.log("top tracks", spotifyRecommendations);
    const external_urls = spotifyRecommendations.output.tracks.map(
      (track) => track.external_urls.spotify
    );

    setSpotifyRecommendations(external_urls);
  };
  return (
    <div className="bg-gray-100 h-100">
      <Navbar />
      <div className="app">
        <div className="flex flex-col justify-center items-center mt-3">
          <h2 className="font-bold">Song Idea Generator</h2>
          <h3 className="">
            Generate a prompt to use as inspiration for your next song
          </h3>
        </div>
        <div className="flex prompt-buttons justify-center mt-3">
          <a
            className={
              isGenerating ? "generate-button loading" : "generate-button"
            }
            onClick={clickGenerateButton}
          >
            <div className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700  ">
              {isGenerating ? (
                <span className="loader"></span>
              ) : (
                <p>Generate</p>
              )}
            </div>
          </a>
        </div>
        {apiOutput !== null && referenceTrack !== null && (
          <SongIdeaCard text={apiOutput} referenceTrack={referenceTrack} />
        )}
        {apiOutput !== null && (
          <SpotifyRecommendationCard text={spotifyRecommendations} />
        )}
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
    </div>
  );
};

export default Home;
