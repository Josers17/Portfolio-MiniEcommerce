import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";

function AddProductForm({ onProductAdded }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = { name, price: parseFloat(price) };

    try {
      const res = await fetch("http://localhost:5000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      if (!res.ok) throw new Error("Error adding product");

      const data = await res.json();
      onProductAdded(data); // avisa al padre que hay producto nuevo
      setName("");
      setPrice("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container className="mt-4">
      <h3>Add New Product</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Price (USD)</Form.Label>
          <Form.Control
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit" variant="success">Add Product</Button>
      </Form>
    </Container>
  );
}

export default AddProductForm;
