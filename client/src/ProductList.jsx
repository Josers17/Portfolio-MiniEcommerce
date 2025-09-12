import { useEffect, useState } from "react";

function ProductList() 
{
  const [products, setProducts] = useState([]);
  const [rate, setRate] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  useEffect(() => {
    fetch("https://api.frankfurter.app/latest?from=USD&to=MXN")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.rates && data.rates.MXN) {
          setRate(data.rates.MXN);
        }
      })
      .catch((err) => console.error("Error fetching exchange rate:", err));
  }, []);


  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} - ${p.price}
            {rate && ` / ${(p.price * rate).toFixed(2)} MXN`}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
