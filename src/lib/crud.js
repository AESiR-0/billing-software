import db from "../firebase/config";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "@firebase/firestore";
const invoiceCollectionRef = collection(db, "invoices");

export const create = async (data) => {
  const { customerName, billingDate, productName, deliveryDate } = data;
  try {
    await addDoc(invoiceCollectionRef, {
      customerName,
      billingDate,
      productName,
      deliveryDate,
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const update = async (data) => {};

export const view = async () => {
  const data = await getDocs(invoiceCollectionRef);
  const inv = data.docs.map((elem) => ({ ...elem.data(), id: elem.id }));
  return inv;
};

export const deleteField = async (id) => {
  try {
    const invDoc = doc(db, "invoices", id);
    await deleteDoc(invDoc);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
