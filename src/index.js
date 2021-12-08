import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import { QueryClient,  QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();
ReactDOM.render(
  <>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
</>,
  document.getElementById('root')
);

reportWebVitals();
