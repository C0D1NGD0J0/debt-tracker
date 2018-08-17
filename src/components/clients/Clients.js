import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { firestoreConnect } from "react-redux-firebase";
import Spinner from "../layouts/Spinner";

class Clients extends Component {
	state = {
		totalOwed: null
	}
	
	static getDerivedStateFromProps(props, state){
		const {clients} = props;

		if(clients){
			const total = clients.reduce((sum, client) => {
				return sum + parseFloat(client.balance.toString());
			}, 0);

			return {totalOwed: total}
		}

		return null;
	}

	render() {
		const { clients } = this.props;
		const { totalOwed } = this.state;

		return(
			<React.Fragment>
			{ clients ?
				(
					<div>
						<div className="row">
							<div className="col-md-6">
								<h2><i className="fas fa-users"></i> Clients{' '}</h2>	
							</div>

							<div className="col-md-6">
								<h2 className="text-right text-danger text-uppercase">Total Owed: <span className="text-primary">${parseFloat(totalOwed).toFixed(2)}</span></h2>
							</div>
						</div>

						<table className="table table-striped">
							<thead className="thead-inverse">
								<tr>
									<th>Name</th>
									<th>Email</th>
									<th>Balance</th>
									<th />
								</tr>
							</thead>
							<tbody className="table-hover">
								{
									clients && clients.map(client =>(
										<tr key={client.id}>
											<td>{client.firstName} {client.lastName}</td>
											<td>{client.email}</td>
											<td>${parseFloat(client.balance).toFixed(2)}</td>
											<td>
												<Link to={`/client/${client.id}`} className="btn btn-default btn-sm">
													<i className="fas fa-eye"></i> Details
												</Link>
											</td>
										</tr>
									))
								}
							</tbody>
						</table>
					</div>
				) : <Spinner />
			}
			</React.Fragment>
		)
	}
}

Clients.propTypes = {
	firestore: PropTypes.object.isRequired,
	clients: PropTypes.array
}

export default compose(
	firestoreConnect([{collection: "clients"}]),
	connect((state, props) => ({
		clients: state.firestore.ordered.clients
	}))
)(Clients);