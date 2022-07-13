
import React from "react";
import { useGlobalContext } from "../../../../context/technews_context";

const Search = () => {
	const { query, searchPost } = useGlobalContext();
	return (
		<>
			<h1></h1>
			<form onSubmit={(e) => e.preventDefault()}	className="shadow p-5 mb-5 bg-body rounded">
				<div>
					<input
						type="text"
						placeholder="search here"
						value={query}
						onChange={ (e) => searchPost(e.target.value) }
						className="form-control" id="input" aria-describedby="input"
					/>
				</div>
			</form>
		</>
	);
};

export default Search;


