import React from "react";

function InfoTooltip(props) {
    return (
        <div className={`info-tooltip-container ${props.isOpen ? 'info-tooltip-container_opened' : ''}`}>
            <section className="info-tooltip">
                <button type="button" className="popup__button-close" onClick={props.onClose}></button>
                <div className={`info-tooltip__image ${props.className}`}></div>
                <h2 className="info-tooltip__caption">{`${props.caption}`}</h2>
            </section>
        </div>
    )
}

export default InfoTooltip;