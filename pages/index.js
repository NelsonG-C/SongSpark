import React, { useState, useEffect } from "react";
import Navbar from "../components/ui/Navbar";
import Background from "../components/Background";
import FormLandingPage from "../components/form/FormLandingPage";
import ResultDisplayPage from "../components/sparks/ResultDisplayPage";

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
  const [isGenerating, setIsGenerating] = useState(false);
  const [spotifyRecommendations, setSpotifyRecommendations] = useState(null);
  const [referenceTrack, setReferenceTrack] = useState(null);
  const [searchTrackAudioDetails, setSearchTrackAudioDetails] = useState(null);
  const [generalSongDetails, setGeneralSongDetails] = useState(null);
  const [genre, setGenre] = useState(null);
  const [lyricSearchOutput, setLyricSearchOutput] = useState(null);

  const searchForRecommendations = async (songResults, artistResults) => {
    setApiOutput(null);
    await callGenerateEndpoint(false, songResults, artistResults);
    // await getGenre();
    await getSpotifyRecommendations(songResults, artistResults);
  };

  const getSpotifyRecommendations = async (songResults, artistResults) => {
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

  const callGenerateEndpoint = async (simple, songResults, artistResults) => {
    setIsGenerating(true);
    console.log("simpl", simple);
    const url = simple
      ? "/api/generate"
      : `/api/generate?simple=${simple}&song=${songResults}&artist=${artistResults}`;

    console.log("Calling OpenAI...");
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: null,
    });

    const data = await response.json();
    const result = data.output.text;

    if (!simple) {
      setGeneralSongDetails(result);
    } else {
      setApiOutput(result);
      console.log("api", result);
    }
    setIsGenerating(false);
  };

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

  const clickGenerateButton = async () => {
    console.log("here");
    setSpotifyRecommendations(null);
    await callGenerateEndpoint(true);
  };

  const handleLyricSearch = async (lyrics) => {
    console.log("Calling OpenAI...");
    const response = await fetch(`/api/openai/lyrics?lyrics=${lyrics}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: null,
    });

    const data = await response.json();
    const result = data.output.text;

    setLyricSearchOutput(result);
  };

  useEffect(() => {
    if (apiOutput !== null) {
      getReferenceTrack();
    }
  }, [apiOutput]);

  return (
    <div className="h-full">
      <Navbar />
      <div className="h-full app">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 p-4 md:p-8">
            <div className="flex flex-col mt-3">
              <h2 className="font-bold mb-2">Spark your next music idea</h2>
              <h3 className="pb-4 text-sm md:text-base">
                SongSpark is a tool that uses AI to guide you with your next
                song idea. Choose one of the following starting points based on
                your needs, and let SongSpark do the rest.
              </h3>
              <h3 className="mt-3 font-bold text-sm md:text-base">
                I'm looking for...
              </h3>
            </div>
            <FormLandingPage
              searchForRecommendations={searchForRecommendations}
              clickGenerateButton={clickGenerateButton}
              setLyricSearchOutput={handleLyricSearch}
            />
          </div>

          <div className="w-2/2 p-8">
            <ResultDisplayPage
              apiOutput={apiOutput}
              spotifyRecommendations={spotifyRecommendations}
              referenceTrack={referenceTrack}
              searchTrackAudioDetails={searchTrackAudioDetails}
              generalSongDetails={generalSongDetails}
              lyrics={lyricSearchOutput}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RootApp;
