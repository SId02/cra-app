import  { useState } from "react";
import { Link } from 'react-router-dom';
const TogglePasswordVisibility = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
 const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };
  return (
    <>
    <section className="py-6">
      <div className="container mx-auto text-center p-5">
        <h1 className="text-3xl font-bold">Toggle Password Visibility</h1>
      </div>
      <div className="container mx-auto p-6">
        <div className="flex justify-center">
          <div className="w-full max-w-md box p-5">
            <div className="mb-4">
              <input
                type={passwordVisible ? "text" : "password"}
                value="P@ssword@123"
                placeholder="P@ssword@123"
                readOnly
                className="input w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
              />
            </div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={passwordVisible}
                onChange={togglePasswordVisibility}
                className="mr-2"
              />
              Show Password
            </label>
          </div>
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

export default TogglePasswordVisibility;
