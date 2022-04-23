import { React, useEffect, useState } from 'react';
import './menu.css';
import { Button } from './button';
import { filterMenuByCategory } from '../../../../utils/utils';
import { findingCategories } from '../../../../firebase/firestore';

const MenuBar = ({ setMenuValue }) => {
  const [buttonData, setButtonData] = useState([]);
  const onSearchValueChange = (event) => {
    const element = event.currentTarget;
    console.log(element);

    event.preventDefault();
    const newMenu = filterMenuByCategory(element.value);

    setMenuValue(newMenu);
  };

  useEffect(() => {
    const dataButtonCategory = async () => {
      const buttonData = await findingCategories();
      console.log(buttonData, 'data');
      let data = { ...buttonData };
      data = [data];
      console.log(data, 'dataaaa');
      return setButtonData(data);
    };
    dataButtonCategory();
  }, []);

  return (
        <>
            <section className="menu-container-father">
                {
                    buttonData.map((category, index) => {
                      return <Button
                            clickHandler={onSearchValueChange}
                            key={index}
                            className={'btnMenuOption'}
                            value={category.bebida}
                            text={category.bebidas.nombreCategoria}
                            src={category.bebidas.icono}
                            alt={category.bebida}
                        />;
                    })
                }

            </section>
        </>
  );
};

export { MenuBar };
