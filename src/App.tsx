import './App.css';
import React from 'react';
import TextFileDisplay from './TextFileDisplay';
import Home from './Home';
import VerifyPoem from './VerifyPoem';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const Menu = () => {
  return (
    <ul>
      <li> <NavLink to="/">Home</NavLink> </li>
      <li> <NavLink to="/verify">查询</NavLink> </li>  
      <li> <NavLink to="/categories">四声</NavLink> </li>  
      <li> <NavLink to="/characters">平水韵表</NavLink> </li>
    </ul>
  );  
}


function App() {
  const pathname = process.env.REACT_APP_PATHNAME ? process.env.REACT_APP_PATHNAME : '';
  return (
    <div className="App">
      <Router>
        <Menu />
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/verify" element={<VerifyPoem />} />
          <Route path="/categories" element={<TextFileDisplay filename="categories.txt" pathname={pathname} />} />
          <Route path="/characters" element={<TextFileDisplay filename="characters.txt" pathname={pathname} />} />
        </Routes> 
      </Router>
    </div>
  );
}

export default App;
