import React, { useState, useEffect } from 'react';

const TextFileDisplay = () => {
  const [fileContent, setFileContent] = useState('');

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const response = await fetch('/data/categories.txt');
        const text = await response.text();
        setFileContent(text);
      } catch (error) {
        console.error('Error fetching file:', error);
      }
    };
    fetchFile();
  }, []);

  return (
    <div>
      <pre>{fileContent}</pre>
    </div>
  );
};

export default TextFileDisplay;

