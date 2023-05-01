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

const LyricsCard = ({ text, referenceTrack }) => {
  return (
    <div>
      <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl">
        <div className="flex flex-col justify-between p-4 leading-normal">
          <div className="flex items-center mb-2">
            <h5 className="heading-fancy text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Your New Lyrics
            </h5>
          </div>

          {text && <TextArrayComponent text={text}></TextArrayComponent>}
        </div>
      </div>
    </div>
  );
};

export default LyricsCard;
