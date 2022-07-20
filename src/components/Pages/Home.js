import React from "react";
//import { NavLink } from "react-router-dom";



import "./Home.css";
const Home = () => {

	return (
		<>
			<section className="container py-5 text-center">
				<div className="row py-lg-5">
					<div className="mx-auto col-lg-6 col-md-8">
						<h1 className="fw-light">React App</h1>
						<p className="lead text-muted">
							React App in created using npx create-app cra-app
						
						</p>
						<div className="container text-center">
							<div className="row">
								<div class="row row-cols-1 row-cols-md-3 g-4">
									<div className="col">
										<div className="card h-100">
											<div className="card-body">
												<h5 className="card-title">Routing</h5>
											</div>
										</div>
									</div>
									<div className="col">
										<div className="card h-100">
											<div className="card-body">
												<h5 className="card-title">Api call using fetch api</h5>
											</div>
										</div>
									</div>
									<div className="col">
										<div className="card h-100">
											<div className="card-body">
												<h5 className="card-title">Form Validation</h5>
											</div>
										</div>
									</div>
									<div className="col">
										<div className="card h-100">
											<div className="card-body">
												<h5 className="card-title">React Query</h5>
											</div>
										</div>
									</div>
									<div className="col">
										<div className="card h-100">
											<div className="card-body">
												<h5 className="card-title">Pagination</h5>
											</div>
										</div>
									</div>
									<div className="col">
										<div className="card h-100">
											<div className="card-body">
												<h5 className="card-title">Counter</h5>
											</div>
										</div>
									</div>
									
									<div className="col">
										<div className="card h-100">
											<div className="card-body">
												<h5 className="card-title">DynamicForm</h5>
											</div>
										</div>
									</div>
									<div className="col">
										<div className="card h-100">
											<div className="card-body">
												<h5 className="card-title">Filter</h5>
											</div>
										</div>
									</div>
									<div className="col">
										<div className="card h-100">
											<div className="card-body">
												<h5 className="card-title">ReadMore</h5>
											</div>
										</div>
									</div>
									<div className="col">
										<div className="card h-100">
											<div className="card-body">
												<h5 className="card-title"></h5>
											</div>
										</div>
									</div>
									<div className="col">
										<div className="card h-100">
											<div className="card-body">
												<h5 className="card-title"></h5>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Home;
