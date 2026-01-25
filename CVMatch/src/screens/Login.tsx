import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    const form = e.currentTarget;

    if (!form.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);
    // TODO: Replace with actual API call
    console.log('Login:', { email, password });
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100 py-4">
      <Card className="shadow-sm w-100" style={{ maxWidth: '420px' }}>
        <Card.Body className="p-4">
          <Card.Title as="h2" className="text-center mb-4 fw-bold">
            Sign in
          </Card.Title>

          {error && (
            <Alert variant="danger" dismissible onClose={() => setError('')}>
              {error}
            </Alert>
          )}

          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid email.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                autoComplete="current-password"
              />
              <Form.Control.Feedback type="invalid">
                Password must be at least 6 characters.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="remember">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mb-3">
              Sign in
            </Button>

            <p className="text-center text-muted mb-0">
              Don&apos;t have an account{' '}
              <Link to="/signup">Sign up</Link>
            </p>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
