import { useState } from "react";
import db from "./firebase/config";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "@firebase/firestore";
import { useEffect } from "react";

function App() {
  const invoiceCollectionRef = collection(db, "invoices");
  const [invoiceRead, setInvoiceRead] = useState([]);
  useEffect(() => {
    const invoiceGetData = async () => {
      const data = await getDocs(invoiceCollectionRef);
      const inv = data.docs.map((elem) => ({ ...elem.data(), id: elem.id }));
      setInvoiceRead(inv);
    };
    invoiceGetData();
  }, []);
  const [invoiceDetails, setInvoiceDetails] = useState({
    customerName: "",
    billingDate: new Date().toISOString().slice(0, 10),
    productName: "",
    deliveryDate: new Date().toISOString().slice(0, 10),
  });
  function handleChange(e) {
    const { name, value } = e.target;
    setInvoiceDetails({ ...invoiceDetails, [name]: value });
    console.log(invoiceDetails);
  }
  async function handleEdit(id, fields) {
    const invDoc = doc(db, "invoices", id);
    await updateDoc(invDoc, fields);
  }
  async function handleDelete(id) {
    const invDoc = doc(db, "invoices", id);
    console.log("Deleting");
    await deleteDoc(invDoc);
    window.location.reload();
  }

  async function handleSubmit() {
    const etto = await addDoc(invoiceCollectionRef, {
      customerName: invoiceDetails.customerName,
      billingDate: invoiceDetails.billingDate,
      productName: invoiceDetails.productName,
      deliveryDate: invoiceDetails.deliveryDate,
    });
    console.log(await etto);
    setInvoiceDetails({
      customerName: "",
      billingDate: new Date().toISOString().slice(0, 10),
      productName: "",
      deliveryDate: new Date().toISOString().slice(0, 10),
    });
    window.location.reload();
  }

  return (
    <>
      <div className="h-screen w-screen text-lg bg-black">
        <div
          className="flex h-full justify-center items-center"
          onSubmit={() => handleSubmit()}
        >
          <div className="w-[70%]  flex flex-col gap-10 ">
            <input
              type="text"
              name="customerName"
              className="p-1"
              placeholder="Customer Name"
              onChange={(e) => handleChange(e)}
              value={invoiceDetails.customerName}
            />
            <input
              type="date"
              placeholder="Billing date"
              onChange={(e) => handleChange(e)}
              name="billingDate"
              className="p-1"
              value={invoiceDetails.billingDate}
            />
            <input
              type="text"
              placeholder="Product Name"
              name="productName"
              className="p-1"
              onChange={(e) => handleChange(e)}
              value={invoiceDetails.productName}
            />
            <input
              type="date"
              onChange={(e) => handleChange(e)}
              name="deliveryDate"
              className="p-1"
              placeholder="Delivery Date"
              value={invoiceDetails.deliveryDate}
            />
            <button
              type="button"
              onClick={() => handleSubmit()}
              className="bg-gray-300 text-sm h-8 hover:bg-slate-600 hover:text-white transition-all"
            >
              Submit
            </button>
          </div>
        </div>
        {invoiceRead.map((invoice) => {
          console.log(invoice);
          return (
            <div
              key={invoice.id}
              className="text-white bg-gray-600 w-full my-10 rounded-md p-2 flex gap-4 "
            >
              <p className="w-auto text-center">
                Customer Name : {invoice.customerName}
              </p>
              <p className="w-auto text-center">
                Product Name : {invoice.productName}
              </p>
              <p className="w-auto text-center">
                Billing Date : {invoice.billingDate}
              </p>
              <p className="w-auto text-center">
                Delivery Date : {invoice.deliveryDate}
              </p>
              <button className="text-black" onClick={handleEdit}>
                Edit
              </button>
              <button
                className="text-black"
                onClick={(e) => {
                  e.preventDefault;
                  handleDelete(invoice.id);
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
