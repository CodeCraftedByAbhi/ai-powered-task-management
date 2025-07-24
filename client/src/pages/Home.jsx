import { Link } from "react-router-dom";
import { Container, Button, Row, Col } from "react-bootstrap";

function Home() {
  return (
    <div className="min-vh-99 d-flex flex-column justify-content-center align-items-center bg-light text-center">
      <Container className="py-5 mt-4">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <h1 className="display-3 fw-bold text-primary mb-3">TaskMate 🚀</h1>
            <p className="lead text-secondary">
              Your AI-powered personal task assistant to help you plan smarter, work faster, and stay organized.
            </p>
            <p className="text-muted">
              TaskMate uses AI to analyze your task history and provide smart suggestions, making it easier than ever to stay productive.
            </p>
            <div className="d-flex justify-content-center gap-3 mt-4">
              <Link to="/login">
                <Button variant="primary" size="lg">Login</Button>
              </Link>
              <Link to="/register">
                <Button variant="outline-primary" size="lg">Register</Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
