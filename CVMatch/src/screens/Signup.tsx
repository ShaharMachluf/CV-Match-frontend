import { Link } from 'react-router-dom';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { useState } from 'react';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: hook this up to your signup API
    if (password !== confirmPassword) {
      // In a real app, replace with nicer UI feedback
      alert('Passwords do not match');
      return;
    }
    console.log({ email, password, confirmPassword });
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100 py-4">
      <Card className="shadow-sm w-100" style={{ maxWidth: '420px' }}>
        <Card.Body className="p-4">
          <Card.Title as="h2" className="text-center mb-4 fw-bold">
            Sign up
          </Card.Title>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="signupEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="signupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="signupConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mb-3">
              Create Account
            </Button>

            <p className="text-center text-muted mb-0">
              Already have an account? <Link to="/">Back to Login</Link>
            </p>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
