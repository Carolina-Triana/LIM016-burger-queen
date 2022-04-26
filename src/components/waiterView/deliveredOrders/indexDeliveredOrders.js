import { React, useState, useContext } from 'react';
import { ToastContainer } from 'react-toastify';
import { User } from '../../nameUser/nameUser';
import { WaiterNavBar } from '../sectionTabs/waiterNavBar';
import { OrderList } from '../../orders/orderList';
import { OrderButtons } from '../../orders/orderButtons';
import { Ticket } from '../../ticket/ticket';
import { useDocsInRealTime, modalAlert } from '../../../utils/utils';
import { onDataOrderChangeByWorker, updateOrder } from '../../../firebase/firestore';
import { ButtonOrderDelivered } from './buttonDelivered';
import { Modal } from '../../modal/modal';
import { SelectAnOrder } from '../../selectItem/selectOrder';
import { AuthSession } from '../../../context/context';
import './indexDeliveredOrders.css';

const DeliveredOrders = () => {
  const { user } = useContext(AuthSession);
  const items = useDocsInRealTime(onDataOrderChangeByWorker('COMPLETADO', user.nombre));
  console.log('wooooo', items);
  const [tableOrderKitchen, setTableOrderKitchen] = useState(undefined);
  const capturingTableToDisplayOrderInTable = (index) => setTableOrderKitchen(index);
  const [modalDeleteOrder, setModalDeleteOrder] = useState(false);
  const colorTab = '/waiterDelivered';

  const closeModal = () => {
    setModalDeleteOrder(false);
  };

  const buttonHandler = () => {
    if (tableOrderKitchen === undefined) {
      modalAlert('Selecciona un pedido');
      return;
    }
    setModalDeleteOrder(true);
  };

  const orderDeliveredModal = () => {
    modalAlert('¡Servicio completado!');
    updateOrder(items[tableOrderKitchen].id, {
      state: 'ENTREGADO'
    });

    setTableOrderKitchen(undefined);
    setModalDeleteOrder(false);
  };

  return (
        <>
            <section className="pendingOrders">
                <User />
                <WaiterNavBar colorTab={colorTab} />
                <OrderList>
                    {items.map((item, index) => {
                      return (
                            <>
                                <OrderButtons
                                    key={index}
                                    value={item.data.table}
                                    text={item.data.table}
                                    time={item.data.init_time}
                                    seconds={item.data.seconds}
                                    onClick={() => capturingTableToDisplayOrderInTable(index)}

                                />
                            </>

                      );
                    })}
                </OrderList>
                {tableOrderKitchen !== undefined ? <Ticket items={items[tableOrderKitchen].data} /> : <SelectAnOrder/>}
                <ButtonOrderDelivered onClick={buttonHandler} text="ENTREGADO"/>
                {modalDeleteOrder ? <Modal onClick={orderDeliveredModal} closeModalMenu={closeModal} text={`¿El pedido de la mesa ${items[tableOrderKitchen].data.table} fue entregado?`} /> : ''}
            </section>
            <ToastContainer />
        </>
  );
};

export { DeliveredOrders };
