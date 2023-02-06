import React from "react";
import {Route, Switch, Redirect, useHistory} from 'react-router-dom';
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";
import {api} from "../utils/api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddCardPopup from "./AddCardPopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import {authApi} from "../utils/authApi";
import InfoTooltip from "./InfoTooltip";

function App() {
    const history = useHistory();
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);
    const [authorized, setAuthorized] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [isOpenInfoTooltip, setIsOpenInfoTooltip] = React.useState(false);
    const [captionInfoTooltip, setCaptionInfoTooltip] = React.useState('');
    const [classNameInfoTooltip, setClassNameInfoTooltip] = React.useState('');

    React.useEffect(() => {
      authorized && api.getUserInfo()
            .then((user) => {
                setCurrentUser(user);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [authorized])

    React.useEffect(() => {
        authorized && api.getCards()
            .then((cardList) => {
                setCards(cardList);
            })
            .catch((err) => console.log(err))
    }, [authorized])

    function tokenCheck() {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            authApi.validityCheck(jwt)
                .then((res) => {
                    if (res) {
                        handleAuthorized(res.data.email)
                        history.push("/main")
                    }
                })
                .catch((err) => console.log(err))
        }
    }

    function handleLogin(data, setData) {
        authApi.authorizeUser(data.password, data.email)
            .then((res) => {
                if (res.token) {
                    handleAuthorized(data.email)
                    setData({email: '', password: ''})
                    localStorage.setItem('jwt', res.token);
                    history.push("/main")
                }
            })
            .catch((err) => {
                infoToolTipFailOpen(err);
            })
    }

    function handleRegister(password, email, setData, data) {
        authApi.registerUser(password, email)
            .then((res) => {
                if (res.statusCode !== 400) {
                    setData({
                        ...data
                    });
                    infoToolTipSuccessOpen();
                    history.push("/sign-in");
                }
            })
            .catch((err) => {
                infoToolTipFailOpen(err)
            })
    }

    React.useEffect(() => {
        tokenCheck();
    },[])

    function infoToolTipSuccessOpen() {
        setIsOpenInfoTooltip(true);
        setCaptionInfoTooltip("Вы успешно зарегистрировались!");
        setClassNameInfoTooltip("info-tooltip__image_success");
    }

    function infoToolTipFailOpen(err) {
        setIsOpenInfoTooltip(true);
        setCaptionInfoTooltip(err);
        setClassNameInfoTooltip("info-tooltip__image_fail");
    }

    function closeInfoTooltip() {
        setIsOpenInfoTooltip(false);
    }

    function handleCardLike(card, userInfo) {
        const isLiked = card.likes.some(i => i._id === userInfo._id)

        if (isLiked) {
            api.deleteLike(card._id)
                .then((newCard) => {
                    setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
                })
                .catch((err) => console.log(err));
        } else {
            api.addLike(card._id)
                .then((newCard) => {
                    setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
                })
                .catch((err) => console.log(err));
        }
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards((state) => state.filter((c) => c._id !== card._id));
            })
            .catch((err) => console.log(err))
    }

    function closeByEsc(evt)  {
        if (evt.key === 'Escape') {
            closeAllPopups();
        }
    }

    function closeByBackground(evt) {
        if (evt.target.classList.contains('popup')) {
            closeAllPopups();
        }
    }

    function addPopupListeners(){
        window.addEventListener('keydown', closeByEsc);
        window.addEventListener('click', (evt) => {
            closeByBackground(evt);
        });
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
        addPopupListeners();
    }

    function handleAddPlaceClick() {
        setAddPlacePopupOpen(true);
        addPopupListeners();
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
        addPopupListeners();
    }

    function handleCardClick(card) {
        setSelectedCard(card);
        addPopupListeners();
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        window.removeEventListener('keydown', closeByEsc);
        window.removeEventListener('click', closeByBackground);
        setSelectedCard(null);
    }

    function handleUpdateUser(name, description) {
        api.changeUserInfo(name, description)
            .then((userInfo) => {
                setCurrentUser(userInfo);
                closeAllPopups();
            })
            .catch((err) => console.log(err))
    }

    function handleUpdateAvatar(avatar) {
        api.changeProfilePhoto(avatar)
            .then((userInfo) => {
                setCurrentUser(userInfo);
                closeAllPopups();
            })
            .catch((err) => console.log(err))
    }

    function handleAddCardSubmit(name, link) {
        api.saveNewCard(name, link)
            .then((newCard) => {
                newCard.name = name;
                newCard.link = link;
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    function handleAuthorized(email) {
        setAuthorized(true);
        setEmail(email);
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Switch>
                    <Route path="/sign-in">
                        <Login authorize={handleAuthorized} onLogin={handleLogin}/>
                    </Route>
                    <Route path="/sign-up">
                        <Register onRegister={handleRegister}/>
                    </Route>
                    <ProtectedRoute path="/main" authorized={authorized}
                                    component={Main}
                                    onEditProfile={handleEditProfileClick}
                                    onAddPlace={handleAddPlaceClick}
                                    onEditAvatar={handleEditAvatarClick}
                                    onCardClick={handleCardClick}
                                    cards={cards}
                                    onLike={handleCardLike}
                                    onDelete={handleCardDelete}
                                    email={email}
                    />
                    <Route exact path="/">
                        {authorized ? <Redirect to="/sign-in"/> : <Redirect to="/sign-up"/>}
                    </Route>
                </Switch>

                <ImagePopup card={selectedCard} onclose={closeAllPopups}/>

                <PopupWithForm name="confirm" title="Вы уверены?" buttonText="Да"/>

                <EditProfilePopup onClose={closeAllPopups} isOpen={isEditProfilePopupOpen}
                                  onUpdateUser={handleUpdateUser}/>

                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}
                                 onUpdateAvatar={handleUpdateAvatar}/>

                <AddCardPopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}
                              onAddCard={handleAddCardSubmit}/>
                <InfoTooltip isOpen={isOpenInfoTooltip} caption={captionInfoTooltip} className={classNameInfoTooltip}
                             onClose={closeInfoTooltip}/>

            </div>
        </CurrentUserContext.Provider>

    )

}

export default App;
