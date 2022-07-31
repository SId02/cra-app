import { Switch, Route, Redirect } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import "../node_modules/bootstrap-icons/icons/trash-fill.svg";
import Navbar from "./components/Layout/Navbar/Navbar";
import Home from "./components/Pages/Home";
import APICall from "./components/Pages/APICall";
import Form from "./components/Pages/Form";
import ReactQuery from "./components/Pages/ReactQuery";
import NotFound from "./components/Pages/NotFound";
import Footer from "./components/Layout/Footer/Footer";
import Pagination from "./components/Pages/Pagination";
import Counter from "./components/Layout/Counters/Counter";
import DynamicForm from "./components/Layout/DynamicForm/DynamicForm";
import Filter from "./components/Pages/Filter";
import RandomUser from "./components/Pages/RandomUser";
import TechNews from "./components/Pages/TechNews";
import CounterReducer from "./reducer/useReducer";

function App() {
	return (
		<>
			<Navbar /> 
			<Switch>
				<Route exact path="/" component={Home}/>
				<Route exact path="/APICall" component={APICall}/>
				<Route exact path="/Form" component={Form}/>
				<Route exact path="/ReactQuery" component={ReactQuery}/>
				<Route exact path="/Pagination" component={Pagination}/>
				<Route exact path="/Counters" component={ Counter }/>
				<Route exact path="/DynamicForm" component={ DynamicForm } />
				<Route exact path="/Filter" component={ Filter } />
				<Route exact path="/RandomUser" component={ RandomUser } />
				<Route exact path="/TechNews" component={ TechNews } />
				<Route exact path="/CounterReducer" component={ CounterReducer } />
			
				<Route component={NotFound}/>
				<Redirect to="/"/>
			</Switch>
			<Footer />
		</>
	);
}

export default App;
