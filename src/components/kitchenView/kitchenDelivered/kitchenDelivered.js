import { React, useState } from 'react';
import { User } from '../../nameUser/nameUser';
import { NavKitchen } from '../navKitchen/navKitchen';
import { OrderList } from '../../orders/orderList';
import { OrderButtons } from '../../orders/orderButtons';
import { Ticket } from '../../ticket/ticket';
import { useDocsInRealTime } from '../../../utils/utils';
import { onDataOrderChange } from '../../../firebase/firestore';
import { SelectAnOrder } from '../../selectItem/selectOrder';

const KitchenDelivered = () => {
  const items = useDocsInRealTime(onDataOrderChange('COMPLETADO'));
  const [tableOrderKitchen, setTableOrderKitchen] = useState(undefined);
  const capturingIndexToDisplayOrderInTable = (index) => setTableOrderKitchen(index);
  const colorTab = '/kitchenDelivered';

  return (
        <section className="pendingOrders">
            <User/>
            <NavKitchen colorTab={colorTab}/>
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
                  onClick={() => capturingIndexToDisplayOrderInTable(index)}

                />
              </>

                 );
               })}
            </OrderList>
            {tableOrderKitchen !== undefined ? <Ticket items={items[tableOrderKitchen].data} /> : <SelectAnOrder/>}
        </section>
  );
};

export { KitchenDelivered };
