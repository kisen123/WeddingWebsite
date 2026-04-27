// import { useEffect, useState } from 'react';
import './Program.scss';

import { useTranslation } from 'react-i18next';

// import type { WeddingProgram } from '../../api.ts';
// import { getWeddingProgram } from '../../api.ts';
import programFlowers from '../../assets/programFlowers.png';
import { Checkerboard } from '../Checkerboard/Checkerboard.tsx';

export function Program() {
  const { t } = useTranslation();
  //   TODO: Implement fetching and displaying the wedding program from the API
  //   const [program, setProgram] = useState<WeddingProgram | null>(null);
  //   const [loading, setLoading] = useState(true);

  //   useEffect(() => {
  //     getWeddingProgram()
  //       .then(setProgram)
  //       .finally(() => setLoading(false));
  //   }, [t]);

  return (
    <section>
      <Checkerboard columns={31} rows={5} />
      <div className="programLayout">
        <div className="programDiv">
          <h2 className="programTitle">{t('program.title')}</h2>

          {/* First day */}
          <p className="programDate">27.08.2027</p>
          <div className="programInfo">
            <p className="programItem">Item 1</p>
            <p className="programItem">Item 2</p>
            <p className="programItem">Item 3</p>
            <p className="programItem">Item 4</p>
          </div>

          {/* Second day */}
          <p className="programDate">28.08.2027</p>
          <div className="programInfo">
            <p className="programItem">Item 1</p>
            <p className="programItem">Item 2</p>
            <p className="programItem">Item 3</p>
            <p className="programItem">Item 4</p>
          </div>

          {/* Third day */}
          <p className="programDate">29.08.2027</p>
          <div className="programInfo">
            <p className="programItem">Item 1</p>
            <p className="programItem">Item 2</p>
            <p className="programItem">Item 3</p>
            <p className="programItem">Item 4</p>
          </div>
        </div>
        <img
          width={300}
          src={programFlowers}
          alt=""
          className="programFlower"
        />
      </div>
    </section>
  );
}
