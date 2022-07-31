import React, { useReducer } from "react";

const initialState = 0;

const reducer = (state, action) => {
	console.log(state, action);
	if (action.type === "INCREMENT") {
		return state + 1;
	}
	if (action.type === "DECREMENT") {
		return state - 1;
	}
	return state;
};

const UseReducer = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<>
			<div className="container pt-5 pb-5">
				<div className="pt-5 row justify-content-sm-center">
					<div className="pb-3 shadow col-sm-6 round">
						<h3 className="counter text-center m-3">Count : {state} </h3>
						<div className="button-group text-center g-3">
							<button className="subtract btn btn-secondary"onClick={() => dispatch({ type: "DECREMENT" })}>
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
						
							<button className="add btn btn-secondary" onClick={() => dispatch({ type: "INCREMENT" })}>
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
};
export default UseReducer;
