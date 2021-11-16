import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import Navbar from "./components/Layout/Navbar/Navbar";
import Home from "./components/Pages/Home";
import APICall from "./components/Pages/APICall";
import Form from "./components/Pages/Form";
import ReactQuery from "./components/Pages/ReactQuery";
import NotFound from "./components/Pages/NotFound"
import Footer from "./components/Layout/Footer/Footer";
import { Switch, Route, Redirect } from "react-router-dom";
import Pagination from "./components/Pages/Pagination";

function App() {
  return (
    <>
     <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
       <Route exact path="/APICall" component={APICall} />
        <Route exact path="/Form" component={Form} />
        <Route exact path="/ReactQuery" component={ ReactQuery } />
        <Route exact path="/Pagination" component={Pagination} /> 
        <Route component={NotFound} />
        <Redirect to="/" />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
