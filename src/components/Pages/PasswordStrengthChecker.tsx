import React, { useState, useEffect, ChangeEvent } from "react";
import { Link } from 'react-router-dom';
type PasswordStrength = "Very Weak" | "Weak" | "Medium" | "Strong" | "Very Strong";

const PasswordStrengthChecker: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>("Very Weak");
  const [message, setMessage] = useState<string>("");
  const [messageColor, setMessageColor] = useState<string>("text-red-800");
  const [messageBgColor, setMessageBgColor] = useState<string>("bg-red-200");
  const [strengthBarWidth, setStrengthBarWidth] = useState<string>("0%");
  const [strengthBarColor, setStrengthBarColor] = useState<string>("bg-red-500");
  const [showMessage, setShowMessage] = useState<boolean>(false);

  const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const enteredValue = event.target.value.trim();
    setPassword(enteredValue);
    setShowMessage(true);
  };

  useEffect(() => {
    let newStrength: PasswordStrength = "Very Weak";
    let newWidth = "0%";
    let barColor = "bg-red-500";
    let textColor = "text-red-800";
    let bgColor = "bg-red-200";

    if (password.length === 0) {
      newStrength = "Very Weak";
      newWidth = "0%";
      setShowMessage(false); 
    } else if (password.length <= 4) {
      newStrength = "Very Weak";
      newWidth = `${(password.length / 16) * 100}%`;
    } else if (password.length <= 6) {
      newStrength = "Weak";
      newWidth = `${(password.length / 16) * 100}%`;
      barColor = "bg-orange-500";
      textColor = "text-orange-800";
      bgColor = "bg-orange-200";
    } else if (password.length <= 8) {
      newStrength = "Medium";
      newWidth = `${(password.length / 16) * 100}%`;
      barColor = "bg-yellow-500";
      textColor = "text-yellow-800";
      bgColor = "bg-yellow-200";
    } else if (password.length <= 12) {
      newStrength = "Strong";
      newWidth = `${(password.length / 16) * 100}%`;
      barColor = "bg-blue-500";
      textColor = "text-blue-800";
      bgColor = "bg-blue-200";
    } else {
      newStrength = "Very Strong";
      newWidth = "100%"; 
      barColor = "bg-green-500";
      textColor = "text-green-800";
      bgColor = "bg-green-200";
    }

    setPasswordStrength(newStrength);
    setStrengthBarWidth(newWidth);
    setStrengthBarColor(barColor);
    setMessageColor(textColor);
    setMessageBgColor(bgColor);
    setMessage(newStrength);
  }, [password]);

  return (
    <>
    <div className="container mx-auto p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="flex justify-center">
        <div className="w-full sm:w-2/3 md:w-1/2 lg:w-6/12">
          <h3 className="text-center text-lg font-bold sm:text-xl md:text-2xl">
            Password Strength Checker
          </h3>
          <input
            type="password"
            value={password}
            onChange={inputHandler}
            placeholder="Enter your password"
            className="border rounded p-2 w-full mt-4 sm:mt-6 md:mt-8"
          />
          <div className="status-bar w-full h-2 bg-gray-200 rounded mt-2 sm:mt-3 md:mt-4">
            <div
              className={`strength h-full ${strengthBarColor}`}
              style={{ width: strengthBarWidth }}
            ></div>
          </div>
          {showMessage && (
            <div
              className={`message text-center mt-2 sm:mt-3 md:mt-4 ${messageBgColor} ${messageColor} p-3 rounded`}
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
    <footer className="flex justify-center mt-4">
      <Link to="/" className="text-blue-500 hover:underline">
          Back to Home
      </Link>
  </footer>
    </>
  );
};

export default PasswordStrengthChecker;