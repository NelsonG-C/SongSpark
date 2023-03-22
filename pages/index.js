import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import buildspaceLogo from '../assets/buildspace-logo.png';



const Home = () => {
  const [userMovieInput, setUserMovieInput] = useState('');
  const [userOneLineInput, setUserOneLineInput] = useState('');
  const [userRecommendationInput, setUserRecommendationInput] = useState('');

  const [apiOutput, setApiOutput] = useState('')
const [isGenerating, setIsGenerating] = useState(false)

const callGenerateEndpoint = async () => {
  setIsGenerating(true);
  
  console.log("Calling OpenAI...")
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      movie: userMovieInput,
      oneLine: userOneLineInput,
      recommendation: userRecommendationInput
    }),
  });

  const data = await response.json();
  const { output } = data;
  console.log("OpenAI replied...", output.text)

  setApiOutput(`${output.text}`);
  setIsGenerating(false);
}

  const onUserChangedText = (event, stateFunction) => {
    console.log(event.target.value);
    stateFunction(event.target.value);
  };

  return (
    <div className="root">
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Generate Your Letterboxd movie review</h1>
          </div>
          <div className="header-subtitle">
            <h2>Write a quick sentence explaining what movie you watched, your one line verdict, and if you would recommend the film</h2>
          </div>
        </div>
        <div className="prompt-container">
          <input placeholder="The movie name" className="prompt-box"  value={userMovieInput} onChange={(e) => onUserChangedText(e, setUserMovieInput)}/>
        </div>
        <div className="prompt-container">
          <input placeholder="Your one line review" className="prompt-box"  value={userOneLineInput} onChange={(e) => onUserChangedText(e, setUserOneLineInput)}/>
        </div>
        <div className="prompt-container">
          <input placeholder="Do you recommend?" className="prompt-box"  value={userRecommendationInput} onChange={(e) => onUserChangedText(e, setUserRecommendationInput)}/>
        </div>
      </div>
      <div className="prompt-buttons">
        <a
          className={isGenerating ? 'generate-button loading' : 'generate-button'}
          onClick={callGenerateEndpoint}
        >
          <div className="generate">
          {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
          </div>
        </a>
      </div> 
      {apiOutput && (
        <div className="output">
          <div className="output-header-container">
            <div className="output-header">
              <h3>Output</h3>
            </div>
          </div>
          <div className="output-content">
            <p>{apiOutput}</p>
          </div>
        </div>
      )}
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
