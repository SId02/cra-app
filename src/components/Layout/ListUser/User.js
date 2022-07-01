import React from "react";

const User = ({ name, location, email, picture }) => {
	return (
		<div className="random-user	row g-0 justify-content-center">
			<div className="col-md-4 user-image">
				<img
					className="img-fluid rounded-start"
					src={picture.medium}
					alt={name.first}
				/>
			</div>
			<div class="col-md-8">
				<div class="card-body">
					<div className="user-details">
						<div>
							<strong>Name:</strong> {name.first} {name.last}
						</div>
						<div>
							<strong>Country:</strong> {location.country}
						</div>
						<div>
							<strong>Email:</strong> {email}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default User;
