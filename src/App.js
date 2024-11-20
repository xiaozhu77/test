import { useEffect, useState } from "react";

function App() {
  const [amount, setamount] = useState();
  const [from, setfrom] = useState("USD");
  const [toCur, settoCur] = useState("EUR");
  const [converted, setconverted] = useState("");
  const [isloading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function convert(from, toCur, amount) {
        setIsLoading(true);
        try {
          const res = await fetch(
            `https://api.frankfurter.app/latest?base=${from}&symbols=${toCur}`
          );
          if (!res.ok) throw new Error("something worning");
          const data = await res.json();
          console.log(data);
          const convertedAmount = (amount * data.rates[toCur]).toFixed(2);
          setconverted(convertedAmount);
        } catch (err) {
          alert(err.message);
        }
        setIsLoading(false);
      }
      if (from === toCur) return setconverted(amount);
      convert(from, toCur, amount);
    },
    [amount, from, toCur]
  );

  function handleBase(e) {
    setfrom(e.target.value);
  }

  function handleToCur(e) {
    settoCur(e.target.value);
  }

  return (
    <div>
      <input onChange={(e) => setamount(e.target.value)} type="text" />
      <select disabled={isloading} value={from} onChange={handleBase}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select disabled={isloading} value={toCur} onChange={handleToCur}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <div>
        {converted} {toCur}
      </div>
    </div>
  );
}
export default App;
