import React from "react";
import User from "./User";

const UsersList = ({ users }) => {
	return (
		<>
			<div className="text-center justify-content-sm-center">
				<div className="col-md-12">
					<div className="card mx-auto g-3">
						{users &&
							users.map((user) => <User key={user.login.uuid} {...user} />)}
					</div>
				</div>
			</div>
		</>
	);
};

export default UsersList;
