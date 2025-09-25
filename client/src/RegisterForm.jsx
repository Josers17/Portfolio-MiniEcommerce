import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";

function RegisterForm({ onRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, role }),
      });

      if (!res.ok) throw new Error("Registration failed");

      const data = await res.json();
      alert("User registered successfully");

      if (onRegister) onRegister(data);

      setUsername("");
      setPassword("");
      setRole("customer");
    } catch (err) {
      console.error(err);
      alert("Error registering user");
    }
  };

  return (
    <Container className="mt-4">
      <h3>Register</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Role</Form.Label>
          <Form.Select
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </Form.Select>
        </Form.Group>
        <Button type="submit" variant="success">Register</Button>
      </Form>
    </Container>
  );
}

export default RegisterForm;
