import { useTranslation } from 'react-i18next';

export function HomePage() {
  const { t } = useTranslation();
  return (
    <section>
      <h2>{t('home.welcome')}</h2>
      <h2>{t('home.welcome')}</h2>
      <h2>{t('home.welcome')}</h2>
      <h2>{t('home.welcome')}</h2>
      <h2>{t('home.welcome')}</h2>
      <h2>{t('home.welcome')}</h2>
      <h2>{t('home.welcome')}</h2>
      <h2>{t('home.welcome')}</h2>
    </section>
  );
}
