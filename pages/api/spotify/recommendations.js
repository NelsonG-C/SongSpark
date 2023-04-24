const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

const notesByNumber = {
  0: ["C", "B#"],
  1: ["C#", "Db"],
  2: ["D"],
  3: ["D#", "Eb"],
  4: ["E", "Fb"],
  5: ["F", "E#"],
  6: ["F#", "Gb"],
  7: ["G"],
  8: ["G#", "Ab"],
  9: ["A"],
  10: ["A#", "Bb"],
  11: ["B", "Cb"],
};

const getGenres = async (genre, accessToken) => {
  const response = await fetch(
    `https://api.spotify.com/v1/recommendations/available-genre-seeds`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const data = await response.json();
  console.log("data", data);
  return data.genres;
};

const getTopTracks = async (req, res) => {
  const searchQuery = req.query;
  console.log("searchQuery", searchQuery);
  const accessToken = await getAccessToken(clientId, clientSecret);

  const genres = await getGenres(req.genre, accessToken);
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  const tracks = await getRecommendations(
    req.query.track_id,
    req.query.artist_id,
    "pop",
    accessToken
  );

  const audioDetails = await getAudioDetails(req.query.track_id, accessToken);
  console.log("audioDetails", audioDetails);
  const audioResult = {
    tempo: audioDetails.tempo,
    key: notesByNumber[audioDetails.key][0],
  };
  return res.status(200).json({ output: tracks, audioResult: audioResult });
};

async function getAudioDetails(trackId, accessToken) {
  const response = await fetch(
    `https://api.spotify.com/v1/audio-features/${trackId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const result = await response.json();
  return result;
}

async function getRecommendations(
  seedArtists,
  seedTracks,
  seedGenres,
  accessToken
) {
  const response = await fetch(
    `https://api.spotify.com/v1/recommendations?seed_artists=${encodeURIComponent(
      seedArtists
    )}&seed_tracks=${encodeURIComponent(
      seedTracks
    )}&seed_genres=pop,alternative,edm&limit=3`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const result = await response.json();
  console.log("res", result);
  return result;
}

async function getAccessToken(clientId, clientSecret) {
  const encodedAuth = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64"
  );

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${encodedAuth}`,
    }),
    body: "grant_type=client_credentials",
  });

  const data = await response.json();

  return data.access_token;
}

export default getTopTracks;
