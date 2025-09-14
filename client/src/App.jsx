import { useState } from "react";
import ProductList from "./ProductList";

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]); 
  };

  return (
    <div>
      <h1 className="text-center mt-3">Mini E-Commerce</h1>

      <ProductList addToCart={addToCart} />

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
