import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

function ProductList( {addToCart}) {
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
    <Container className="mt-4">
      <h2 className="mb-4 text-center">Our Products</h2>
      <Row>
        {products.map((p) => (
          <Col key={p.id} md={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={`https://placehold.co/300x200?text=${p.name}`}
              />
              <Card.Body>
                <Card.Title>{p.name}</Card.Title>
                <Card.Text>
                  ${p.price} USD{" "}
                  {rate && (
                    <span className="text-muted">
                      / {(p.price * rate).toFixed(2)} MXN
                    </span>
                  )}
                </Card.Text>
                  <Button variant="primary" onClick={() => addToCart(p)}>
                    Add to Cart
                  </Button>  
                </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProductList;
