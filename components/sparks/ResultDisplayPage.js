import React from "react";
import SongIdeaCard from "../.././components/SongIdeaCard";
import SpotifyRecommendationCard from "../.././components/SpotifyRecommendationCard";
import LyricsCard from "../sparks/LyricsCard";

function ResultDisplayPage(props) {
  return (
    <div>
      {props.apiOutput !== null && props.referenceTrack !== null && (
        <SongIdeaCard
          text={props.apiOutput}
          referenceTrack={props.referenceTrack}
        />
      )}
      {props.spotifyRecommendations !== null &&
        props.generalSongDetails !== null && (
          <SpotifyRecommendationCard
            audioDetails={props.searchTrackAudioDetails}
            songDetails={props.generalSongDetails}
            text={props.spotifyRecommendations}
          />
        )}
      {props.lyrics !== null && <LyricsCard text={props.lyrics} />}
    </div>
  );
}

export default ResultDisplayPage;
