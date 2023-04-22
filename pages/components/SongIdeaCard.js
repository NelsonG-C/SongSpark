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

const SongIdeaCard = ({ text }) => {
  return (
    <div>
      <div className="output flex justify-center">
        <div className="output-header-container"></div>
        <TextArrayComponent text={text}></TextArrayComponent>
      </div>
    </div>
  );
};

export default SongIdeaCard;
