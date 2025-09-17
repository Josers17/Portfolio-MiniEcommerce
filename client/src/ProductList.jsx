import { Container, Row, Col, Card, Button } from "react-bootstrap";

function ProductList({ products, addToCart, rate }) {
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
