/* eslint-disable no-tabs */
import { React, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthSession } from '../../context/context';
import { auth, logOut } from '../../firebase/auth';
import './adminNavBar.css';

const AdminNavBar = (props) => {
  const Navigate = useNavigate();
  const { user } = useContext(AuthSession);
  // const colorTab = '/adminMain';

  const logOutSesion = () => {
    logOut(auth)
      .then(() => {
        Navigate('/');
        sessionStorage.clear();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
		<div className='adminNavBar'>
			<div className='row dataBar'>
				<div className='row'>
					<div className='inactiveGrey imageContainer'>
						<img src={'/icons/user.svg'}/>
					</div>
					<p className='barText textIndent'>{user.nombre}</p>
				</div>
				<p className='barText'>{user.cargo}</p>
				<button className='inactiveGrey imageContainer' onClick={logOutSesion}>
					<img src={'/icons/stand-by.png'} alt="cerrar sesion"/>
				</button>
			</div>
			<div className='buttonBar'>
				<button className={`adminNavButton inactiveGrey ${props.colorTab === '/adminMain' && 'activePurple'}`} data-name='/adminMain'>INICIO</button>
				<button className={`adminNavButton inactiveGrey ${props.colorTab === '/personnel' && 'activePurple'}`}>PERSONAL</button>
				<button className={`adminNavButton inactiveGrey ${props.colorTab === '/menuManager' && 'activePurple'}`}>CARTA</button>
				<button className={`adminNavButton inactiveGrey ${props.colorTab === '/waiterInterface' && 'activePurple'}`}>INTERFAZ DE PEDIDOS</button>
			</div>
		</div>
  );
};

export { AdminNavBar };
