import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Character } from './character/parse-file';


type VerifyPoemProps = {
  pathname: string;
};

const VerifyPoem: React.FC<VerifyPoemProps> = ({ pathname }) => {
  const [text, setText] = useState('');
  
  async function handleSubmit() {
    console.log(text);
    const response = await fetch(`${pathname}/data/characters.txt`);
    const txt = await response.text();
    const a = new Character(txt).parse();
    // console.log(a)
  }
  
  return (
    <div>
      <hr></hr>
      <br></br>
      <br></br>
      <div className="container">
        <div className="row">
          <div className="col-sm">
            One of three columns
          </div>
          <div className="col-sm">
            <textarea className="form-control fs-3" id="exampleFormControlTextarea1"
              value={text} onChange={(e) => setText(e.target.value)}
              rows={8}>
            </textarea>
            <Button variant="primary"
             onClick={handleSubmit}>Go somewhere</Button>
          </div>
          <div className="col-sm">
            One of three columns
          </div>
        </div>
      </div>
      <div className="App">
    </div> 
    </div>
  );
}

export default VerifyPoem;
