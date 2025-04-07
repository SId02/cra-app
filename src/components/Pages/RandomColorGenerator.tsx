
import React, { useState, useCallback, useMemo } from "react";
import { Link } from 'react-router-dom';

const RandomColorGenerator: React.FC = () => {
  const hex = useMemo(() => [
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"
  ], []);

  const [color, setColor] = useState<string>("#FFFFFF");
  const [copied, setCopied] = useState<boolean>(false);

  const getRandomNumber = useCallback((): number => {
    return Math.floor(Math.random() * hex.length);
  }, [hex.length]);

  const generateColor = useCallback((): void => {
    let hexColor = "#";
    for (let i = 0; i < 6; i++) {
      hexColor += hex[getRandomNumber()];
    }
    setColor(hexColor);
  }, [hex, getRandomNumber]);

  const copyToClipboard = useCallback(async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(color);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  }, [color]);

  return (
    <>
      <section
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: color }}
      >
        <div className="container mx-auto p-4 md:p-8">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="px-4 py-3 bg-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Color:</h3>
              <span className="text-lg font-mono">{color}</span>
            </div>
            <div className="p-4 flex flex-col md:flex-row items-center justify-between gap-2">
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded w-full md:w-auto"
                onClick={generateColor}
              >
                Generate
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-full md:w-auto"
                onClick={copyToClipboard}
              >
                {copied ? "Copied!" : "Copy"}
              </button>
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

export default RandomColorGenerator;
