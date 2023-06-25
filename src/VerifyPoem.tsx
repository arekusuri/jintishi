import { Button, Card } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { HanziTable } from './hanzi-table';
import { Hanzi } from './hanzi'
import React, { useState, useEffect, useRef } from 'react';

type VerifyPoemProps = {
  hanzi_table: HanziTable;
};


const punctuations_en = [",", ".", "!", "?"]
const punctuations_zh = ["，", "。", "？", "！"]
const punctuations = punctuations_en.concat(punctuations_zh);


const pingzhe = (hanzi_table: HanziTable, char: string): string => {
  if (punctuations_en.includes(char)) {
    return " ";
  }
  if (punctuations_zh.includes(char)) {
    return "  "; // 全角空格
  }
  const hanzi = hanzi_table.table[char];
  if (hanzi == undefined) {
    return '？';
  }
  const sisheng = hanzi.sisheng
  if ((sisheng & 0b1) == 0b1 && sisheng-1 > 0) {
    return '辨';
  }
  if (sisheng == 1) {
    return '平';
  }
  return '仄';
}

function dropRightPunctuations(str: string): string {
  let lastIndex = str.length - 1;
  while (lastIndex >= 0 && punctuations.includes(str[lastIndex])) {
    lastIndex--;
  }
  return str.slice(0, lastIndex + 1);
}

const rhyme = (hanzi_table: HanziTable, line: string): string => {
  const line_trimed = dropRightPunctuations(line)
  const last = line_trimed[line_trimed.length - 1]
  const hanzi = hanzi_table.table[last];
  return "[" + hanzi.category.join(",") + "]"
}



const VerifyPoem: React.FC<VerifyPoemProps> = ({ hanzi_table }) => {
  const [text, setText] = useState('');
  const [preText, setPreText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const savedText = localStorage.getItem("savedText");
    if (savedText) {
      setText(savedText);
    }
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const currentText = event.target.value;
    setText(currentText);
    localStorage.setItem("savedText", currentText);
  };
  const handleTextareaMouseDown = () => {
    if (textareaRef.current) {
      textareaRef.current.select();
    }
  };
  
  async function handleSubmit() {
    const arr = text.split(/\n/);
    const line_list: Array<string> = []
    for (var line of arr) {
      const line_result: Array<string> = [];
      for (var char of line.split("")) {
        line_result.push(pingzhe(hanzi_table, char));
      }
      const result: string = line_result.join("")
      const yun = rhyme(hanzi_table, line)
      line_list.push(line + yun + "\n" + result);
    }
    setPreText(line_list.join("\n"));
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
            <textarea className="form-control fs-3"
              id="exampleFormControlTextarea1"
              ref={textareaRef}
              value={text} 
              onChange={handleInputChange}
              rows={4}
              onMouseUp={handleTextareaMouseDown}
            >
            </textarea>
            <br></br>
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
