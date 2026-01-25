import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

export default function Signup() {
  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100 py-4">
      <p className="text-center text-muted mb-0">
        Sign up page — <Link to="/">Back to Login</Link>
      </p>
    </Container>
  );
}
