
import  { useState, useCallback, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
const PasswordGenerator = () => {
  const [length, setLength] = useState<number>(8);
  const [numberAllowed, setNumberAllowed] = useState<boolean>(false);
  const [symbolAllowed, setSymbolAllowed] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");

  const passwordRef = useRef<HTMLInputElement | null>(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) letters += "0123456789";
    if (symbolAllowed) letters += "!@#$%^&*";

    for (let i = 0; i < length; i++) {
      const charIndex = Math.floor(Math.random() * letters.length);
      pass += letters.charAt(charIndex);
    }

    setPassword(pass);
  }, [length, numberAllowed, symbolAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    if (passwordRef.current) {
      passwordRef.current.select();
      window.navigator.clipboard.writeText(password);
    }
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, symbolAllowed, passwordGenerator]);

  return (
    <>
    
    <section className="p-5 mt-5">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Password Generator</h1>
      </div>

      <div className="p-6">
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="field mb-4">
                <input
                  className="input border rounded w-full py-2 px-3 text-gray-700"
                  type="text"
                  placeholder="Password"
                  value={password}
                  readOnly
                  ref={passwordRef}
                />
              </div>

              <button
                type="button"
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded mb-4"
                onClick={copyPasswordToClipboard}
              >
                Copy
              </button>

              <div className="mb-4">
                <input
                  type="range"
                  id="length"
                  name="length"
                  min={8}
                  max={30}
                  value={length}
                  onChange={(e) => setLength(Number(e.target.value))}
                  className="w-full"
                />
                <label htmlFor="length" className="block text-gray-700">
                  Length: {length}
                </label>
              </div>

              <div className="flex items-center mb-4">
                <label className="flex items-center mr-4">
                  <input
                    type="checkbox"
                    checked={numberAllowed}
                    onChange={() => setNumberAllowed((prev) => !prev)}
                    className="mr-2"
                  />
                  Numbers
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={symbolAllowed}
                    onChange={() => setSymbolAllowed((prev) => !prev)}
                    className="mr-2"
                  />
                  Symbols
                </label>
              </div>
            </form>
          </div>
        </div>

        <div className="text-center mt-6">
          <h3>Length - Min 8 to Max 30</h3>
          <h3>Letters - A to Z a to z</h3>
          <h3>Numbers - 0 to 9</h3>
          <h3>Symbols - !@#$%^&*</h3>
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

export default PasswordGenerator;
