import React from 'react';
import './App.css';
import NavBar from './components/Navbar/Navbar';
// import bodyImage from '../assets/'
import { BrowserRouter as Router, Route} from "react-router-dom";
import Events from './Events';
import About from './About';
import Membership from './Membership';
import Home from './Home';
import Careerfair from './Careerfair';

function App() {
  return (
    <Router>
      <NavBar/>
        <Route path="/" exact component={Home} />
        <Route path="/about/" component={About} />
        <Route path="/membership/" component={Membership} />
        <Route path="/events/" component={Events} />
        <Route path="/careerfair/" component={Careerfair} />
    </Router>
  );
}

export default App;
