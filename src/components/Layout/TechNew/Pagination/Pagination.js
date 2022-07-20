import React from "react";
import { useGlobalContext } from "../../../../context/technews_context";

const Pagination = () => {
	const { page, nbPages, getPrevPage, getNextPage } = useGlobalContext();
	return (
		<>
			<nav>
				<ul class="pagination justify-content-center">
					<li class="page-item">
						<button onClick={() => getPrevPage()} className="page-link">
							Previous
						</button>
					</li>
					<li class="page-item">
						<a class="page-link" href="#">
							{page + 1}
						</a>
					</li>
					<li class="page-item	disabled">
						<a class="page-link" href="#">
							of
						</a>
					</li>
					<li class="page-item">
						<a class="page-link" href="#">
							{nbPages}
						</a>
					</li>
					<li class="page-item">
						<button onClick={() => getNextPage()} className="page-link">
							NEXT
						</button>
					</li>
				</ul>
			</nav>
		</>
	);
};

export default Pagination;
