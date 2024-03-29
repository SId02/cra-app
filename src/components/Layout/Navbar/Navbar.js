import React from "react";
import { NavLink } from "react-router-dom";

import "./Navbar.css";
const Navbar = () => {
	
	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<div className="container">
					<NavLink className="navbar-brand" to="/">
						CRA-App
					</NavLink>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarsExample07"
						aria-controls="navbarsExample07"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarsExample07">
						<ul className="mb-2 navbar-nav ms-auto mb-lg-0">
							<li className="nav-item">
								<NavLink
									activeClassName="menu_active"
									exact
									className="nav-link active"
									aria-current="page"
									to="/"
								>
								
									Home
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to="/APICall">
									Api
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to="/Form">
								
									From
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to="/ReactQuery">
							
									ReactQuery
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to="/Pagination">
									
									Pagination
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to="/Counters">
									
									Counter
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to="/DynamicForm">
								DynamicForm
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to="/Filter">
								Filter
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to="/RandomUser">
								RandomUser
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to="/TechNews">
								TechNews
								</NavLink>
							</li>

							<li className="nav-item">
								<NavLink className="nav-link" to="/CounterReducer">
								Counter
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to="/RandomQuotes">
								RandomQuotes
								</NavLink>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
};

export default Navbar;
