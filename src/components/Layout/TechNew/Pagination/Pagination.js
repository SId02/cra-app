import React from "react";
import { useGlobalContext } from "../../../../context/technews_context";

const Pagination = () => {
	const { page, nbPages, getPrevPage, getNextPage } = useGlobalContext();
	return (
		<>
			<nav>
			<div className="pagination justify-content-center">
				<button onClick={() => getPrevPage()}	className="page-link">Previous</button>
				<p>
					{page + 1} of {nbPages}
				</p>
				<button onClick={() => getNextPage()}	className="page-link">NEXT</button>
			</div>
			</nav>
			
		
		</>
	);
};

export default Pagination;



<nav aria-label="Page navigation example">
				<ul className="pagination justify-content-center">
					<li className="page-item ">
						<a className="page-link">Previous</a>
					</li>
					<li className="page-item">
						<a className="page-link" href="#">
							1
						</a>
					</li>

					<li className="page-item">
						<a className="page-link" href="#">
							3
						</a>
					</li>
					<li className="page-item">
						<a className="page-link" href="#">
							Next
						</a>
					</li>
				</ul>
			</nav>