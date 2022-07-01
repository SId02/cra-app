import React from "react";
// import { NavLink } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
const ReactQuery = () => {
	const mystyle = {
		width: "600px",
		height: "500px",
	};

	const { isLoading, isError, data } = useQuery("fetchingData", () =>
		axios("https://random.dog/woof.json")
	);

	if (isError)
		return (
			<h1 className="text-center text-uppercase text-danger">
				Error,try again!
			</h1>
		);
	if (isLoading)
		return <h1 className="text-center text-uppercase">Loading ...</h1>;
	return (
		<>
			<div>
				<div className="text-center">
					<div className="container">
						<div className="row mx-auto p-5">
							<img
								src={data.data.url}
								class="img-thumbnail rounded mx-auto d-block"
								alt="dogimg"
								style={mystyle}
							></img>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ReactQuery;
