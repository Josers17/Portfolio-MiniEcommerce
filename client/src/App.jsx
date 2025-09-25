import { useState, useEffect } from "react";
import ProductList from "./ProductList";
import AddProductForm from "./AddProductForm";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [rate, setRate] = useState(null);
  const [user, setUser] = useState(null);

  const fetchCart = async (userId, token) => {
    try {
      const res = await fetch(`http://localhost:5000/cart/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Error fetching cart");

      const data = await res.json();
      setCart(data);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  const addToCart = async (product) => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      const res = await fetch("http://localhost:5000/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ product_id: product.id, quantity: 1 }),
      });

      if (!res.ok) throw new Error("Error adding product to cart");

      await fetchCart(userId, token);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        const role = localStorage.getItem("role");

        if (token && userId) {
          setUser({ id: userId, role: role || "customer" });
          await fetchCart(userId, token);
        }
      } catch (err) {
        console.error("Error checking user:", err);
      }
    };

    checkUser();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/products");
        if (!res.ok) throw new Error("Error fetching products");

        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchRate = async () => {
      try {
        const res = await fetch("https://api.frankfurter.app/latest?from=USD&to=MXN");
        if (!res.ok) throw new Error("Error fetching exchange rate");

        const data = await res.json();

        if (data?.rates?.MXN) {
          setRate(data.rates.MXN);
        }
      } catch (err) {
        console.error("Error fetching exchange rate:", err);
      }
    };

    fetchRate();
  }, []);

  const handleProductAdded = (newProduct) => {
    setProducts((prev) => [...prev, newProduct]);
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setCart([]);
  };

  if (!user) {
    return (
      <div>
        <h1 className="text-center mt-3">Mini E-Commerce</h1>
        <LoginForm
          onLogin={(userData) => {
            setUser(userData);
            localStorage.setItem("role", userData.role);
          }}
        />
        <RegisterForm onRegister={(userData) => setUser(userData)} />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-center mt-3">Mini E-Commerce</h1>
      <p className="text-center">Logged in as: {user.role}</p>
      <div className="text-center mb-3">
        <button onClick={handleLogout} className="btn btn-danger">
          Logout
        </button>
      </div>

      {user.role === "admin" && (
        <AddProductForm onProductAdded={handleProductAdded} />
      )}

      <ProductList products={products} addToCart={addToCart} rate={rate} />

      <div className="container mt-5">
        <h2>Shopping Cart</h2>
        {cart.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.name} - ${item.price} USD x {item.quantity}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;