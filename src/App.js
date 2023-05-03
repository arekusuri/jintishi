import './App.css';
import React from 'react';
import TextFileDisplay from './TextFileDisplay';
import Home from './Home';
import VerifyPoem from './VerifyPoem';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const Menu = () => {
  const pathname = process.env.REACT_APP_PATHNAME || '';
  return (
    <ul>
      <li> <NavLink to={`${pathname}/`}>Home</NavLink> </li>
      <li> <NavLink to={`${pathname}/verify`}>查询</NavLink> </li>  
      <li> <NavLink to={`${pathname}/categories`}>四声</NavLink> </li>  
      <li> <NavLink to={`${pathname}/characters`}>平水韵表</NavLink> </li>
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
          <Route path={`${pathname}/`} element={<Home />} />
          <Route path={`${pathname}/verify`} element={<VerifyPoem />} />
          <Route path={`${pathname}/categories`} element={<TextFileDisplay filename="categories.txt" pathname={pathname} />} />
          <Route path={`${pathname}/characters`} element={<TextFileDisplay filename="characters.txt" pathname={pathname} />} />
        </Routes> 
      </Router>
    </div>
  );
}

export default App;
