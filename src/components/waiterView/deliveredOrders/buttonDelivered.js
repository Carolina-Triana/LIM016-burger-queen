import React from 'react';
import './buttonDelivered.css';

const ButtonOrderDelivered = ({ buttonHandler, text }) => {
  return (

      <section className="component-father-DerDelivered">
        <div className= 'component-flex-DerDelivered'>
          <button className="buttonOrder-DerDelivered" onClick={buttonHandler}>
            <img src={process.env.PUBLIC_URL + '/icons/checked.png'} alt={'checked'} />
            <br></br>
             {text}
          </button>
        </div>
      </section>

  );
};

export { ButtonOrderDelivered };
