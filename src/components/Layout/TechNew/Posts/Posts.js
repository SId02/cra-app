import React from "react";
import { useGlobalContext } from "../../../../context/technews_context";

const Stories = () => {
	const { hits, isLoading, removePost } = useGlobalContext();
	if (isLoading) {
		return (
			<>
				<h1>Loading.....</h1>
			</>
		);
	}
	return (
		<>
			<div className="row justify-content-center	shadow p-5 mb-5 rounded">
				{hits.map((curPost) => { 
					const { title, author, objectID, url, num_comments } = curPost;
					return (
						<div className="card" key={ objectID }>
							<div className="card-body">
							<h2	className="card-title">{title}</h2>
							<p>
								By <span> {author}</span> | <span> {num_comments} </span>
								comments
							</p>
							<div className="card-button">
								<a href={url} target="_blank" rel="noreferrer"	className="btn btn-primary  ">
									Read More
								</a>
								<a href="#" onClick={() => removePost(objectID)}	className="btn btn-primary  text-center">
									<i className="bi bi-trash-fill"></i>
								</a>
							</div>v
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default Stories;




