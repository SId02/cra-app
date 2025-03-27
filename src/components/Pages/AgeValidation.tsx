
import React, { useState } from "react";
import { Link } from 'react-router-dom';
const AgeValidation: React.FC = () => {
	const [age, setAge] = useState<string>("");
	const [message, setMessage] = useState<string>("");

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const inputAge = parseInt(event.target.value, 10);
		setAge(event.target.value); 

		if (isNaN(inputAge)) {
			setMessage("");
			return;
		}

		if (inputAge < 18) {
			setMessage("You are not yet 18 years old.");
		} else if (inputAge >= 60 && inputAge < 75) {
			setMessage("You are a senior citizen aged between 60 and 75 years old.");
		} else if (inputAge >= 75) {
			setMessage("You are a senior citizen aged 75 or above.");
		} else {
			setMessage("");
		}
	};

	return (
		<>
			<section className="p-5">
				<div className="container p-5 text-center">
					<h1 className="text-3xl font-bold">Age Validation</h1>
				</div>

				<div className="container p-6 mx-auto">
					<div className="flex justify-center">
						<div className="w-full max-w-md box p-5">
							<form>
								<input
									type="text"
									value={age}
									maxLength={3}
									onChange={handleInputChange}
									className="input w-full p-2 border rounded"
									placeholder="20"
								/>
								{message && (
									<p
										className={`mt-3 p-3 rounded ${
											message.includes("not yet") ? "bg-red-200 text-red-800" : "bg-yellow-200 text-yellow-800"
										}`}
									>
										{message}
									</p>
								)}
							</form>
						</div>
					</div>
				</div>
				<footer className="flex justify-center mt-4">
                <Link to="/" className="text-blue-500 hover:underline">
                    Back to Home
                </Link>
            </footer>
			</section>
		</>
	);
};

export default AgeValidation;
