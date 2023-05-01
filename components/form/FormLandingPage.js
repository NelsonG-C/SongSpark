import React, { useState, useEffect } from "react";
import LyricGeneratorForm from "./LyricGeneratorForm";
import GeneralEntry from "./GeneralEntry";
import SearchBar from "./SearchBar";

function Form(props) {
  const [formType, setFormType] = useState(null);
  const [formData, setFormData] = useState(null);

  function handleFormTypeClick(event, type) {
    event.preventDefault();
    setFormType(type);
    setFormData(null);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Form data:", formData);
    setFormData(null);
    setFormType(null);
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleLyricChange(event) {
    const { name, value } = event.target;
    setLyrics(value);
  }

  const [songResults, setSongResults] = useState("");
  const [artistResults, setArtistResults] = useState("");
  const [lyrics, setLyrics] = useState("");

  // const getGenre = async () => {
  //   console.log("finding genre", generalSongDetails);
  //   const regex = /Music Genre:\s*(\w+)/;
  //   const match = generalSongDetails.match(regex);

  //   if (match) {
  //     const extractedGenre = match[1];
  //     setGenre(extractedGenre);
  //     console.log("genre", extractedGenre);
  //   }
  // };

  const handleSongChanged = (event) => {
    setSongResults(event.target.value);
  };

  const handleArtistChanged = (event) => {
    setArtistResults(event.target.value);
  };

  let FormComponent = null;

  if (formType === "form2") {
    FormComponent = (
      <div>
        {
          <SearchBar
            artistValue={artistResults}
            handleArtistChange={handleArtistChanged}
            songValue={songResults}
            handleSongChange={handleSongChanged}
            handleSearchClicked={() =>
              props.searchForRecommendations(songResults, artistResults)
            }
          />
        }
      </div>
    );
  } else if (formType === "form3") {
    FormComponent = (
      <div>
        <LyricGeneratorForm
          handleLyricValueChange={handleLyricChange}
          handleLyricClicked={() => props.setLyricSearchOutput(lyrics)}
        />
      </div>
    );
  } else if (formType === "form4") {
    <GeneralEntry />;
  }

  return (
    <div>
      <div class="flex mt-2">
        {/* <button
          className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          onClick={(e) => handleFormTypeClick(e, "form4")}
        >
          Generate An Idea From My Thoughts
        </button> */}
        <button
          className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          onClick={(e) => handleFormTypeClick(e, "form2")}
        >
          Use a song as a reference
        </button>
        <button
          className=" ml-2 py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          onClick={(e) => handleFormTypeClick(e, "form3")}
        >
          Make some lyrics
        </button>
        <button
          className=" ml-2 py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          onClick={(e) => props.clickGenerateButton()}
        >
          Spark Some Random Inspiration
        </button>
      </div>
      {FormComponent && <form onSubmit={handleSubmit}>{FormComponent}</form>}
    </div>
  );
}

export default Form;
