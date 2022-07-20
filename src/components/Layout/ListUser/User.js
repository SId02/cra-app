import React from "react";

const User = ({ name, location, email, picture }) => {
	return (
		<div className="row m-3 justify-content-sm-center shadow">
			<div className=" col-sm-6 round">
			<div className="col-md-4">
				<img
					className="rounded float-start"
					src={picture.large}
					alt={name.first}
				/>
			</div>
			<div className="col-md-8">
				<div className="card-body">
						<div>
						<h5 className="card-title"><strong>Name:</strong> { name.first } { name.last }</h5>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><strong>Country:</strong> {location.country}</li>
                            <li className="list-group-item"><strong>Email:</strong> {email}</li>
                        </ul>
					</div>
				</div>
			</div>
			</div>
		</div>
	);
};

export default User;
