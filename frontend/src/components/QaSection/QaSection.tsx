import './QaSection.scss';

import { useTranslation } from 'react-i18next';

import { qaItems } from '../../helpers/qaContent.ts';
import { QBlock } from './QBlock.tsx';

export function QaSection() {
  const { t } = useTranslation();

  return (
    <div className="qaSectionContents">
      <section className="qaSection">
        <h2 className="qaSection__title">{t('qaSection.title')}</h2>
        {qaItems.map((item) => (
          <QBlock
            key={item.answerKey}
            question={t(item.questionKey)}
            answerKey={item.answerKey}
          />
        ))}
      </section>
    </div>
  );
}
