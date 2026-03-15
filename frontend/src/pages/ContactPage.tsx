import { useTranslation } from 'react-i18next';

export function ContactPage() {
    const { t } = useTranslation();
    return (
        <section>
            <h2>{t("contact.title")}</h2>
        </section>
    );
}
