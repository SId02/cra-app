import React, { useState } from "react";
import { Link } from "react-router-dom";
const DatePicker: React.FC = () => {
  const [disable, setDisable] = useState(true);
  const [todate, setTodate] = useState<string>("");
  const [fromdate, setFromdate] = useState<string>("");

  const [todateformat, setTodateformat] = useState<string>("");
  const [fromdateformat, setFromdateformat] = useState<string>("");

  const handletodate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const gettodatevalue = e.target.value;
    const setdateformat = gettodatevalue.split("-");
    const settodateformat = `${setdateformat[0]}${setdateformat[1]}${setdateformat[2]}`;
    setTodate(gettodatevalue);
    setTodateformat(settodateformat);
    setDisable(false);
  };

  const handlefromdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const getfromdatevalue = e.target.value;
    const setfromformat = getfromdatevalue.split("-");
    const setfromformatdate = `${setfromformat[0]}${setfromformat[1]}${setfromformat[2]}`;
    setFromdate(getfromdatevalue);
    setFromdateformat(setfromformatdate);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (todateformat < fromdateformat) {
      alert("Please select valid dates");
    } else {
      alert("Successful...!");
    }
  };

  return (
    <>
      <section className="py-6">
        <div className="container pb-5 text-center">
          <h1 className="text-3xl font-bold">Date Picker</h1>
        </div>
        <div className="container pt-5 flex justify-center">
          <div className="w-full max-w-md">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
              <div className="flex flex-col space-y-4">
                <div>
                  <label htmlFor="fromdate" className="block text-gray-700 text-sm font-bold mb-2">
                    From Date
                  </label>
                  <input
                    type="date"
                    placeholder="********"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="fromdate"
                    onChange={handlefromdate}
                  />
                </div>
                <div>
                  <label htmlFor="todate" className="block text-gray-700 text-sm font-bold mb-2">
                    To Date
                  </label>
                  <input
                    type="date"
                    placeholder="********"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="todate"
                    disabled={disable}
                    onChange={handletodate}
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Calculate
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      <footer className="flex justify-center mt-4">
                <Link to="/" className="text-blue-500 hover:underline">
                    Back to Home
                </Link>
            </footer>
     
    </>
  );
};

export default DatePicker;
