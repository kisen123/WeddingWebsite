import './ABlock.scss';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

import { loadQaAnswer } from '../../helpers/qaContent';

export function ABlock({
  answerKey,
  isOpen,
}: {
  answerKey: string;
  isOpen: boolean;
}) {
  const { i18n, t } = useTranslation();
  const [markdown, setMarkdown] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    let isCancelled = false;

    loadQaAnswer(i18n.language, answerKey)
      .then((content) => {
        if (!isCancelled) {
          setMarkdown(content);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setMarkdown('');
          setHasError(true);
          setIsLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [answerKey, i18n.language, isOpen]);

  return (
    <div
      className={`answerBlock ${isOpen ? 'answerBlock--open' : ''}`}
      aria-hidden={!isOpen}
    >
      <div className="answerBlock__text">
        {hasError ? (
          <p>{t('qaSection.answerError')}</p>
        ) : isLoading ? (
          <p>{t('qaSection.loadingAnswer')}</p>
        ) : (
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>{markdown}</ReactMarkdown>
        )}
      </div>
    </div>
  );
}
