import React, { Component } from 'react';
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect} from "react-redux-firebase";
import notifyUser from "../../actions/notifyAction";
import Alert from "../layouts/Alert";

class Login extends Component {
	state = {
		email: "",
		password: ""
	}
	
	onInputChange = e => this.setState({[e.target.name]: e.target.value});
	
	onFormSubmit = e => {
		e.preventDefault();
		const { firebase, notifyUser } = this.props;
		const { email, password } = this.state;

		firebase.login({email, password}).catch((err) => notifyUser("Invalid login credentials!", "error"))
	}

	render() {
		const  {message, messageType} = this.props.notify;

		return (
			<div className="row"><br/>
				<div className="col-md-5 col-md-offset-3">
					<div className="panel panel-default">
						<div className="panel-heading">
							<h2 className="text-center">
								<i className="fas fa-lock"></i> Login
							</h2>

							{
								message ? (
									<Alert messageType={messageType} message={message} />
								)
								: null
							}
						</div>

						<div className="panel-body">
							<form onSubmit={this.onFormSubmit}>
								<div className="form-group">
									<label htmlFor="email">Email</label>
									<input 
										type="text"
										className="form-control"
										name="email"
										value={this.state.email}
										onChange={this.onInputChange}
									/>
								</div>

								<div className="form-group">
									<label htmlFor="password">Password</label>
									<input 
										type="password"
										className="form-control"
										name="password"
										value={this.state.password}
										onChange={this.onInputChange}
									/>
								</div>

								<input type="submit" value="Login" className="btn btn-primary btn-block text-uppercase" />
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default compose(
	firebaseConnect(),
	connect((state, props) => ({
		notify: state.notify
	}),

	{notifyUser})
)(Login);