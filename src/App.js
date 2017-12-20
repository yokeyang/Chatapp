import React, { Component } from 'react';
import Login from './Login';
import Chat from './Chat';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route exact path="/" component={Login}/>
            <Route exact path="/Chat" component={Chat}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
