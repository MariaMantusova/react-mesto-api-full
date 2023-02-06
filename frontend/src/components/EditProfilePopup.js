import React from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleChangeName(evt) {
        setName(evt.target.value);
    }

    function handleChangeDescription(evt) {
        setDescription(evt.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateUser(name, description);
    }

    return (
        <PopupWithForm name="profile-info" title="Редактировать профиль" buttonText="Сохранить"
                       isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
                <input type="text" id="profile-info-input-name" name="name"
                       className="popup__item popup__item_el_name" value={name || ''} onChange={handleChangeName}
                       placeholder="Имя пользователя" minLength="2" maxLength="40" required/>
                <span className="profile-info-input-name-error popup__item-error"></span>
                <input type="text" id="profile-info-input-job" name="job"
                       className="popup__item popup__item_el_job" value={description || ''}
                       onChange={handleChangeDescription}
                       placeholder="Род деятельности" minLength="2" maxLength="200" required/>
                <span className="profile-info-input-job-error popup__item-error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;