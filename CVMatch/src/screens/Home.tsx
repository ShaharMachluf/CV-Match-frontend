import { useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { matchCV } from '../api/match';

function Home() {
  const [jobDescription, setJobDescription] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [matchScore, setMatchScore] = useState<number | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setResumeFile(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setMatchScore(null);

    if (!resumeFile) {
      setError('Please upload your CV / resume.');
      return;
    }

    try {
      setLoading(true);
      const data = await matchCV(jobDescription, resumeFile);
      setMatchScore(data.match_score);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong while matching. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100 py-4">
      <Card className="shadow-sm w-100" style={{ maxWidth: '720px' }}>
        <Card.Body className="p-4">
          <Card.Title as="h2" className="text-center mb-4 fw-bold">
            Match your CV to a Job
          </Card.Title>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4" controlId="jobDescription">
              <Form.Label>Job description</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                placeholder="Paste the full job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="resumeUpload">
              <Form.Label>Upload your CV / resume</Form.Label>
              <Form.Control
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                required
              />
              <Form.Text className="text-muted">
                Accepted formats: PDF, DOC, DOCX.
              </Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100" disabled={loading}>
              {loading ? 'Analyzing…' : 'Analyze Match'}
            </Button>

            {error && (
              <p className="text-danger text-center mt-3 mb-0">{error}</p>
            )}

            {matchScore !== null && !error && (
              <p className="text-success text-center mt-3 mb-0">
                Match score: <strong>{matchScore}</strong>
              </p>
            )}
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Home;