import { Spotify } from "react-spotify-embed";

const TextArrayComponent = ({ text }) => {
  // Split the text into an array at "\n"
  const textArray = text.split("\n");
  return (
    <div>
      {textArray.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
    </div>
  );
};

const SpotifyRecommendationCard = ({ text, audioDetails, songDetails }) => {
  return (
    <div>
      {audioDetails && (
        <div className="bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl">
          <h3 className="heading-fancy text-xl font-bold m-3">Your Spark</h3>
          <div className="flex m-3 flex-col leading-normal">
            <h4 className=" mb-2 font-bold tracking-tight text-gray-900 dark:text-white">
              Suggestions for your next song based off your search:
            </h4>
            <p>
              Tempo: {audioDetails.tempo} <br />
            </p>
            <p>
              Key: {audioDetails.key} <br />
            </p>
            <TextArrayComponent text={songDetails}></TextArrayComponent>
          </div>
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h4 className="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">
              Related suggestions to inspire your own creations:
            </h4>
            {text &&
              text.map((item, index) => {
                return <Spotify className="mt-2" wide link={item} />;
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SpotifyRecommendationCard;
