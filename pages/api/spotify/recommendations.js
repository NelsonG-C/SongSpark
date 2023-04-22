const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

const getTopTracks = async (req, res) => {
  const accessToken = await getAccessToken(clientId, clientSecret);
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  const tracks = await getRecommendations(
    "4NHQUGzhtTLFvgF5SZesLK",
    "0c6xIDDpzE81m2q797ordA",
    "pop",
    accessToken
  );
  res.status(200).json({ output: tracks });
  return tracks;
};

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
    )}&seed_genres=${encodeURIComponent(seedGenres)}&limit=3`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const result = await response.json();
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
