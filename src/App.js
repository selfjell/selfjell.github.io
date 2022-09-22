import './App.css';
import {useEffect, useState} from "react";

function App() {
  const [error, setError] = useState();
  const [memeUrl, setMemeUrl] = useState();

  const getRandomMeme = async () => {
    const response = await fetch("https://meme-api.herokuapp.com/gimme")
    if(response.status !== 200){
      setError("Could not fetch your dank memes :(");
    } else {
      setError(null);
    }
    const memeParams = await response.json();
    console.log(memeParams)
    if(memeParams.nsfw === true || memeParams.spoiler === true){
      getRandomMeme()
      return
    }
    setMemeUrl(memeParams.url)
  }

  useEffect(() => {
    getRandomMeme();
  }, [])
  return (
    <div className="App">
      {error &&
      <h1>{error}</h1>
      }
      {memeUrl &&
      <img src={memeUrl} alt={"A dank meme for you"}/>
      }
    </div>
  );
}

export default App;
