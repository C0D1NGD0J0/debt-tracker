import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../layouts/Spinner";
import classnames from "classnames";

class ClientDetails extends Component{
	state = {
		showBalanceUpdate: false,
		balanceUpdateAmount: ""
	}
	
	onInputChange = (e) => this.setState({[e.target.name]: e.target.value });
	
	// update balance in firestore
	balanceSubmit = (e) =>{
		e.preventDefault();
		const { client, firestore } = this.props;
		const { balanceUpdateAmount } = this.state;
		const clientUpdate = {
			balance: parseFloat(balanceUpdateAmount)
		}

		firestore.update({collection: 'clients', doc: client.id}, clientUpdate)
		this.setState({balanceUpdateAmount: "", showBalanceUpdate: false});
	}
	
	// delete client
	onDeleteClient = () =>{
		const { client, firestore, history } = this.props;
		firestore.delete({collection: "clients", doc: client.id}).then(this.props.history.push("/"));
	}

	render(){
		const { client } = this.props;
		const { showBalanceUpdate, balanceUpdateAmount } = this.state;
		let balanceForm = "";
		
		if(showBalanceUpdate){
			balanceForm = (
				<form onSubmit={this.balanceSubmit} className="pull-right">
					<div className="input-group">
						<input type="text" className="pull-right form-control" name="balanceUpdateAmount" placeholder="Add new balance" value={balanceUpdateAmount} onChange={this.onInputChange} style={{width: "50%"}}/>
						<span className="input-group-btn">
							<input type="submit" value="Update" className="btn btn-primary" />
						</span>
					</div>
				</form>
			)
		} else{
			balanceForm = null; 
		}

		return(
			<React.Fragment>
			{
				client ?	
					(<div><br/>
						<div className="row">
							<div className="col-md-4">
								<Link to="/" className="btn btn-default btn-block">
									<i className="fas fa-arrow-circle-left"></i> Back to Dashboard
								</Link>
							</div>

							<div className="col-md-4">
								<Link to={`/client/edit/${client.id}`} className="btn btn-info btn-block text-uppercase">
									<i className="fas fa-edit"></i> Edit
								</Link>
							</div>

							<div className="col-md-4">
								<button to="/" onClick={this.onDeleteClient} className="btn btn-danger btn-block text-uppercase">
									<i className="fas fa-trash"></i> Delete
								</button>
							</div>
						</div><hr/>

						<div className="row">
							<div className="col-md-8 col-offset-md-1">
								<div className={classnames({'panel panel-danger': client.balance > 0, 'panel panel-primary': client.balance === 0})}>

									<div className="panel-heading">
										<h2 className="text-uppercase">
											{client.firstName} {client.lastName}
											<span className="pull-right">${parseFloat(client.balance).toFixed(2)}</span>
										</h2>
									</div>

									<ul className="list-group">
									  <li className="list-group-item">
									  	<span className="h4">Client ID:</span>
									  	<span className="pull-right text-uppercase">{client.id}</span>
									  </li>
									  <li className="list-group-item clearfix">
									  	<span className="h4">Balance: </span>
									  	<span className="pull-right h4">
									  		<span 
									  			className={classnames({
									  				'text-danger': client.balance > 0, 
									  				'text-success': client.balance === 0
									  			})}
									  		> 
									  			${parseFloat(client.balance).toFixed(2)}{' '}
									  			<small><a href="#!" onClick={() => this.setState({showBalanceUpdate: !this.state.showBalanceUpdate})}>
														<i className="fas fa-pencil-alt"></i>
									  			</a></small>
									  		</span>
									  	</span>
									  	{balanceForm}
									  </li>
									</ul>

									<div className="panel-body">
										<h5 className="h3 text-uppercase">Note:</h5>
										<p>{client.note}</p>
									</div>
								</div>
							</div>

							<div className="col-md-3">
								<div className="well">

									<ul className="list-group">
									  <li className="list-group-item active disabled text-uppercase">Contact Details</li>
									  <li className="list-group-item">Email: {client.email}</li>
									  <li className="list-group-item">Phone: {client.phone}</li>
									</ul>
								</div>
							</div>
						</div>
					</div>)
				: <Spinner />
			}
			</React.Fragment>
		);
	}
}

export default compose(
	firestoreConnect(props => [
		{ collection: "clients", storeAs: 'client', doc: props.match.params.id }
	]), 
	connect(({ firestore: {ordered} }, props) => ({ 
		client: ordered.client && ordered.client[0]
	}))
)(ClientDetails);