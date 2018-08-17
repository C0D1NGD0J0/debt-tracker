import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layouts/Navbar";
import Dashboard from "./components/layouts/Dashboard";
import {Provider} from "react-redux";
import store from "./store";
import AddClient from "./components/clients/AddClient";

class App extends Component {
  render() {
    return (
    	<Provider store={store}>
	    	<Router>
		      <div className="App">
		      	<Navbar />
		      	<div className="container">
		        	<Switch>
		        		<Route exact path="/" component={Dashboard} />
		        		<Route exact path="/client/new" component={AddClient} />
		        	</Switch>
		      	</div>
		      </div>
		    </Router>
	    </Provider>
    );
  }
}

export default App;
