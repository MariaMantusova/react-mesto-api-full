import logoImage from "../images/header-logo.svg";
import React from "react";
import {Link} from "react-router-dom";

function Header(props) {
    function logOut() {
        if (`${props.link}` === "Выйти") {
            localStorage.removeItem('jwt');
        }
    }

    return (
        <>
            <header className="header">
                <a href="#" className="header__link">
                    <img src={logoImage} alt="Логотип сайта" className="header__logo"/>
                </a>
                <nav className="header__links-container">
                    {props.children}
                    <Link to={props.path} className="header__link" onClick={logOut}>
                        <h2 className={`header__registration-link ${props.nameClass}`}>{`${props.link}`}</h2>
                    </Link>
                </nav>
            </header>
        </>
    )
}

export default Header;