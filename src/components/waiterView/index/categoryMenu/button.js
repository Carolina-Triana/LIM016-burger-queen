import React from 'react';
import './button.css';

const Button = ({ className, text, value, clickHandler, src, alt }) => { /* este boton lo puedo reutilizar las veces que desee,
le paso la clase, el evento y el texto que quiero que lleve */
  return (
    <>
      <button
        className={className}
        value={value}
        onClickCapture={clickHandler}
      >
        <img src={src} alt={alt}/>
        <br/>
        {text}
      </button>
    </>
  );
};

export { Button };
