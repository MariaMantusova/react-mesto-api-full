import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext"

function Card(props) {
    const userInfo = React.useContext(CurrentUserContext);
    const isOwn = props.card.owner._id === userInfo._id;
    const isLiked = props.card.likes.some(i => i._id === userInfo._id);
    const cardDeleteButtonClassName = `card__delete-button ${!isOwn && 'card__delete-button_inactive'}`;
    const cardLikeButtonClassName = `card__like ${isLiked && 'card__like_active'}`;

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }

    return (
        <article className="card" key={props.card._id}>
            <button aria-label="удалить" type="button" className={cardDeleteButtonClassName}
                    onClick={handleDeleteClick}></button>
            <img className="card__image" src={`${props.card.link}`} alt={`${props.card.name}`} onClick={handleClick}/>
            <div className="card__info">
                <h2 className="card__title">{`${props.card.name}`}</h2>
                <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                <span className="card__like_sum">{`${props.card.likes.length}`}</span>
            </div>
        </article>
    )
}

export default Card;