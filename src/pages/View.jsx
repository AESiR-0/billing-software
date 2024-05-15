import DataTable from "../components/DataTable";
import { useEffect } from "react";
import { useImmer } from "use-immer";
import { view } from "../lib/crud";
export default function View() {
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
  return (
    <div className="p-10">
      <DataTable data={invoiceRead} />
    </div>
  );
}
