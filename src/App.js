import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layouts/Navbar";

class App extends Component {
  render() {
    return (
    	<Router>
	      <div className="App">
	      	<Navbar />

	      	<div className="container">
	        	<h1>Welcome There</h1>
	      	</div>
	      </div>
	    </Router>
    );
  }
}

export default App;
