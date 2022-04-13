import menuData from '../menu.json';
import menuCategories from '../menu_categories.json';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

/* el api es el que me sirve para la manupulacion de los datos (interca de datos) */

// Filtra para obtener los items segun categoria
const filterMenuByCategory = (category) => {
  return menuData.menu.items.filter(item => item.category === category);
};

// Retorna todas las categorias con su info respectiva
const getAllCategories = () => {
  return menuCategories;
};

// customHook
const useDocsInRealTime = (onDataChangeFunc) => { // Obtener la data en tiempo real, dependera de la funcion que le pasemos como argumento
  const [documents, setDocs] = useState([]); // creamos el estado, para mantener la data de los documentos actualizada

  useEffect(() => {
    const setDocsOnQuerySnapshot = (querySnapshot) => {
      const newDocs = querySnapshot.docs.map(doc => { // querySnapshot objeto contenedor de documentos, accedemos a el docs
        return {
          id: doc.id,
          data: doc.data()
        };
      });
      setDocs(newDocs);
    };

    onDataChangeFunc(setDocsOnQuerySnapshot); // ejecutamos la funcion que escucha
  }, []);// colocamos un arreglo vacio para cuando queramos que useEffect se ejecute una sola vez, retornamos el estado interno
  return documents;
};

function orderNumber () {
  const now = Date.now().toString();
  const orderNum = now.substring(6, 12);

  return orderNum;
}

const modalAlert = (message) => {
  toast.warn(message, {
    position: 'top-center',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark',
    type: 'default',
    pading: 30
  });
};

export { filterMenuByCategory, getAllCategories, useDocsInRealTime, orderNumber, modalAlert };
