import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";

class Navbar extends Component {
	state = {
		isAuthenticated: false
	}
	
	static getDerivedStateFromProps(props, state){
		const { auth } = props;
		if(auth.uid){
			return {isAuthenticated: true}
		} else {
			return {isAuthenticated: false}
		}
	}

	onLogoutClick = (e) =>{
		e.preventDefault();
		const { firebase } = this.props;
		firebase.logout();
	}

	render() {
		const { isAuthenticated } = this.state;
		const { auth } = this.props;

		return (
			<nav className="navbar navbar-inverse navbar-fixed-top">
	      <div className="container">
	        <div className="navbar-header">
	          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
	            <span className="sr-only">Toggle navigation</span>
	            <span className="icon-bar"></span>
	            <span className="icon-bar"></span>
	            <span className="icon-bar"></span>
	          </button>
	          <Link to="/" className="navbar-brand">Project name</Link>
	        </div>
	        <div id="navbar" className="collapse navbar-collapse">
	          <ul className="nav navbar-nav navbar-right">
							{isAuthenticated ? (
								<React.Fragment>
								<li className="active"><Link to="/">Home</Link></li>
								<li><Link to="#!">{auth.email}</Link></li>
								<li><Link to="#!" onClick={this.onLogoutClick}>Logout</Link></li>
								</React.Fragment>
							) : <li><Link to="/login">Login</Link></li> }
	            <li><Link to="#about">About</Link></li>
	            <li><Link to="#contact">Contact</Link></li>
	          </ul>
	        </div>
	      </div>
	    </nav>
		);
	}
}


export default compose(
	firebaseConnect(),
	connect((state, props) =>({
		auth: state.firebase.auth
	}))
)(Navbar);