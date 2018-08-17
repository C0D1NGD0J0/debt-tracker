import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layouts/Navbar";
import Dashboard from "./components/layouts/Dashboard";
import {Provider} from "react-redux";
import store from "./store";
import AddClient from "./components/clients/AddClient";
import ClientDetails from "./components/clients/ClientDetails";
import EditClientDetails from "./components/clients/EditClient";

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
		        		<Route exact path="/client/:id" component={ClientDetails} />
		        		<Route exact path="/client/edit/:id" component={EditClientDetails} />
		        	</Switch>
		      	</div>
		      </div>
		    </Router>
	    </Provider>
    );
  }
}

export default App;
