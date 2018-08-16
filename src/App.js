import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layouts/Navbar";
import Dashboard from "./components/layouts/Dashboard";

class App extends Component {
  render() {
    return (
    	<Router>
	      <div className="App">
	      	<Navbar />
	      	<div className="container">
	        	<Switch>
	        		<Route exact path="/" component={Dashboard} />
	        	</Switch>
	      	</div>
	      </div>
	    </Router>
    );
  }
}

export default App;
