import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";

// Import Components
import Main from './components/main' 

// Import Style
import './App.css';

export default class App extends React.Component {
    

    render() {

        return (
            <Router>
              <Main />
            </Router>
        )
    }
}
