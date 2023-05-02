import './App.css';
import React from 'react';
import TextFileDisplay from './TextFileDisplay';
import Home from './Home';
import VerifyPoem from './VerifyPoem';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const Menu = () => {
  return (
    <ul>
      <li> <NavLink to="/" activeClassName="active">Home</NavLink> </li>
      <li> <NavLink to="/verify" activeClassName="active">查询</NavLink> </li>
      <li> <NavLink to="/categories" activeClassName="active">四声</NavLink> </li>
      <li> <NavLink to="/characters" activeClassName="active">平水韵表</NavLink> </li>
    </ul>
  );  
}

function App() {
  return (
    <div className="App">
      <Router>
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/verify" element={<VerifyPoem />} />
          <Route path="/categories" element={<TextFileDisplay filename="categories.txt"/>} />
          <Route path="/characters" element={<TextFileDisplay filename="characters.txt"/>} />
        </Routes> 
      </Router>
    </div>
  );
}

export default App;
