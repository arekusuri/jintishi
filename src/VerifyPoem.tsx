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

// component
const VerifyPoem: React.FC<VerifyPoemProps> = ({ hanzi_table }) => {
  const [text, setText] = useState('');
  const [preText, setPreText] = useState('');
  const [output, setOutput] = useState<Hanzi[][]>([]);
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
  const process_text = (text: string[], hanzi_table: HanziTable) => {
    let text_result: Hanzi[][] = [];
    text_result = text.map((line: string) =>  {
      const line_result: Hanzi[] = line.split("").map((char) => {
        if (punctuations.includes(char)) {
          return new Hanzi(char);
        }
        return hanzi_table.table[char];
      });
      return line_result;
    });
    setOutput(text_result);
  };

  
  const handleCharMouseOver = (hanzi: Hanzi, event: React.MouseEvent) => {
    const topDiv = document.getElementById(event.currentTarget.id);
    if (topDiv) {
      topDiv.style.border = '2px solid green';
      const span = topDiv.querySelector('span');
      if (span) {
        span.style.color = 'red';
      }
    }
  };

  const handleCharMouseOut = (hanzi: Hanzi, event: React.MouseEvent) => {
    const topDiv = document.getElementById(event.currentTarget.id);
    if (topDiv) {
      topDiv.style.border = '2px solid transparent';
      const span = topDiv.querySelector('span');
      if (span) {
        span.style.color = 'gray';
      }
    }
  };

  const renderOutput = () => {
    return output.map((hanzi_array, row_index) => {
      return renderOneLine(hanzi_array, row_index)
    })
  }

  const renderOneLine = (hanzi_array: Hanzi[], row_index: number) => {
    return (
      <div key={`line-key-${row_index}`} style={{ display: 'flex' }}>
        {hanzi_array.map((hanzi, col_index) => (
          <div
            key={`hanzi-key-${row_index}-${col_index}`}
            style={{ margin: '0px' }}
          >
            <div
              id={`char-id-${row_index}-${col_index}`}
              key={`char-key-${row_index}-${col_index}`}
              className="top-div"
              onMouseOver={(event) => handleCharMouseOver(hanzi, event)}
              onMouseOut={(event) => handleCharMouseOut(hanzi, event)}
              style={{
                backgroundColor: '',
                padding: '0px',
                border: '2px solid transparent',
              }}
              data-tip={hanzi.kanji}
              >
              <span
                style={{
                  margin: '0px',
                  color: 'gray',
                  position: 'relative',
                  display: 'inline-block',
                  padding: '0px',
                  // border: '2px solid transparent',
                }}
              >
                {hanzi.kanji}
              </span>
            </div>
            <div className="bottom-div"
              id={`pz-id-${row_index}-${col_index}`}
              key={`pz-key-${row_index}-${col_index}`}
            >
              <span
                style={{
                  margin: '0px',
                  color: 'blue',
                  display: 'inline-block',
                }}
              >
                {hanzi.pingzhe()}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  async function handleSubmit() {
    const arr = text.split(/\n/);
    const line_list: Array<string> = []
    process_text(arr, hanzi_table);
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
              <div>{renderOutput()}</div>
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
