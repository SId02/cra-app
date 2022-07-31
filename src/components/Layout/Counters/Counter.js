import React, { useState } from "react";

function Counter() {
	const initialCount = 0;
	const [count, setCount] = useState(initialCount);
	return (
		<>
			<div className="container pt-5 pb-5">
				<div className="pt-5 row justify-content-sm-center">
					<div className="pb-3 shadow col-sm-6 round">
						<h3 className="counter text-center m-3"> Count: {count} </h3>
						<div className="button-group text-center g-3">
							<button
								className="subtract btn btn-secondary"
								onClick={() => setCount((prevCount) => prevCount - 1)}
							>
								{" "}
								Decrement &nbsp;&nbsp;
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<line x1="5" y1="12" x2="19" y2="12" />
								</svg>
							</button>
							&nbsp;&nbsp;
							<button
								className="reset btn btn-info"
								onClick={() => setCount(initialCount)}
							>
								Reset &nbsp;&nbsp;
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<polyline points="1 4 1 10 7 10" />
									<polyline points="23 20 23 14 17 14" />
									<path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
								</svg>
							</button>
							&nbsp;&nbsp;
							<button
								className="add btn btn-secondary  "
								onClick={() => setCount((prevCount) => prevCount + 1)}
							>
								Increment &nbsp;&nbsp;
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<line x1="12" y1="5" x2="12" y2="19" />
									<line x1="5" y1="12" x2="19" y2="12" />
								</svg>
							</button>
							&nbsp;&nbsp;
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Counter;
