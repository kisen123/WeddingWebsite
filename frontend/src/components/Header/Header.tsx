import { useTranslation } from 'react-i18next';
import { MistletoeDecor } from './MistletoeDecor';
import { PageButton } from '../PageButton/PageButton';
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
                <PageButton text={t("nav.home")} to="/" />
                <PageButton text={t("nav.info")} to="/info" />
                <PageButton text={t("nav.rsvp")} to="/rsvp" />
                <PageButton text={t("nav.contact")} to="/contact" />
                <PageButton text={t("nav.qA")} to="/q-a" />
            </nav>
        </header>
    );
}