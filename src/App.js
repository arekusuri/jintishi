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
      <li> <NavLink to="/pingshuiyun" activeClassName="active">Home</NavLink> </li>
      <li> <NavLink to="/pingshuiyun/verify" activeClassName="active">查询</NavLink> </li>
      <li> <NavLink to="/pingshuiyun/categories" activeClassName="active">四声</NavLink> </li>
      <li> <NavLink to="/pingshuiyun/characters" activeClassName="active">平水韵表</NavLink> </li>
    </ul>
  );  
}

function App() {
  return (
    <div className="App">
      <Router>
        <Menu />
        <Routes>
          <Route path="/pingshuiyun" element={<Home />} />
          <Route path="/pingshuiyun/verify" element={<VerifyPoem />} />
          <Route path="/pingshuiyun/categories" element={<TextFileDisplay filename="categories.txt"/>} />
          <Route path="/pingshuiyun/characters" element={<TextFileDisplay filename="characters.txt"/>} />
        </Routes> 
      </Router>
    </div>
  );
}

export default App;
