import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { HanziTable } from './hanzi-table';
import { Hanzi } from './hanzi'


type VerifyPoemProps = {
  hanzi_table: HanziTable;
};

const pingzhe = (hanzi_table: HanziTable, char: string): string => {
  if (char == ',' || char == '，' || char == '.' || char == '。' || char == '?' || char == '?') {
    return char;
  }
  const hanzi = hanzi_table.table[char];
  if (hanzi == undefined) {
    return '？';
  }
  const sisheng = hanzi.sisheng
  if ((sisheng & 0b1) == 0b1 && sisheng-1 > 0) {
    return '辩';
  }
  if (sisheng == 1) {
    return '平';
  }
  return '仄';
}

const VerifyPoem: React.FC<VerifyPoemProps> = ({ hanzi_table }) => {
  const [text, setText] = useState('');
  const [preText, setPreText] = useState('');
  
  async function handleSubmit() {
    const arr = text.split(/\n/);
    const line_list: Array<string> = []
    for (var line of arr) {
      console.log(line);
      const line_result: Array<string> = [];
      for (var char of line.split("")) {
        line_result.push(pingzhe(hanzi_table, char));
      }
      const result: string = line_result.join("")
      console.log();
      line_list.push(line + "\n" + result);
    }
    setPreText(line_list.join("\n"));
    console.log(pingzhe(hanzi_table, '当'))
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
              rows={4}>
            </textarea>
            <div className="text-start">
              <Button variant="primary" onClick={handleSubmit}>查验平仄</Button>
            </div>
             <br></br>
            <div className="col-sm fs-3 text-start">
              <pre id="output">{preText}</pre>
            </div> 
          </div>
          <div className="col-sm">
            One of three columns
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyPoem;
