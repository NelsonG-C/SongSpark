const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

const getReferenceTrack = async (req, res) => {
  console.log("req", req.query);
  const track = req.query.track;
  const artist = req.query.artist;
  const accessToken = await getAccessToken(clientId, clientSecret);
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  const referenceTrack = await searchForTrack(track, artist, accessToken);
  return res.status(200).json({ output: referenceTrack });
};

async function searchForTrack(track, artist, accessToken) {
  console.log("track", track);
  console.log("artist", artist);
  const response = await fetch(
    `https://api.spotify.com/v1/search?query=${encodeURIComponent(
      track
    )}${encodeURIComponent(artist)}&type=track&limit=1`,
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

export default getReferenceTrack;
