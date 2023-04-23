import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import TextFileDisplay from './TextFileDisplay';


function App() {
  const [showComponent, setShowComponent] = useState(false);

  const handleClick = () => {
    setShowComponent(!showComponent);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
		i am here
        </p>
        <a className="App-link"
          href="data/categories.txt"
          target="_blank"
          rel="noopener noreferrer"
        >
          see categoreis
        </a>
        <a className="App-link"
          href="data/characters.txt"
          target="_blank"
          rel="noopener noreferrer"
        >
          see characters
        </a>

	<button onClick={handleClick}>
        {showComponent ? 'Hide Component' : 'Show Component'}
	</button>
        {showComponent && <TextFileDisplay />}
      </header>
    </div>
  );
}

export default App;
