import './Header.scss';

export function Header() {
    return (
        <header className="header">
            <div className="header__logo">INSERT SVG HERE</div>
            <div className="header__title">Kristian og Kaja</div>
            <div className="header__date">28.08.2027</div>
            <nav className="header__nav">
                <a href="#home">Home</a>
                <a href="#info">Info</a>
                <a href="#rsvp">RSVP</a>
                <a href="#contact">Contact</a>
            </nav>
        </header>
    );
}