import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getWeddingInfo } from "../api.ts";
import type { WeddingInfo } from "../api.ts";

export function InfoPage() {
    const { t } = useTranslation();
    const [info, setInfo] = useState<WeddingInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        getWeddingInfo()
            .then(setInfo)
            .catch(() => setError(t("info.error")))
            .finally(() => setLoading(false));
    }, [t]);

    return (
        <section>
            <h2>{t("info.title")}</h2>
            {loading && <p>{t("info.loading")}</p>}
            {error && <p>{error}</p>}
            {info && (
                <>
                    <h3>{info.couple}</h3>
                    <p>{info.date}</p>
                    <p>{info.venue}, {info.city}</p>
                </>
            )}
        </section>
    );
}
