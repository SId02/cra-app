
import React, { useState } from "react";
import { Link } from 'react-router-dom';
const TipCalculator: React.FC = () => {
  const [billAmount, setBillAmount] = useState<number | null>(null);
  const [tipPercentage, setTipPercentage] = useState<number | null>(null);
  const [splitCount, setSplitCount] = useState<number | null>(null);
  const [tipAmount, setTipAmount] = useState<{
    totalAmount: string;
    tipPerPerson: string;
    totalPerPerson: string;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleCalculateTip = () => {
    if (!billAmount || billAmount <= 0 || !tipPercentage || tipPercentage <= 0 || !splitCount || splitCount <= 0) {
      setTipAmount(null);
      setErrorMsg("Please Enter Valid Values For Bill Amount,Tip Percentage & Number of Persons");
      return;
    }

    const bill = parseFloat(billAmount.toString());
    const tip = (bill * tipPercentage) / 100;
    const totalAmount = bill + tip;
    const tipAmountPerPerson = tip / splitCount;
    const totalAmountPerPerson = totalAmount / splitCount;

    setTipAmount({
      totalAmount: totalAmount.toFixed(2),
      tipPerPerson: tipAmountPerPerson.toFixed(2),
      totalPerPerson: totalAmountPerPerson.toFixed(2),
    });
    setErrorMsg('');
  };

  return (
    <>
      
    <section className="py-6">
      <div className="container mx-auto text-center pb-5">
        <h1 className="text-3xl font-bold">TIP CALCULATOR</h1>
      </div>
      <div className="container mx-auto pt-5">
        <div className="flex flex-col items-center">
          <div className="w-full max-w-md p-5 bg-white rounded-lg shadow-md">
            {errorMsg && (
              <div className="mb-4 p-3 bg-red-200 text-red-800 rounded">
                <p>{errorMsg}</p>
              </div>
            )}
            {tipAmount && (
              <div className="mb-4 p-3 bg-green-200 text-green-800 rounded">
                <p>Total Amount: ₹{tipAmount.totalAmount}</p>
                <p>Tip Per Person: ₹{tipAmount.tipPerPerson}</p>
                <p>Total Amount Per Person: ₹{tipAmount.totalPerPerson}</p>
              </div>
            )}

            <div className="mb-4">
              <label htmlFor="amount" className="block text-left mb-2 font-medium">Bill Amount</label>
              <input
                id="amount"
                type="number"
                placeholder="₹ Bill Amount to be Paid"
                onChange={(event) => setBillAmount(parseFloat(event.target.value))}
                value={billAmount ?? ''}
                className="input w-full border rounded-md p-2"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="guests" className="block text-left mb-2 font-medium">Number of Persons</label>
              <input
                id="guests"
                type="number"
                placeholder="Total number of Persons"
                onChange={(event) => setSplitCount(parseFloat(event.target.value))}
                value={splitCount ?? ''}
                className="input w-full border rounded-md p-2"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="tip" className="block text-left mb-2 font-medium">Tip Percentage</label>
              <input
                id="tip"
                type="number"
                placeholder="% Tip Percentage"
                onChange={(event) => setTipPercentage(parseFloat(event.target.value))}
                value={tipPercentage ?? ''}
                className="input w-full border rounded-md p-2"
              />
            </div>

            <button
              className="w-full bg-blue-500 text-white font-bold py-2 rounded-md hover:bg-blue-600 transition duration-200"
              onClick={handleCalculateTip}
            >
              Calculate
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
export default TipCalculator;
