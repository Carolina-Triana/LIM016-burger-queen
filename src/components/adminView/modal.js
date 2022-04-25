import React from 'react';
import ReactDOM from 'react-dom';
import './modal.css';

const ModalAdmin = ({ onClick, closeModalMenu, text, yesText, noText }) => {
  return ReactDOM.createPortal( // revisar este metodo

    <section className={'modal-father'}>
      <div className={'container-modal'}>
        <p className='text'>{text}</p>
        <div className={'buttonContainer'}>
          <button className="yesButton buttonSize" onClick={onClick}>{yesText}</button>
          <button className="noButton buttonSize" onClick={closeModalMenu}>{noText}</button>
        </div>
      </div>
    </section>,
    document.getElementById('modalAdmin')
  );
};

export { ModalAdmin };
