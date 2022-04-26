import { React, useState } from 'react';
import { AdminNavBar } from './adminNavBar';
import { ModalAdmin } from './modal';

const AdminIndexOptions = () => {
  const [showModal, setShowModal] = useState(true);
  const colorTab = '/adminMain';

  const closeModal = () => {
    setShowModal(false);
  };

  const done = () => {
    console.log('wuuuu2');
  };

  return (
    <>
      <AdminNavBar colorTab={colorTab}/>
      <div>WUHUUU</div>
      {showModal ? <ModalAdmin onClick={done} closeModalMenu={closeModal} text={'¿Quieres eliminar a este usuario?'} yesText={'Sí, eliminar'} noText={'No, conservar'} /> : ''}
    </>
  );
};

export { AdminIndexOptions };
