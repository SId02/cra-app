import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Layout/Navbar/Navbar.tsx";
import Footer from "./components/Layout/Footer/Footer.tsx";
import Home from "./components/Pages/Home.tsx";
import About from "./components/Pages/About.tsx";
import AgeValidation from "./components/Pages/AgeValidation.tsx";
import BmiCalculator from "./components/Pages/BmiCalculator.tsx";
import CountryDetails from "./components/Layout/CountryDetails/CountryDetails.tsx";
import Counter from "./components/Pages/Counter.tsx";
import DigitalClock from "./components/Pages/DigitalClock.tsx";
import DarkLightModeToggle from "./components/Pages/DarkLightModeToggle.tsx";
import DataFetchUsingUseReducer from "./components/Pages/DataFetchUsingUseReducer.tsx";
import DatePicker from "./components/Pages/DatePicker.tsx";
import DataInTable from "./components/Layout/DataInTable/DataInTable.tsx";
import FormValidation from "./components/Pages/FormValidation.tsx";
import GithubUserProfileFinder from "./components/Pages/GithubUserProfileFinder.tsx";
import LeapYearChecker from "./components/Pages/LeapYearChecker.tsx";
import LoginPageWithDefaultValue from "./components/Pages/LoginPageWithDefaultValue.tsx";
import LoginPageWithAPI from "./components/Pages/LoginPageWithAPI.tsx";
import NotFound from "./components/Pages/NotFound.tsx";
import PasswordGenerator from "./components/Pages/PasswordGenerator.tsx";
import PasswordStrengthChecker from "./components/Pages/PasswordStrengthChecker.tsx";
import ProductListPaginations from "./components/Pages/ProductListPaginations.tsx";
import ProductListSearchSortFilter from "./components/Pages/ProductListSearchSortFilter.tsx";
import RandomColorGenerator from "./components/Pages/RandomColorGenerator.tsx";
import RandomJokes from "./components/Pages/RandomJokes.tsx"
import StopWatch from "./components/Pages/StopWatch.tsx";
import TestimonialSlider from "./components/Layout/TestimonialSlider/TestimonialSlider.tsx";
import TogglePasswordVisibility from "./components/Pages/TogglePasswordVisibility";
import Typeahead from "./components/Pages/Typeahead.tsx";
import TrafficSignal from "./components/Layout/TrafficSignal/TrafficSignal.tsx";
import TipCalculator from "./components/Layout/TipCalculator/TipCalculator.tsx";
import WordCounter from "./components/Pages/WordCounter.tsx";
import YearCalculator from "./components/Layout/YearCalculator/YearCalculator.tsx";

function App() {

  return (
    <>
      <Navbar />
		  <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/TrafficSignal" element={<TrafficSignal />} />
        <Route path="/TipCalculator" element={<TipCalculator />} />
        <Route path="/WordCounter" element={<WordCounter />} />
        <Route path="/TogglePasswordVisibility" element={<TogglePasswordVisibility />} />
        <Route path="/Typeahead" element={<Typeahead />} />
        <Route path="/LoginPageWithDefaultValue" element={<LoginPageWithDefaultValue />} />
        <Route path="/LoginPageWithAPI" element={<LoginPageWithAPI />} />
        <Route path="/YearCalculator" element={<YearCalculator />} />
        <Route path="/AgeValidation" element={<AgeValidation />} />
        <Route path="/BmiCalculator" element={ <BmiCalculator /> } />
        <Route path="/DarkLightModeToggle" element={<DarkLightModeToggle />} />
        <Route path="/DataFetchUsingUseReducer" element={<DataFetchUsingUseReducer />} />
        <Route path="/DatePicker" element={<DatePicker />} />
        <Route path="/FormValidation" element={<FormValidation />} />
        <Route path="/LeapYearChecker" element={<LeapYearChecker />} />
				<Route path="/Counter" element={ <Counter /> } />
			  <Route path="/GithubUserProfileFinder" element={ <GithubUserProfileFinder /> } />
			  <Route path="/PasswordGenerator" element={ <PasswordGenerator /> } />
			  <Route path="/DigitalClock" element={ <DigitalClock /> } />
			  <Route path="/ProductListPaginations" element={ <ProductListPaginations /> } />
        <Route path="/CountryDetails" element={<CountryDetails />} />
        <Route path="/PasswordStrengthChecker" element={<PasswordStrengthChecker />} />
        <Route path="/StopWatch" element={<StopWatch />} />
        <Route path="/TestimonialSlider" element={<TestimonialSlider />} />
        <Route path="/DataInTable" element={<DataInTable />} />
        <Route path="/RandomColorGenerator" element={<RandomColorGenerator />} />
        <Route path="/ProductListSearchSortFilter" element={<ProductListSearchSortFilter />} />
        <Route path="/RandomJokes" element={<RandomJokes />} />
        <Route path="*" element={<NotFound />}/>{/*<Route path="*" element={<NotFound />}/>*/}
        </Routes>
			<Footer />
    </>
  )
}

export default App;
