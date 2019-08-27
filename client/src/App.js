import React from 'react';
// import bodyImage from '../assets/'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import About from './About';
import './App.css';
import Careerfair from './Careerfair';
import NavBar from './components/Navbar/Navbar';
import Events from './Events';
import Home from './Home';
import Membership from './Membership';

function App() {
  return (
    <Router>
      <NavBar />
      <Route path="/" exact component={Home} />
      <Route path="/about/" component={About} />
      <Route path="/membership/" component={Membership} />
      <Route path="/events/" component={Events} />
      <Route path="/careerfair/" component={Careerfair} />
    </Router>
  );
}

export default App;
