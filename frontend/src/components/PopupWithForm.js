function PopupWithForm(props) {
    return(
        <div className={`popup popup_theme_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button type="button"
                        className="popup__button-close" onClick={props.onClose}></button>
                <h2 className="popup__title">{`${props.title}`}</h2>
                <form className="popup__form" name={`${props.name}`} onSubmit={props.onSubmit}>
                    <>{props.children}</>
                    <button className="popup__button popup__button_theme_edit-photo" onSubmit={props.onClose}>
                        {`${props.buttonText}`}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;