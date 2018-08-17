import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../layouts/Spinner";

class EditClientDetails extends Component {
	constructor(props){
		super(props);

		this.firstNameInput = React.createRef();
		this.lastNameInput = React.createRef();
		this.emailInput = React.createRef();
		this.phoneInput = React.createRef();
		this.balanceInput = React.createRef();
		this.noteInput = React.createRef();
	}
	
	onFormSubmit = (e) =>{
		e.preventDefault();

		const { client, firestore, history } = this.props;
		const updClient = {
			firstName: this.firstNameInput.current.value,
			lastName: this.lastNameInput.current.value,
			email: this.emailInput.current.value,
			phone: this.phoneInput.current.value,
			balance: this.balanceInput.current.value === "" ? 0 : this.balanceInput.current.value,
			note: this.noteInput.current.value
		}

		firestore.update({collection: "clients", doc: client.id}, updClient).then(history.push("/"));
	}

	render() {
		const { client } = this.props;

		if(client){
			return(
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
									<h3 className="text-center text-uppercase">Update Client</h3>
								</div>

								<div className="panel-body">
									<form onSubmit={this.onFormSubmit}>
										<div className="form-group">
											<label htmlFor="firstName">First Name</label>
											<input
												ref={this.firstNameInput}
												required 
												type="text"
												defaultValue={client.firstName}
												className="form-control" 
												name="firstName" minLength="2" 
											/>
										</div>

										<div className="form-group">
											<label htmlFor="lastName">Last Name</label>
											<input
												ref={this.lastNameInput} 
												required 
												type="text"
												defaultValue={client.lastName}
												className="form-control" 
												name="lastName" minLength="2" 
											/>
										</div>

										<div className="form-group">
											<label htmlFor="email">Email</label>
											<input 
												type="email"
												ref={this.emailInput}
												defaultValue={client.email}
												className="form-control" 
												name="email"
											/>
										</div>

										<div className="form-group">
											<label htmlFor="phone">Phone</label>
											<input 
												required
												ref={this.phoneInput}
												type="text"
												defaultValue={client.phone}
												className="form-control" 
												name="phone" minLength="10" 
											/>
										</div>

										<div className="form-group">
											<label htmlFor="balance">Balance</label>
											<input 
												type="text"
												ref={this.balanceInput}
												defaultValue={client.balance}
												className="form-control" 
												name="balance" 
											/>
										</div>

										<div className="form-group">
											<label htmlFor="note">Note</label>
											<textarea
												ref={this.noteInput}
												defaultValue={client.note}
												className="form-control" 
												name="note" 
											/>
										</div>

										<input type="submit" value="Submit" className="btn btn-primary btn-block" />
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			)
		} else {
			return <Spinner />
		}
	}
}

export default compose(
	firestoreConnect(props => [
		{ collection: "clients", storeAs: 'client', doc: props.match.params.id }
	]), 
	connect(({ firestore: {ordered} }, props) => ({ 
		client: ordered.client && ordered.client[0]
	}))
)(EditClientDetails);