import Pagination from "../Layout/TechNew/Pagination/Pagination";
import Search from "../Layout/TechNew/Search/Search";
import Posts from "../Layout/TechNew/Posts/Posts";
//import "./App.css";

function TechNews() {
	return (
		<>
			<section class="py-5 text-center container">
				<div class="row py-lg-5">
					<div class="col-lg-6 col-md-8 mx-auto">
						<Search />
					</div>
					<div>
						<Pagination />
						<Posts />
					</div>
				</div>
			</section>
			{/* <div className="container">
				<Search />
				<Pagination />
				<Posts />
			</div> */}
		</>
	);
}

export default TechNews;
