import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Container className="home-container">
      <Row>
        <Col xs={12}>
          <h3>Please check out the following single page web apps.</h3>
        </Col>
        <Col xs={12}>
          <Link to="/prayertimes">Prayer Times</Link>
        </Col>
      </Row>
    </Container>
  );
}
