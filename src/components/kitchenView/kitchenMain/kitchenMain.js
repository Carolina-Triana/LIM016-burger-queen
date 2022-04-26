import { React, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { User } from '../../nameUser/nameUser';
import { NavKitchen } from '../navKitchen/navKitchen';
import { OrderList } from '../../orders/orderList';
import { OrderButtonsTimer } from '../../orders/orderButtonTimer';
import { Ticket } from '../../ticket/ticket';
import { onDataOrderChange, updateOrder } from '../../../firebase/firestore';
import { useDocsInRealTime, modalAlert } from '../../../utils/utils';
import { ButtonOrderDelivered } from '../../waiterView/deliveredOrders/buttonDelivered';
import { Modal } from '../../modal/modal';
import { SelectAnOrder } from '../../selectItem/selectOrder';

const KitchenMain = () => {
  const colorTab = '/kitchenMain';
  const items = useDocsInRealTime(onDataOrderChange('PENDIENTE'));
  const [tableOrderKitchen, setTableOrderKitchen] = useState(undefined);
  const [showModalCompleted, setShowModalCompleted] = useState(false);

  const capturingTableKitchenWithAnEvent = (index) => {
    setTableOrderKitchen(index);
    // console.log(tableOrderKitchen);
  };

  const closeModal = () => {
    setShowModalCompleted(false);
  };

  const openModal = () => {
    console.log('aaaaa', tableOrderKitchen);
    if (tableOrderKitchen === undefined) {
      modalAlert('Selecciona algun pedido');
      console.log(showModalCompleted);
      return;
    }
    setShowModalCompleted(true);
    console.log('else', showModalCompleted);
  };

  const updateOrderAndCloseModal = () => {
    modalAlert('¡La orden se envio a pedidos listos!');
    updateOrder(items[tableOrderKitchen].id, {
      state: 'COMPLETADO'
    });
    setTableOrderKitchen(undefined);
    setShowModalCompleted(false);
  };

  return (
    <>
      <section className="pendingOrders">
        <User />
        <NavKitchen colorTab={colorTab} />
        <OrderList>
          {items.map((item, index) => {
            // console.log(item.data.seconds);
            return (
              <>
                <OrderButtonsTimer
                  key={item.data.init_time}
                  value={item.data.table}
                  text={item.data.table}
                  seconds={item.data.seconds}
                  time={item.data.init_time}
                  onClick={() => capturingTableKitchenWithAnEvent(index)}
                />

              </>

            );
          })}
        </OrderList>
        {tableOrderKitchen !== undefined ? <Ticket items={items[tableOrderKitchen].data} /> : <SelectAnOrder/>}

        <ButtonOrderDelivered onClick={openModal} text='LISTO' />

        {showModalCompleted ? <Modal onClick={updateOrderAndCloseModal} closeModalMenu={closeModal} text={`¿El pedido de la mesa ${items[tableOrderKitchen].data.table} esta listo?`} /> : ''}

      </section>
      <ToastContainer />
    </>
  );
};

export { KitchenMain };
