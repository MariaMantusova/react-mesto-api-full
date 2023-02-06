import React from "react";
import Header from "./Header";
import {useHistory} from "react-router-dom";
import {authApi} from "../utils/authApi";


function Login(props) {
    const [data, setData] = React.useState({
        email: "",
        password: ""
    });

    const history = useHistory();

    function handleChange(evt) {
        const {name, value} = evt.target;
        setData({
            ...data,
            [name]: value,
        })
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        if (!data.password || !data.email) {
            return
        }
        props.onLogin(data, setData);
    }

    return (
        <>
            <Header link="Регистрация" path="/sign-up"/>
            <section className="signing">
                <h1 className="signing__title">Вход</h1>
                <form className="signing__form" onSubmit={handleSubmit}>
                    <input className="signing__input" type="email" placeholder="Email" name="email"
                           value={data.email || ""} onChange={handleChange} required/>
                    <input className="signing__input" type="password" name="password" placeholder="Пароль" minLength="8"
                           value={data.password || ""} onChange={handleChange}  required/>
                    <button className="signing__button">Войти</button>
                </form>
            </section>
        </>
    )
}

export default Login;