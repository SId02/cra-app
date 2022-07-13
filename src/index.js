import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppProvider } from './context/technews_context';
const queryClient = new QueryClient();
ReactDOM.render(
	<>
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<AppProvider>
					<App />
				</AppProvider>
			</QueryClientProvider>
		</BrowserRouter>
	</>,
	document.getElementById("root")
);


