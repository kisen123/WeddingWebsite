
import { useTranslation } from 'react-i18next';
import "./QaSection.scss";
import { QBlock } from './QBlock.tsx';

export function QaSection() {
    const { t } = useTranslation();
    return (
        <div className="qaSectionContents">
            <section className="qaSection">
                <h2 className="qaSection__title">{t('qaSection.title')}</h2>
                <QBlock question={t('qaSection.questions.question1')} answer={t('qaSection.answers.answer1')} />
                <QBlock question={t('qaSection.questions.question2')} answer={t('qaSection.answers.answer2')} />
                <QBlock question={t('qaSection.questions.question3')} answer={t('qaSection.answers.answer3')} />
            </section>
        </div>

    )
};