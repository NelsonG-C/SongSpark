import Image from "next/image";
import sparks from "../../assets/sparks.png";
import { Spotify } from "react-spotify-embed";

const TextArrayComponent = ({ text }) => {
  console.log("text", text);
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
      <a
        href="#"
        className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <Image
          className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
          src={sparks}
          alt=""
        />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Your New Song Inspiration
          </h5>
          <TextArrayComponent text={text}></TextArrayComponent>
          <Spotify wide link={referenceTrack} />
        </div>
      </a>

      <div className="output flex justify-center">
        <div className="output-header-container"></div>
      </div>
    </div>
  );
};

export default SongIdeaCard;
