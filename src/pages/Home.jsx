import { useCallback } from "react";
import db from "../firebase/config";
import { doc, updateDoc } from "@firebase/firestore";
import { useEffect } from "react";
import { useImmer } from "use-immer";
import { view, create, deleteField, update } from "../lib/crud";
import enqueToaster from "../components/toaster";

export default function Home() {
  const [invoiceRead, setInvoiceRead] = useImmer([]);
  const [error, setError] = useImmer();
  useEffect(() => {
    const invoiceGetData = async () => {
      const data = await view();
      if (data) setInvoiceRead(data);
      else enqueToaster("Something Went Wrong!");
    };
    invoiceGetData();
  }, []);
  const [invoiceDetails, setInvoiceDetails] = useImmer({
    customerName: "",
    billingDate: new Date().toISOString().slice(0, 10),
    productName: "",
    deliveryDate: new Date().toISOString().slice(0, 10),
  });
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setInvoiceDetails({ ...invoiceDetails, [name]: value });
  });

  async function handleEdit(id, fields) {
    const invDoc = doc(db, "invoices", id);
    await updateDoc(invDoc, fields);
  }
  async function handleDelete(id) {
    const out = await deleteField(id);
    console.log(out);
    if (out) window.location.reload();
    else {
      setError(true);
      enqueToaster("Something went Wrong!");
    }
  }

  const handleSubmit = useCallback(async () => {
    await create(invoiceDetails);
    setInvoiceDetails({
      customerName: "",
      billingDate: new Date().toISOString().slice(0, 10),
      productName: "",
      deliveryDate: new Date().toISOString().slice(0, 10),
    });
    window.location.reload();
  });
  return (
    <div className="h-screen w-full text-lg bg-black overflow-x-hidden">
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
        return (
          <div
            key={invoice.id}
            className="text-white bg-gray-600 w-screen  my-10 p-2 flex gap-x-3 "
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
  );
}
