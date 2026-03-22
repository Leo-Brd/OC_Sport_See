import "./Header.css";
import logo from "../assets/logo.svg";

function Header() {
  return (
    <header className="header">
      <div className="header__logo">
        <img src={logo} alt="SportSee Logo" className="header__logo-img" />
        <span className="header__brand">SportSee</span>
      </div>
      <nav className="header__nav">
        <a href="#" className="header__nav-link">Accueil</a>
        <a href="#" className="header__nav-link">Profil</a>
        <a href="#" className="header__nav-link">Réglage</a>
        <a href="#" className="header__nav-link">Communauté</a>
      </nav>
    </header>
  );
}

export default Header;
