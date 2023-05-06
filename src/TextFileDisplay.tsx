import React, { useState, useEffect } from 'react';

type TextFileDisplayProps = {
  pathname: string;
  filename: string;
};

const TextFileDisplay: React.FC<TextFileDisplayProps> = ({ pathname, filename }) => {
  const [fileContent, setFileContent] = useState('');

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const response = await fetch(`${pathname}/data/${filename}`);
        const text = await response.text();
        setFileContent(text);
      } catch (error) {
        console.error('Error fetching file:', error);
      }
    };
    fetchFile();
  }, [filename]);

  return (
    
    <div className="">
      <pre className="pre-wrap left-aligned">{fileContent}</pre>
    </div>
  );
};

export default TextFileDisplay;

