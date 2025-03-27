import React, { useReducer, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface State {
    loading: boolean;
    error: string;
    post: {
        title?: string;
    };
}

type Action =
    | { type: "FETCH_SUCCESS"; payload: { title: string } }
    | { type: "FETCH_ERROR" };

const initialState: State = {
    loading: true,
    error: "",
    post: {},
};

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "FETCH_SUCCESS":
            return {
                loading: false,
                post: action.payload,
                error: "",
            };
        case "FETCH_ERROR":
            return {
                loading: false,
                post: {},
                error: "Something went wrong!",
            };
        default:
            return state;
    }
};
const DataFetchUsingUseReducer: React.FC = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
        axios
            .get(`https://jsonplaceholder.typicode.com/posts/1`)
            .then((response) => {
                dispatch({ type: "FETCH_SUCCESS", payload: response.data });
            })
            .catch((error) => {
                dispatch({ type: "FETCH_ERROR" });
            });
    }, []);

    return (
        <>
        <div className="container mx-auto mt-5">
            <div className="flex justify-center">
                <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                    <div className="text-center">
                        <h2 className="text-xl font-bold mb-4">
                            {state.loading ? "Loading..." : state.post.title}
                        </h2>
                        {state.error && (
                            <p className="text-red-500">{state.error}</p>
                        )}
                    </div>
                </div>
            </div>
            <footer className="flex justify-center mt-4">
                <Link to="/" className="text-blue-500 hover:underline">
                    Back to Home
                </Link>
            </footer>
            </div>
            </>
    );
};

export default DataFetchUsingUseReducer;
