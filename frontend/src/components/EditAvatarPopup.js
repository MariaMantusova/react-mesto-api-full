import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar(avatarRef.current.value);
    }

    React.useEffect(() => {
        avatarRef.current.value = ''
    }, [props.isOpen]);

    return (
        <PopupWithForm name="edit-photo" title="Обновить аватар" buttonText="Сохранить"
                       isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
            <input type="url" id="edit-photo-input-link" name="avatar" ref={avatarRef}
                   className="popup__item popup__item_el_image"
                   placeholder="Ссылка на аватар" required/>
            <span className="edit-photo-input-link-error popup__item-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;