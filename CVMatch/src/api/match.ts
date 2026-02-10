const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000/api';

export async function matchCV(jobDescription: string, resumeFile: File) {
  const formData = new FormData();
  // These keys must match your DRF serializer fields
  formData.append('job_description', jobDescription);
  formData.append('user_cv', resumeFile);

  try {
    const response = await fetch(`${API_BASE_URL}/match/`, {
      method: 'POST',
      body: formData,
      // Do NOT set Content-Type; the browser will set correct multipart boundary
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Match request failed: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}