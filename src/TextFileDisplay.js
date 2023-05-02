import React, { useState, useEffect } from 'react';

const TextFileDisplay = ({ filename }) => {
  const [fileContent, setFileContent] = useState('');

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const response = await fetch(`/data/${filename}`);
        const text = await response.text();
        setFileContent(text);
      } catch (error) {
        console.error('Error fetching file:', error);
      }
    };
    fetchFile();
  }, [filename]);

  return (
    
    <div className="half-width">
      <pre className="half-width left-aligned">{fileContent}</pre>
    </div>
  );
};

export default TextFileDisplay;

