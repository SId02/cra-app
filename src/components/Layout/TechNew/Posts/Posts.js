import React from "react";
import { useGlobalContext } from "../../../../context/technews_context";

const Posts = () => {
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
			<div className="row p-5">
				{hits.map((curPost) => { 
					const { title, author, objectID, url, num_comments } = curPost;
					return (
						<div className="card mb-3	shadow" key={ objectID }>
							<div className="card-body">
							<h2	className="card-title">{title}</h2>
							<p>
								By <span> {author}</span> | <span> {num_comments} </span>comments
							</p>
							<div className="card-button	d-grid gap-2 d-sm-flex justify-content-sm-center ">
								<a href={url} target="_blank" rel="noreferrer" className="btn btn-primary  ">
									Read More ...
								</a>
								<a href="#" onClick={() => removePost(objectID)} className="btn btn-secondary  text-center">
									<i className="bi bi-trash-fill"></i>
								</a>
							</div>
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default Posts;


