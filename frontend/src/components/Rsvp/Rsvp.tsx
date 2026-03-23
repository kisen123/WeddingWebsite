
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { submitRsvp } from "../../api.ts";
import "./Rsvp.scss";


export function Rsvp() {

    const { t } = useTranslation();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [attending, setAttending] = useState(true);
    const [dietaryRequirements, setDietaryRequirements] = useState("");
    const [songRequest, setSongRequest] = useState("");
    const [message, setMessage] = useState("");

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
            setMessage(error instanceof Error ? error.message : t("rsvp.error"));
        }
    }



    return (
        <div className="rsvpContents">
            <section className="rsvp">
                <h2 className="rsvp__title">{t("rsvp.title")}</h2>
                <form onSubmit={handleSubmit} style={{ display: "grid", gap: "0.75rem" }}>
                    <input
                        placeholder={t("rsvp.name")}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        placeholder={t("rsvp.email")}
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
                        {t("rsvp.attending")}
                    </label>
                    <input
                        placeholder={t("rsvp.dietaryRequirements")}
                        value={dietaryRequirements}
                        onChange={(e) => setDietaryRequirements(e.target.value)}
                    />
                    <input
                        placeholder={t("rsvp.songRequest")}
                        value={songRequest}
                        onChange={(e) => setSongRequest(e.target.value)}
                    />
                    <button type="submit">{t("rsvp.submit")}</button>
                </form>
                {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
            </section>
        </div>
    );
}