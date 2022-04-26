
import { collection, doc, getDoc, addDoc, query, onSnapshot, orderBy, where, updateDoc, deleteDoc } from '@firebase/firestore';
import { db } from './config';

// Ref users
export const collectionUser = collection(db, 'usuarios');

// Ref categories
export const collectionCategories = collection(db, 'categoriasMenu');

// Ref orders
const collectionOrder = collection(db, 'order');

// Guarda las ordenes en Firestore
export const saveOrderInCollection = async (newOrder) => {
  try {
    const savingOrder = await addDoc(collectionOrder, newOrder);
    return savingOrder;
  } catch (error) {
    console.log('error al guardar pedido del cliente en firebase');
    throw new Error(error);
  }
};

// Consigue la data del usuario
export const findingUser = async (userId) => {
  try {
    const documentUserRef = doc(collectionUser, userId);
    const userDocument = await getDoc(documentUserRef);
    const user = userDocument.data();

    return user;
  } catch (error) {
    throw new Error(error);
  }
};

// Consigue la data de categorias
export const findingCategories = async () => {
  try {
    const documentCategoryRef = doc(collectionCategories, 'categorias');
    const bottonDocument = await getDoc(documentCategoryRef);
    const botton = bottonDocument.data();

    return botton.cat;
  } catch (error) {
    throw new Error(error);
  }
};

// Trae pedidos por estado
export const onDataOrderChange = (state) => {
  return (callback) => {
    const q = query(collectionOrder, where('state', '==', state), orderBy('init_time', 'desc'));

    onSnapshot(q, callback);
  };
};

// Trae pedidos por estado segun el trabajador
export const onDataOrderChangeByWorker = (state, workerNombre) => {
  return (callback) => {
    const q = query(collectionOrder, where('state', '==', state), where('worker', '==', workerNombre), orderBy('init_time', 'desc'));
    onSnapshot(q, callback);
  };
};

// Actualiza el estado de la orden
export const updateOrder = (documentId, data) => {
  // updateDoc: para actualizar campos de un doc sin reemplazarlo por completo
  const ref = doc(collectionOrder, documentId);
  updateDoc(ref, {
    ...data,
    update_time: new Date().toLocaleString('es-PE')
  });
};

// Elimina la orden
export const deleteOrder = (documentId) => {
  const ref = doc(collectionOrder, documentId);
  const deleteDocCollectionOrder = deleteDoc(ref);
  return deleteDocCollectionOrder;
};
