function ImagePopup(props) {
    return(
        <div className={`popup popup_theme_image ${props.card ? 'popup_opened' : ''}`}>
            <figure className="popup__image-container">
                <button aria-label="закрыть" type="button"
                        className="popup__button-close popup__button-close_theme_image" onClick={props.onclose}></button>
                <img className="popup__image" src={props.card ? props.card.link : ''}
                     alt={props.card ? props.card.name : ''}/>
                <figcaption className="popup__caption">{props.card ? props.card.name : ''}</figcaption>
            </figure>
        </div>
    )
}

export default ImagePopup;