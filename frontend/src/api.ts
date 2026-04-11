const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5050';

export type WeddingProgram = {
  couple: string;
  date: string;
  venue: string;
  city: string;
};

export type RsvpPayload = {
  name: string;
  email: string;
  attending: boolean;
  dietaryRequirements?: string;
  songRequest?: string;
};

export async function getWeddingProgram(): Promise<WeddingProgram> {
  const response = await fetch(`${API_BASE_URL}/api/program`);

  if (!response.ok) {
    throw new Error('Failed to fetch wedding program.');
  }

  return response.json();
}

export async function submitRsvp(payload: RsvpPayload) {
  const response = await fetch(`${API_BASE_URL}/api/rsvp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.error ?? 'Failed to submit RSVP.');
  }

  return response.json();
}
