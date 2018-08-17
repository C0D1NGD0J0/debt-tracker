import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../layouts/Spinner";
import classnames from "classnames";

class ClientDetails extends Component{
	render(){
		const { client } = this.props;
		console.log(client)
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
								<button to="/" className="btn btn-danger btn-block text-uppercase">
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

									<ul class="list-group">
									  <li class="list-group-item">
									  	<span className="h4">Client ID:</span>
									  	<span className="pull-right text-uppercase">{client.id}</span>
									  </li>
									  <li class="list-group-item">
									  	<span className="h4">Balance: </span>
									  	<span className="pull-right h4">
									  		<span 
									  			className={classnames({
									  				'text-danger': client.balance > 0, 
									  				'text-success': client.balance === 0
									  			})}
									  		> 
									  			${parseFloat(client.balance).toFixed(2)}
									  		</span>
									  	</span>
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

									<ul class="list-group">
									  <li class="list-group-item active disabled text-uppercase">Contact Details</li>
									  <li class="list-group-item">Email: {client.email}</li>
									  <li class="list-group-item">Phone: {client.phone}</li>
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