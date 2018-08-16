import React from "react";
import { Link } from "react-router-dom";

const Sidebar = (props) =>{
	const style = {
		marginTop: "5vh", 
		borderRadius: "0"
	}

	return(
		<Link to="/client/add" className="btn btn-warning btn-block" style={style}>
			<i className="fas fa-plus"></i> New Client
		</Link>
	)
};

export default Sidebar;