import React, { useState, useEffect } from "react";
import axios from "axios";
import UsersList from "../Layout/ListUser/UsersList";

const RandomUser = () => {
	const [users, setUsers] = useState([]);
	const [page, setPage] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");

	useEffect(() => {
		const loadUsers = async () => {
			try {
				setIsLoading(true);
				const response = await axios.get(
					`https://randomuser.me/api/?page=${page}&results=10`
				);

				setUsers((users) => [...users, ...response.data.results]);
				setErrorMsg("");
			} catch (error) {
				setErrorMsg("Error while loading data. Try again later.");
			} finally {
				setIsLoading(false);
			}
		};

		loadUsers();
	}, [page]);

	const loadMore = () => {
		setPage((page) => page + 1);
	};

	return (
		<div className="container text-center justify-content-sm-center main-section">
			<UsersList users={users} />
			{errorMsg && <p className="errorMsg	text-danger">{errorMsg}</p>}
			<div className="load-more">
				<button onClick={loadMore} className="btn-grad btn btn-primary">
					{isLoading ? "Loading..." : "Load More"}
				</button>
			</div>
		</div>
	);
};

export default RandomUser;
