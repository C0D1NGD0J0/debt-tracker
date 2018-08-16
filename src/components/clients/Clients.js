import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Clients extends Component {
	render() {
		const clients = [
			{
				id: 1,
				firstName: "Kevin",
				lastName: "Hart",
				email: "kevin@example.com",
				phone: "123-456-7890",
				note: "Loaned for school tuition",
				balance: "250",
				paymentDate: "30/08/2018"
			}
		];

		if(clients){
			return(
				<div>
					<div className="row">
						<div className="col-md-6">
							<h2><i className="fas fa-users"></i> Clients{' '}</h2>	
						</div>

						<div className="col-md-6">

						</div>
					</div>

					<table className="table table-striped">
						<thead className="thead-inverse">
							<tr>
								<th>Name</th>
								<th>Email</th>
								<th>Balance</th>
								<th>Payment Date</th>
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
										<td>{client.paymentDate}</td>
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
			);
		} else {
			return <h1>Loading data...</h1>
		};
	}
}

export default Clients;