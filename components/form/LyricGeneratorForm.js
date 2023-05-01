import React from "react";

function LyricGeneratorForm(props) {
  return (
    <div className="mt-2 flex justify-center items-center">
      <div className="w-full    ">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="search"
          >
            Provide some description of what you want your lyrics to be about:
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="search"
            type="text"
            placeholder="e.g. I want to write a song about a beautiful day."
            onChange={props.handleLyricValueChange}
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className=" ml-2 py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            type="button"
            onClick={props.handleLyricClicked}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default LyricGeneratorForm;
