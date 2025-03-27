import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const BmiCalculator: React.FC = () => {
    const [weight, setWeight] = useState<string>('');
    const [height, setHeight] = useState<string>('');
    const [bmi, setBmi] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWeight(event.target.value);
    };
    const handleHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHeight(event.target.value);
    };
    const calculateBmi = () => {
        const weightInKg = parseFloat(weight);
        const heightInM = parseFloat(height) / 100;
        if (isNaN(weightInKg) || isNaN(heightInM) || weightInKg <= 0 || heightInM <= 0) {
            setMessage("Invalid input. Please enter positive numbers only.");
            return;
        }
        const bmiValue = weightInKg / (heightInM * heightInM);
        const bmiMessage = getBmiMessage(bmiValue);

        setBmi(bmiValue.toFixed(2));
        setMessage(bmiMessage);
    };
    const getBmiMessage = (bmi: number): string => {
        if (bmi < 18.5) {
            return `Your BMI is ${bmi.toFixed(2)}. You are underweight.`;
        } else if (bmi < 25) {
            return `Your BMI is ${bmi.toFixed(2)}. You are normal weight.`;
        } else if (bmi < 30) {
            return `Your BMI is ${bmi.toFixed(2)}. You are overweight.`;
        } else {
            return `Your BMI is ${bmi.toFixed(2)}. You are obese.`;
        }
    };
    const clearMessage = () => {
        setMessage("");
    };
    return (
        <>
            <section className="py-6">
                <div className="container pb-5 text-center">
                    <h1 className="text-3xl font-bold">BMI Calculator</h1>
                </div>
                <div className="container pt-5">
                    <div className="flex justify-center">
                        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                            <form onSubmit={(e) => e.preventDefault()}>
                                {bmi && (
                                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                                        <button className="absolute top-0 right-0 px-4 py-1 text-green-700" onClick={() => setBmi("")}>✖</button>
                                        Your BMI is {bmi}
                                    </div>
                                )}
                                {message && (
                                    <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-4">
                                        <button className="absolute top-0 right-0 px-4 py-1 text-yellow-700" onClick={clearMessage}>✖</button>
                                        {message}
                                    </div>
                                )}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">Weight (kg)</label>
                                    <input
                                        className={`w-full p-2 border rounded ${message ? "border-red-500" : "border-gray-300"}`}
                                        type="number"
                                        value={weight}
                                        onChange={handleWeightChange}
                                        placeholder="Enter your weight"
                                        min="0"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">Height (cm)</label>
                                    <input
                                        className={`w-full p-2 border rounded ${message ? "border-red-500" : "border-gray-300"}`}
                                        type="number"
                                        value={height}
                                        onChange={handleHeightChange}
                                        placeholder="Enter your height"
                                        min="0"
                                    />
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                                        onClick={calculateBmi}>
                                        Calculate BMI
                                    </button>
                                </div>
                            </form>
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
export default BmiCalculator;
