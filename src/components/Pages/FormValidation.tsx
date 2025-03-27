import React, { useState, FormEvent } from "react";
import { Link } from "react-router-dom";

const FormValidation: React.FC = () => {
	const [username, setUsername] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");

	const [errorUserName, setErrorUserName] = useState<string>("");
	const [errorEmail, setErrorEmail] = useState<string>("");
	const [errorPassword, setErrorPassword] = useState<string>("");
	const [errorConfirmPassword, setErrorConfirmPassword] = useState<string>("");

	const validate = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (username.length > 3) {
			setErrorUserName("");
		} else {
			setErrorUserName("Username must be at least 3 characters.");
		}

		if (email.includes("@")) {
			setErrorEmail("");
		} else {
			setErrorEmail("Email should contain '@'.");
		}

		if (password.length >= 8) {
			setErrorPassword("");
		} else {
			setErrorPassword("Password should be at least 8 characters.");
		}

		if (password && password === confirmPassword) {
			setErrorConfirmPassword("");
		} else {
			setErrorConfirmPassword("Passwords do not match.");
		}
	};

	return (
		<div className="container mx-auto p-4">
			<h3 className="text-center text-2xl font-bold my-5">Form Validation</h3>
			<div className="flex justify-center">
				<form className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={validate}>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							type="text"
							placeholder="Username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
						<p className="text-red-500 text-xs italic">{errorUserName}</p>
					</div>

					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							type="email"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<p className="text-red-500 text-xs italic">{errorEmail}</p>
					</div>

					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<p className="text-red-500 text-xs italic">{errorPassword}</p>
					</div>

					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							type="password"
							placeholder="Confirm Password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
						<p className="text-red-500 text-xs italic">{errorConfirmPassword}</p>
					</div>

					<div className="flex items-center justify-between">
						<button
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							type="submit"
						>
							Submit
						</button>
					</div>
				</form>
			</div>
			<footer className="flex justify-center mt-4">
                <Link to="/" className="text-blue-500 hover:underline">
                    Back to Home
                </Link>
            </footer>
     </div>
   );
};

export default FormValidation;
