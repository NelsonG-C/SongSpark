import Image from "next/image";
import sparks from "../assets/sparks.png";
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

const SongIdeaCard = ({ text, referenceTrack }) => {
  return (
    <div>
      <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl">
        <div className="flex flex-col justify-between p-4 leading-normal">
          <div className="flex items-center mb-2">
            <Image className="sublogo" src={sparks} alt="" />
            <h5 className="heading-fancy ml-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Your New Song Inspiration
            </h5>
          </div>

          {text && <TextArrayComponent text={text}></TextArrayComponent>}
          <Spotify className="mt-2" wide link={referenceTrack} />
        </div>
      </div>
    </div>
  );
};

export default SongIdeaCard;
