
import { useTranslation } from 'react-i18next';
import "./QaSection.scss";
import { QBlock } from './QBlock.tsx';

export function QaSection() {
    const { t } = useTranslation();
    return (
        <div className="qaSectionContents">
            <section className="qaSection">
                <h2 className="qaSection__title">{t('qaSection.title')}</h2>
                <p>{t('qaSection.description')}</p>
                <QBlock />
            </section>
        </div>

    )
};