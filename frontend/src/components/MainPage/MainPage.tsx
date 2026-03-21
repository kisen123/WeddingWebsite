import React, { useEffect, useState } from "react";
import { getWeddingInfo, submitRsvp } from "../../api.ts";

type WeddingInfo = {
  couple: string;
  date: string;
  venue: string;
  city: string;
};

export function MainPage() {

  const [info, setInfo] = useState<WeddingInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [attending, setAttending] = useState(true);
  const [dietaryRequirements, setDietaryRequirements] = useState("");
  const [songRequest, setSongRequest] = useState("");

  useEffect(() => {
    getWeddingInfo()
      .then(setInfo)
      .catch(() => setMessage("Could not load wedding info."))
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    try {
      const result = await submitRsvp({
        name,
        email,
        attending,
        dietaryRequirements,
        songRequest,
      });

      setMessage(result.message);
      setName("");
      setEmail("");
      setAttending(true);
      setDietaryRequirements("");
      setSongRequest("");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  }


    return (
        <main className="main-page">
      

      {loading && <p>Loading...</p>}

      {info && (
        <section id="info">
          <h2>{info.couple}</h2>
          <p>{info.date}</p>
          <p>
            {info.venue}, {info.city}
          </p>
        </section>
      )}

      <hr style={{ margin: "2rem 0" }} />

      <section id="rsvp">
        <h2>RSVP</h2>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "0.75rem" }}>
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>
            <input
              type="checkbox"
              checked={attending}
              onChange={(e) => setAttending(e.target.checked)}
            />
            Attending
          </label>

          <input
            placeholder="Dietary requirements"
            value={dietaryRequirements}
            onChange={(e) => setDietaryRequirements(e.target.value)}
          />

          <input
            placeholder="Song request"
            value={songRequest}
            onChange={(e) => setSongRequest(e.target.value)}
          />

          <button type="submit">Send RSVP</button>
        </form>

        {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
      </section>
    </main>
    )
}