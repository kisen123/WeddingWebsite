import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MistletoeDecor } from './MistletoeDecor';
import './Header.scss';

export function Header() {
    const { t } = useTranslation();
    return (
        <header className="header">
            <MistletoeDecor />
            <div className="header__names">
                <h1 className="header__groom">Kristian</h1>
                <span>&</span>
                <h1 className="header__bride">Kaja</h1>
            </div>
            <div className="header__date">28.08.2027</div>
            <nav className="header__nav">
                <Link to="/">{t("nav.home")}</Link>
                <Link to="/info">{t("nav.info")}</Link>
                <Link to="/rsvp">{t("nav.rsvp")}</Link>
                <Link to="/contact">{t("nav.contact")}</Link>
                <Link to="/q-a">{t("nav.qA")}</Link>
            </nav>
        </header>
    );
}