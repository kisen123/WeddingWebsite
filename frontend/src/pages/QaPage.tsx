
import { useTranslation } from 'react-i18next';

export function QaPage() {
    const { t } = useTranslation();
    return (
        <section>
            <h2>{t('qaPage.title')}</h2>
            <p>{t('qaPage.description')}</p>
        </section>
    )
}