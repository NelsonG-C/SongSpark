import { useState, useEffect } from "react";

import SongIdeaCard from "../components/SongIdeaCard";
import SpotifyRecommendationCard from "../components/SpotifyRecommendationCard";
import Navbar from "../components/ui/Navbar";
import SearchBar from "../components/ui/SearchBar";
import Background from "../components/Background";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const RootApp = () => {
  return (
    <>
      <Background />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <Home />
      </div>
    </>
  );
};

const Home = () => {
  const [apiOutput, setApiOutput] = useState(null);
  const [spotifyRecommendations, setSpotifyRecommendations] = useState(null);
  const [referenceTrack, setReferenceTrack] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [displaySearch, setDisplaySearch] = useState(false);
  const [songResults, setSongResults] = useState("");
  const [artistResults, setArtistResults] = useState("");
  const [searchTrackAudioDetails, setSearchTrackAudioDetails] = useState(null);
  const [generalSongDetails, setGeneralSongDetails] = useState(null);
  const [genre, setGenre] = useState(null);

  const clickGenerateButton = async () => {
    setDisplaySearch(false);
    setSpotifyRecommendations(null);
    await callGenerateEndpoint();
  };

  const clickSimilarSongsButton = async () => {
    setDisplaySearch(true);
  };

  const searchForRecommendations = async () => {
    setApiOutput(null);
    await callGenerateEndpoint(true);
    // await getGenre();
    await getSpotifyRecommendations();
  };

  // const getGenre = async () => {
  //   console.log("finding genre", generalSongDetails);
  //   const regex = /Music Genre:\s*(\w+)/;
  //   const match = generalSongDetails.match(regex);

  //   if (match) {
  //     const extractedGenre = match[1];
  //     setGenre(extractedGenre);
  //     console.log("genre", extractedGenre);
  //   }
  // };

  const handleSongChanged = (event) => {
    setSongResults(event.target.value);
  };

  const handleArtistChanged = (event) => {
    setArtistResults(event.target.value);
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

  const callGenerateEndpoint = async (simple) => {
    setIsGenerating(true);

    console.log("Calling OpenAI...");
    const response = await fetch(
      `/api/generate?simple=${simple}&song=${songResults}&artist=${artistResults}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: null,
      }
    );

    const data = await response.json();
    const result = data.output.text;

    if (simple) {
      setGeneralSongDetails(result);
    } else {
      setApiOutput(result);
      console.log("api", result);
    }
    setIsGenerating(false);
  };

  const getSpotifyRecommendations = async () => {
    const currentSongDetails = await fetch(
      `/api/spotify/tracks?track=${encodeURIComponent(
        songResults
      )}&artist=${encodeURIComponent(artistResults)}&genre=${genre}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const currentSong = await currentSongDetails.json();
    console.log("current song", currentSong);

    const trackId = currentSong.output.tracks.items[0].id;
    const artistId = currentSong.output.tracks.items[0].artists[0].id;

    const spotifyCall = await fetch(
      `/api/spotify/recommendations?track_id=${trackId}&artist_id=${artistId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const spotifyRecommendations = await spotifyCall.json();
    console.log("top tracks", spotifyRecommendations);
    const external_urls = spotifyRecommendations.output.tracks.map(
      (track) => track.external_urls.spotify
    );

    setSearchTrackAudioDetails(spotifyRecommendations.audioResult);
    console.log("audio details", searchTrackAudioDetails);
    setSpotifyRecommendations(external_urls);
  };
  return (
    <div className="h-full">
      <Navbar />
      <div className="h-full app">
        <div className="flex flex-col h-screen md:flex-row">
          <div className="w-full md:w-1/2 p-4 md:p-8">
            <div className="flex flex-col mt-3">
              <h2 className="font-bold mb-2">Spark your next music idea</h2>
              <h3 className="text-sm md:text-base">
                SongSpark is a tool that uses AI to guide you with your next
                song idea. Choose one of the following starting points based on
                your needs, and let SongSpark do the rest.
              </h3>
              <h3 className="mt-3 font-bold text-sm md:text-base">
                I'm looking for...
              </h3>
            </div>
            <div className="flex flex-wrap prompt-buttons mt-3">
              <a
                className={
                  isGenerating ? "generate-button loading" : "generate-button"
                }
                onClick={clickGenerateButton}
              >
                <div className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 md:mr-4">
                  {isGenerating ? (
                    <LoadingSpinner />
                  ) : (
                    <p>A random spark of inspiration</p>
                  )}
                </div>
              </a>
              <a
                className={
                  isGenerating ? "generate-button loading" : "generate-button"
                }
                onClick={clickSimilarSongsButton}
              >
                <div className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700  ">
                  <p>To use a song as a reference</p>
                </div>
              </a>
            </div>
            <div>
              {displaySearch && (
                <SearchBar
                  artistValue={artistResults}
                  handleArtistChange={handleArtistChanged}
                  songValue={songResults}
                  handleSongChange={handleSongChanged}
                  handleSearchClicked={searchForRecommendations}
                />
              )}
            </div>
          </div>
          <div className="w-2/2 p-8">
            {apiOutput !== null && referenceTrack !== null && (
              <SongIdeaCard text={apiOutput} referenceTrack={referenceTrack} />
            )}
            {spotifyRecommendations !== null && generalSongDetails !== null && (
              <SpotifyRecommendationCard
                audioDetails={searchTrackAudioDetails}
                songDetails={generalSongDetails}
                text={spotifyRecommendations}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RootApp;
