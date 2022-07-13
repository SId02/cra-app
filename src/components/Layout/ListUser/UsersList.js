import React from "react";
import User from "./User";

const UsersList = ({ users }) => {
	return (
		<div className="card mx-auto mt-3 mb-3 user-list">
			{users && users.map((user) => <User key={user.login.uuid} {...user} />)}
		</div>
	);
};

export default UsersList;
