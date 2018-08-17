import React, { Component } from 'react';
import { Link } from "react-router-dom";

class AddClient extends Component {
	state = {
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		amount: ""
	}

	onInputChange = (e) => this.setState({ [e.target.name]: e.target.value })

	render() {
		return (
			<div>
				<div className="row">
					<div className="col-md-12"><br/>
						<Link to="/" className="btn btn-muted">
							<i className="fas fa-arrow-circle-left"></i>Back To Dashboard
						</Link>
					</div>
				</div>
				<br/>
				<div className="row">
					<div className="col-md-8 col-offset-md-2">
						<div className="panel panel-default">
							<div className="panel-heading">
								<h3 className="text-center text-uppercase">Add Client</h3>
							</div>

							<div className="panel-body">
								<form>
									<div className="form-group">
										<label htmlFor="firstName">First Name</label>
										<input 
											required 
											type="text"
											onChange={this.onInputChange}
											value={this.state.firstName}
											className="form-control" 
											name="firstName" minLength="2" 
										/>
									</div>

									<div className="form-group">
										<label htmlFor="lastName">Last Name</label>
										<input 
											required 
											type="text"
											onChange={this.onInputChange}
											value={this.state.lastName}
											className="form-control" 
											name="lastName" minLength="2" 
										/>
									</div>

									<div className="form-group">
										<label htmlFor="email">Email</label>
										<input 
											type="email"
											onChange={this.onInputChange}
											value={this.state.email}
											className="form-control" 
											name="email"
										/>
									</div>

									<div className="form-group">
										<label htmlFor="phone">Phone</label>
										<input 
											required 
											type="text"
											onChange={this.onInputChange}
											value={this.state.phone}
											className="form-control" 
											name="phone" minLength="10" 
										/>
									</div>

									<div className="form-group">
										<label htmlFor="balance">Balance</label>
										<input 
											type="text"
											onChange={this.onInputChange}
											value={this.state.balance}
											className="form-control" 
											name="balance" 
										/>
									</div>

									<input type="submit" value="Submit" className="btn btn-primary btn-block" />
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}


export default AddClient;