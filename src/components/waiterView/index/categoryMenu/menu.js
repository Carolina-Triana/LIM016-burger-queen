import { React, useEffect, useState } from 'react';
import './menu.css';
import { Button } from './button';
import { filterMenuByCategory } from '../../../../utils/utils';
import { findingCategories } from '../../../../firebase/firestore';

const MenuBar = ({ setMenuValue }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function dataCategories () {
      try {
        const buttonData = await findingCategories();
        setCategories(buttonData);
      } catch (error) {
        console.log(error);
      }
    };
    dataCategories();
  }, []);

  // const [buttonData, setButtonData] = useState([]);
  const onSearchValueChange = (event) => {
    const element = event.currentTarget;

    event.preventDefault();
    const newMenu = filterMenuByCategory(element.value);

    setMenuValue(newMenu);
  };

  const menuCategories = categories.map((cat, index) => {
    return (
      <Button
        clickHandler={onSearchValueChange}
        key={index}
        className={'btnMenuOption'}
        value={cat.nombre}
        text={cat.nombre}
        src={cat.icono}
        alt={cat.nombre}
      />
    );
  });

  return (
    <>
        <section className="menu-container-father">
          {menuCategories}
        </section>
    </>
  );
};

export { MenuBar };
