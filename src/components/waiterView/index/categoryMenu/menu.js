import React from 'react';
import './menu.css';
import { Button } from './button';
import { filterMenuByCategory } from '../../../../utils/utils';
import { findingCategories } from '../../../../firebase/firestore';

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
    console.log(buttonData, 'botones a');
    return buttonData;
  };

  return (
        <>
            <section className="menu-container-father">
                {
                    dataButtonCategory().map((category, index) => {
                      return <Button
                            clickHandler={onSearchValueChange}
                            key={index}
                            className={'btnMenuOption'}
                            value={category.categoryName}
                            text={category.categoryText}
                            src={category.photo}
                            alt={category.categoryName}
                        />;
                    })
                }

            </section>
        </>
  );
};

export { MenuBar };
