import { useState, useEffect } from "react";
import ProductList from "./ProductList";
import AddProductForm from "./AddProductForm";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
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

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const handleProductAdded = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  return (
    <div>
      <h1 className="text-center mt-3">Mini E-Commerce</h1>

      <AddProductForm onProductAdded={handleProductAdded} />

      <ProductList products={products} addToCart={addToCart} rate={rate} />

      <div className="container mt-5">
        <h2>Shopping Cart</h2>
        {cart.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.name} - ${item.price} USD
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
