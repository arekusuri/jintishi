import React, { useState } from 'react';

function App() {
  const [text, setText] = useState('');
  
  function handleSubmit() {
    console.log(text);
  }
  
  return (
    <div>
      <hr></hr>
      <textarea value={text} onChange={(e) => setText(e.target.value)} 
      style={{
        width: '500px',
        height: '400px',
        border: '1px solid black',
        fontSize: '22px',
      }}
      />
      <br></br>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default App;
