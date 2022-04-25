import React from 'react';
import './menu.css';
import { Button } from './button';
import { filterMenuByCategory } from '../../../../utils/utils';
import { findingCategories, findingPrueba } from '../../../../firebase/firestore';

const MenuBar = ({ setMenuValue }) => {
  const onSearchValueChange = (event) => {
    const element = event.currentTarget;
    console.log(element);

    event.preventDefault();
    const newMenu = filterMenuByCategory(element.value);

    setMenuValue(newMenu);
  };

  const dataButtonCategory = async () => {
    const buttonData = await findingCategories();
    // console.log(Object.keys(buttonData), 'botones a');
    // return Object.keys(buttonData);
    console.log(buttonData);
    return buttonData;
  };

  const dataPrueba = async () => {
    const buttonData = await findingPrueba();
    // console.log(Object.keys(buttonData), 'botones a');
    // return Object.keys(buttonData);
    console.log(buttonData);
    return buttonData;
  };

  dataPrueba()
    .then(data => {
      console.log(data);
    });

  return (
    <>
        <section className="menu-container-father">
            {
              dataButtonCategory()
                .then(data => {
                  const llaves = Object.key(data);
                  llaves.map((key, index) => {
                    console.log(Object.key(data));
                    return <Button
                    clickHandler={onSearchValueChange}
                    key={index}
                    className={'btnMenuOption'}
                    value={key.nombreCategoria}
                    text={key.nombreCategoria}
                    src={key.icono}
                    alt={key.nombreCategoria}
                  />;
                  });
                })
                // dataButtonCategory().map((key, index) => {
                //   return <Button
                //         clickHandler={onSearchValueChange}
                //         key={index}
                //         className={'btnMenuOption'}
                //         value={key.nombreCategoria}
                //         text={key.nombreCategoria}
                //         src={key.icono}
                //         alt={key.nombreCategoria}
                //     />;
                // })
            }

        </section>
    </>
  );
};

export { MenuBar };
