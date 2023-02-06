import React from "react";
import {Link} from "react-router-dom";

function Menu(props) {
    function logOut() {
        localStorage.removeItem('jwt');
    }

    return (
        <>
            {props.opened && <ul className="burger-links">
                <li className="burger__email" onClick={props.closeMenu}>{`${props.email}`}</li>
                <li className="burger__link" onClick={props.closeMenu}>
                    <Link to="/sign-in" className="burger__link" onClick={logOut}>
                        Выйти
                    </Link>
                </li>
            </ul>}
        </>
    )
}

export default Menu;