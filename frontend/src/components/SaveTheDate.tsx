import './SaveTheDate.scss';

export default function SaveTheDate() {
  return (
    <div className="save-the-date">
      <div className="save-the-date__border">
        <p className="save-the-date__STD">Sett av datoen!</p>

        <div className="save-the-date__names">
          <p className="save-the-date__bride">Bride's Name</p>
          <p className="save-the-date__ampersand">&</p>
          <p className="save-the-date__groom">Groom's Name</p>
        </div>
      </div>
    </div>
  );
}
