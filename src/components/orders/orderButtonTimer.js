import { React, useState, useEffect } from 'react';

const OrderButtonsTimer = ({ value, onClick, seconds, text }) => {
  const minutes = (Date.now() / 1000 - seconds) / 60;

  const [timer, setTimer] = useState(Math.floor(minutes));

  useEffect(() => {
    setTimeout(() => setTimer(timer + 1), 60000);
  }, [timer]);

  return (
        <button className="product marginButton" value={value} onClick={onClick} timer={timer}>
            <p className="productText tableMarginBottom">MESA # {text}</p>
            <p className={`productText ${timer > 14 && 'productRed'}`}>{timer} MIN</p>
        </button>
  );
};

export { OrderButtonsTimer };
